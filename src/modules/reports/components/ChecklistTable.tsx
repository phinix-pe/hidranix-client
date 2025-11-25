import { ChecklistItem, ReportObservation } from '../types';
import { getObservationStatusLabel } from '../services/reportService';

interface ChecklistTableProps {
  items: ChecklistItem[];
  observations: ReportObservation[];
}

export const ChecklistTable = ({ items, observations }: ChecklistTableProps) => {
  // Calcular estadísticas
  const total = items.length;
  const okCount = items.filter(item => item.status === 'ok').length;
  const failCount = items.filter(item => item.status === 'fail').length;

  return (
    <div className="space-y-6">
      {/* Observaciones del Reporte (Estado General) */}
      {observations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Estado General del Reporte
          </h3>
          {observations.map((obs) => (
            <div key={obs.id} className="flex items-center gap-3 mb-2 last:mb-0">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                {getObservationStatusLabel(obs.category_id)}
              </span>
              <span className="text-gray-700">{obs.comment}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tabla de Checklist */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Header de la tabla */}
        <div className="bg-gray-800 text-white font-bold py-3 px-4 flex justify-between items-center">
          <h3 className="text-lg">Checklist de Inspección</h3>
          <div className="flex gap-4 text-sm">
            <span className="text-green-400">✓ {okCount} OK</span>
            <span className="text-red-400">✗ {failCount} Fallas</span>
            <span className="text-gray-400">Total: {total}</span>
          </div>
        </div>

        {/* Cabecera de columnas */}
        <div className="bg-gray-100 border-b-2 border-gray-300 flex font-semibold text-sm">
          <div className="w-16 py-3 text-center border-r border-gray-300">
            #
          </div>
          <div className="flex-1 py-3 px-4 border-r border-gray-300">
            Característica
          </div>
          <div className="w-24 py-3 text-center">
            Estado
          </div>
        </div>

        {/* Filas de items */}
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center border-b border-gray-200 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {/* Número */}
            <div className="w-16 py-3 text-center border-r border-gray-200 text-gray-500 font-mono text-sm">
              {index + 1}
            </div>

            {/* Label */}
            <div className="flex-1 py-3 px-4 border-r border-gray-200">
              <span className="text-gray-800">{item.label}</span>
            </div>

            {/* Estado */}
            <div className="w-24 flex justify-center items-center py-3">
              {item.status === 'ok' ? (
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  OK
                </span>
              ) : item.status === 'fail' ? (
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  FALLA
                </span>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

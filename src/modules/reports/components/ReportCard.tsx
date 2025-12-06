import { Report } from '../types';
import { Link } from 'react-router-dom';

interface ReportCardProps {
  report: Report;
}

export const ReportCard = ({ report }: ReportCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatear horómetro (puede venir como string o number)
  const formatHourMeter = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined) return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? 'N/A' : num.toFixed(1);
  };

  return (
    <Link to={`/reportes/${report.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 hover:border-blue-500 cursor-pointer">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Reporte #{report.id}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(report.created_at)}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {report.shift || 'N/A'}
          </div>
        </div>

        {/* Operator Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm text-gray-600">Operador:</span>
          </div>
          <p className="text-base font-semibold text-gray-800 ml-7">
            {report.operator_name}
          </p>
        </div>

        {/* Hour Meter Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Horómetro Inicio</p>
            <p className="text-lg font-bold text-gray-800">
              {formatHourMeter(report.hour_meter_start)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Horómetro Fin</p>
            <p className="text-lg font-bold text-gray-800">
              {formatHourMeter(report.hour_meter_end)}
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-blue-600 text-sm font-semibold flex items-center gap-2">
            Ver detalles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

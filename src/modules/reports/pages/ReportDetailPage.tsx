import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Report, ChecklistItem, ReportObservation } from '../types';
import { getFullReport, mapDetailsToChecklistItems } from '../services/reportService';
import { ChecklistTable } from '../components/ChecklistTable';

export const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [report, setReport] = useState<Report | null>(null);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [observations, setObservations] = useState<ReportObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!id) {
        setError('ID de reporte no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fullReport = await getFullReport(parseInt(id));
        
        if (!fullReport) {
          setError('Reporte no encontrado');
          setLoading(false);
          return;
        }

        setReport(fullReport.report);
        setChecklistItems(mapDetailsToChecklistItems(fullReport.details));
        setObservations(fullReport.observations);
      } catch (err) {
        setError('Error al cargar el reporte');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateStats = () => {
    const total = checklistItems.length;
    const ok = checklistItems.filter(item => item.status === 'ok').length;
    const fail = checklistItems.filter(item => item.status === 'fail').length;

    return { total, ok, fail };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando reporte...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 font-semibold text-lg">Error</h3>
          </div>
          <p className="text-red-700 mb-4">{error || 'Reporte no encontrado'}</p>
          <button
            onClick={() => navigate('/reportes')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Volver a reportes
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/reportes')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a reportes
        </button>

        {/* Report Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Reporte de Inspección #{report.id}
              </h1>
              <p className="text-gray-600">{formatDate(report.created_at)}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              Turno: {report.shift || 'N/A'}
            </div>
          </div>

          {/* Operator and Hour Meter Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Operador</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{report.operator_name}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Horómetro Inicio</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {report.hour_meter_start?.toFixed(1) || 'N/A'} hrs
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Horómetro Fin</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {report.hour_meter_end?.toFixed(1) || 'N/A'} hrs
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600 mt-1">Total Items</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.ok}</p>
              <p className="text-sm text-gray-600 mt-1">Aprobados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.fail}</p>
              <p className="text-sm text-gray-600 mt-1">Fallas</p>
            </div>
          </div>
        </div>

        {/* Checklist Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detalles del Checklist
          </h2>
          <ChecklistTable items={checklistItems} observations={observations} />
        </div>
      </div>
    </div>
  );
};

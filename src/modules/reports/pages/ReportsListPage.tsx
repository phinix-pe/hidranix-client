import { useEffect, useState, useMemo } from 'react';
import { Report, PaginationInfo } from '../types';
import { getReportsPaginated, getAllReports } from '../services/reportService';
import { ReportCard } from '../components/ReportCard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import phinixLogo from '../../../assets/phinix_logo.png';

const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'];

export const ReportsListPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const result = await getReportsPaginated(currentPage, 10);
        setReports(result.data);
        setPagination(result.pagination);
      } catch (err) {
        setError('Error al cargar los reportes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [currentPage]);

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const data = await getAllReports();
        setAllReports(data);
      } catch (err) {
        console.error('Error al cargar estadisticas:', err);
      }
    };
    fetchAllReports();
  }, []);

  const stats = useMemo(() => {
    const totalReports = allReports.length;
    let totalHoursWorked = 0;
    let validHourReports = 0;
    
    allReports.forEach(r => {
      if (r.hour_meter_start !== null && r.hour_meter_end !== null) {
        const start = typeof r.hour_meter_start === 'string' ? parseFloat(r.hour_meter_start) : r.hour_meter_start;
        const end = typeof r.hour_meter_end === 'string' ? parseFloat(r.hour_meter_end) : r.hour_meter_end;
        const hours = end - start;
        if (!isNaN(hours) && hours > 0) {
          totalHoursWorked += hours;
          validHourReports++;
        }
      }
    });
    
    const avgHoursPerShift = validHourReports > 0 ? totalHoursWorked / validHourReports : 0;
    
    const reportsByShift: Record<string, number> = {};
    allReports.forEach(r => {
      const shift = r.shift || 'Sin turno';
      reportsByShift[shift] = (reportsByShift[shift] || 0) + 1;
    });
    
    const shiftChartData = Object.entries(reportsByShift).map(([name, value]) => ({ name, value }));
    
    return { totalReports, totalHoursWorked, avgHoursPerShift, reportsByShift, shiftChartData };
  }, [allReports]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && reports.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= Math.min(pagination.totalPages, 5); i++) {
      pages.push(i);
    }
    return (
      <div className="flex items-center justify-center gap-2 mb-12">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={!pagination.hasPrev} className="px-4 py-2 rounded-lg bg-white shadow border text-gray-700 disabled:opacity-50">Anterior</button>
        {pages.map((p) => (
          <button key={p} onClick={() => handlePageChange(p)} className={currentPage === p ? 'w-10 h-10 rounded-lg bg-teal-600 text-white' : 'w-10 h-10 rounded-lg bg-white border'}>{p}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={!pagination.hasNext} className="px-4 py-2 rounded-lg bg-white shadow border text-gray-700 disabled:opacity-50">Siguiente</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-teal-700 to-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={phinixLogo} alt="Phinix" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-white">Reportes de Inspeccion</h1>
                <p className="text-teal-100 text-sm">Sistema de checklists de pre-uso</p>
              </div>
            </div>
            <div className="text-right text-white">
              <p className="text-sm text-teal-100">Total</p>
              <p className="text-3xl font-bold">{pagination?.total || stats.totalReports}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">No hay reportes disponibles</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {reports.map((report) => (<ReportCard key={report.id} report={report} />))}
            </div>
            {renderPagination()}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadisticas Generales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-teal-500">
                  <p className="text-sm text-gray-500">Horas Totales</p>
                  <p className="text-2xl font-bold">{stats.totalHoursWorked.toFixed(1)} hrs</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
                  <p className="text-sm text-gray-500">Promedio por Turno</p>
                  <p className="text-2xl font-bold">{stats.avgHoursPerShift.toFixed(1)} hrs</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Distribucion por Turno</h3>
                  {stats.shiftChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={stats.shiftChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => name + ' ' + (percent * 100).toFixed(0) + '%'}>
                          {stats.shiftChartData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip /><Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (<p className="text-gray-500 text-center py-10">Sin datos</p>)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

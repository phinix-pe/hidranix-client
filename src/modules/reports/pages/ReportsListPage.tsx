import { useEffect, useState, useMemo } from 'react';
import { Report, PaginationInfo } from '../types';
import { getReportsPaginated, getAllReports, getTopFailures, TopFailure, getCategoryLabel } from '../services/reportService';
import { ReportCard } from '../components/ReportCard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import phinixLogo from '../../../assets/phinix_logo.png';

const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981'];
const FAILURE_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6'];

export const ReportsListPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [topFailures, setTopFailures] = useState<TopFailure[]>([]);
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

  // Cargar estadísticas de fallas
  useEffect(() => {
    const fetchFailures = async () => {
      try {
        const failures = await getTopFailures(10);
        setTopFailures(failures);
      } catch (err) {
        console.error('Error al cargar fallas:', err);
      }
    };
    fetchFailures();
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                {/* Gráfico de Top Items con Más Fallas */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 text-red-600">🔧 Items con Más Fallas</h3>
                  {topFailures.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={topFailures} layout="vertical" margin={{ left: 10, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="label" 
                          width={150} 
                          tick={{ fontSize: 11 }}
                          tickFormatter={(value) => value.length > 25 ? value.substring(0, 22) + '...' : value}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value} fallas`, 'Cantidad']}
                          labelFormatter={(label) => `Item: ${label}`}
                        />
                        <Bar 
                          dataKey="fail_count" 
                          name="Fallas"
                          radius={[0, 4, 4, 0]}
                        >
                          {topFailures.map((_, index) => (
                            <Cell key={index} fill={FAILURE_COLORS[index % FAILURE_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (<p className="text-gray-500 text-center py-10">Sin datos de fallas</p>)}
                </div>
              </div>

              {/* Lista detallada de fallas por categoría */}
              {topFailures.length > 0 && (
                <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">📊 Detalle de Fallas por Categoría</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['pre-start', 'running', 'end-shift'].map(category => {
                      const categoryFailures = topFailures.filter(f => f.category === category);
                      const totalFails = categoryFailures.reduce((sum, f) => sum + f.fail_count, 0);
                      return (
                        <div key={category} className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">{getCategoryLabel(category)}</h4>
                          <p className="text-2xl font-bold text-red-500 mb-2">{totalFails}</p>
                          <p className="text-xs text-gray-500">fallas totales</p>
                          {categoryFailures.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {categoryFailures.slice(0, 3).map(f => (
                                <li key={f.item_id} className="text-xs text-gray-600 flex justify-between">
                                  <span className="truncate mr-2">{f.label}</span>
                                  <span className="text-red-500 font-medium">{f.fail_count}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

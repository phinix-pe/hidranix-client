import { useEffect, useState, useMemo } from 'react';
import { Report, PaginationInfo } from '../types';
import { getReportsPaginated, getAllReports, getTopFailures, TopFailure, getCategoryLabel } from '../services/reportService';
import { ReportCard } from '../components/ReportCard';
import { FailureStatsChart } from '../components/FailureStatsChart';
import { CategoryStatsChart } from '../components/CategoryStatsChart';
import phinixLogo from '../../../assets/phinix_logo.png';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con Logo */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img src={phinixLogo} alt="PHINIX Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sistema de Reportes
                </h1>
                <p className="text-gray-600 mt-1">
                  Inspección y Mantenimiento de Maquinaria
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-semibold text-blue-700">{reports.length} Reportes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Análisis de Fallas
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Gráfico de barras - Top Fallas */}
            <FailureStatsChart />
            
            {/* Gráfico circular - Categorías */}
            <CategoryStatsChart />
          </div>
        </div>

        {/* Sección de Reportes */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Historial de Reportes
          </h2>
        </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No hay reportes disponibles
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Los reportes de inspección aparecerán aquí una vez que se generen desde la aplicación móvil
            </p>
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

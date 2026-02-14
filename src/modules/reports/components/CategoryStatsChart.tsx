import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getFailureStats, getCategoryLabel, FailureStats } from '../services/reportService';

const CATEGORY_COLORS: Record<string, string> = {
  'pre-start': '#3b82f6',
  'running': '#10b981',
  'end-shift': '#f59e0b',
  'unknown': '#6b7280'
};

export const CategoryStatsChart = () => {
  const [stats, setStats] = useState<FailureStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getFailureStats();
        setStats(data);
      } catch (err) {
        setError('Error al cargar estadísticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !stats || stats.failures_by_category.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fallas por Categoría</h3>
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <p className="text-sm">No hay datos de fallas por categoría</p>
        </div>
      </div>
    );
  }

  // Preparar datos para el gráfico
  const chartData = stats.failures_by_category.map(item => ({
    name: getCategoryLabel(item.category),
    value: item.fail_count,
    category: item.category,
    percentage: ((item.fail_count / stats.failures_by_category.reduce((sum, i) => sum + i.fail_count, 0)) * 100).toFixed(1)
  }));

  const totalFailures = stats.failures_by_category.reduce((sum, item) => sum + item.fail_count, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Distribución de Fallas por Categoría</h3>
        <p className="text-sm text-gray-600">Análisis de fallas según la etapa del checklist</p>
      </div>

      {/* Estadística principal */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Reportes</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total_reports}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Fallas</p>
            <p className="text-3xl font-bold text-red-600">{totalFailures}</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.unknown} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => [`${value} fallas (${chartData.find(d => d.name === name)?.percentage}%)`, name]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Detalle de categorías */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-3">DETALLE POR CATEGORÍA</p>
        <div className="space-y-3">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] || CATEGORY_COLORS.unknown }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-500">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

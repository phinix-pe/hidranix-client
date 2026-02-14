import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { getTopFailures, getCategoryLabel, TopFailure } from '../services/reportService';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9'];

export const FailureStatsChart = () => {
  const [topFailures, setTopFailures] = useState<TopFailure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getTopFailures(10);
        setTopFailures(data);
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

  if (error || topFailures.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Fallas Más Frecuentes</h3>
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm">No hay datos de fallas disponibles</p>
        </div>
      </div>
    );
  }

  // Preparar datos para el gráfico
  const chartData = topFailures.map(item => ({
    name: item.label.length > 30 ? item.label.substring(0, 30) + '...' : item.label,
    fullName: item.label,
    fallas: item.fail_count,
    categoria: getCategoryLabel(item.category)
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Top 10 Fallas Más Frecuentes</h3>
        <p className="text-sm text-gray-600">Items del checklist con mayor cantidad de fallas reportadas</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={120}
            interval={0}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            label={{ value: 'Número de Fallas', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, _name: string, props: any) => {
              return [
                `${value} fallas`,
                props.payload.fullName
              ];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                return `Categoría: ${payload[0].payload.categoria}`;
              }
              return label;
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={() => 'Número de Fallas'}
          />
          <Bar dataKey="fallas" radius={[8, 8, 0, 0]}>
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Leyenda de categorías */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-3">CATEGORÍAS</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Antes de Arrancar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Después de Arrancar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Final del Turno</span>
          </div>
        </div>
      </div>
    </div>
  );
};

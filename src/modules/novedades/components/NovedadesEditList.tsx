import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../services/config';
import { NovedadesForm } from './NovedadesForm';
import { MdDelete, MdError } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Novedad {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  imagen: string;
  tipo: 'novedad' | 'evento';
  plataforma: 'phinix' | 'hidranix';
  linkedin_url: string;
}

interface NovedadesEditListProps {
  onLogout: () => void;
  user: any;
}

const needsProxy = (url: string): boolean => {
  return url.includes('linkedin.com') || url.includes('licdn.com');
};

const getImageUrl = (url: string): string => {
  if (needsProxy(url)) {
    return `${API_BASE_URL}/proxy_image.php?url=${encodeURIComponent(url)}`;
  }
  return url;
};

export const NovedadesEditList = ({ onLogout, user }: NovedadesEditListProps) => {
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNovedad, setSelectedNovedad] = useState<Novedad | null>(null);
  const [filter, setFilter] = useState<'phinix' | 'hidranix'>('phinix');
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const fetchNovedades = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/get_novedades.php?plataforma=${filter}&limit=100`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setNovedades(data);
      } else {
        throw new Error(data.error || 'Error al cargar novedades');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar novedades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovedades();
  }, [filter]);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  const handleEditSuccess = () => {
    setSelectedNovedad(null);
    fetchNovedades();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas ELIMINAR PERMANENTEMENTE esta novedad? No se puede recuperar.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/delete_novedad.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al desactivar novedad');
      }

      if (data.success) {
        fetchNovedades();
      }
    } catch (err: any) {
      alert(err.message || 'Error al desactivar novedad');
    }
  };

  if (selectedNovedad) {
    return (
      <div>
        <button
          onClick={() => setSelectedNovedad(null)}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
        >
          ← Volver a Lista
        </button>
        <NovedadesForm
          onLogout={onLogout}
          user={user}
          novedadId={selectedNovedad.id}
          novedadData={selectedNovedad}
          onSuccess={handleEditSuccess}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Editar Novedades</h1>
            <p className="text-gray-600 mt-1">Bienvenido, {user.nombre_completo}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700">
              Plataforma:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'phinix' | 'hidranix')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="phinix">Phinix</option>
              <option value="hidranix">Hidranix</option>
            </select>
            <span className="ml-auto text-sm text-gray-600">
              Total: {novedades.length} novedades
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Lista de novedades */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">Cargando novedades...</p>
          </div>
        ) : novedades.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">No hay novedades para esta plataforma</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {novedades.map((novedad) => {
              const hasImageError = imageErrors.has(novedad.id);
              const imageUrl = getImageUrl(novedad.imagen);

              return (
                <div
                  key={novedad.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col ${
                    hasImageError ? 'border-2 border-amber-400' : ''
                  }`}
                >
                  {/* Imagen */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={novedad.titulo}
                      className="w-full h-full object-cover"
                      onError={() => {
                        handleImageError(novedad.id);
                      }}
                    />
                    {hasImageError && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <p className="text-lg font-semibold">Imagen no disponible</p>
                          <p className="text-sm mt-1">Click en editar para corregir</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                        {novedad.tipo}
                      </span>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                        {novedad.plataforma}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {novedad.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                      {novedad.descripcion}
                    </p>
                    <div className="text-xs text-gray-500 mb-3">
                      <p>Fecha: {new Date(novedad.fecha).toLocaleDateString('es-ES')}</p>
                      {novedad.categoria && <p>Categoría: {novedad.categoria}</p>}
                    </div>
                  </div>

                  {/* Botón editar */}
                  <button
                    onClick={() => setSelectedNovedad(novedad)}
                    className={`w-full py-3 font-semibold transition m-auto cursor-pointer ${
                      hasImageError
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {hasImageError ? (
                      <>
                        <MdError className="inline mr-1" />
                        Corregir Imagen
                      </>
                    ) : (
                      <>
                        <FaEdit className="inline mr-1" />
                        Editar
                      </>
                    )}
                  </button>
                  
                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleDelete(novedad.id)}
                    className="w-full py-2 text-red-600 hover:bg-red-200 transition font-medium border-t border-gray-200 cursor-pointer "
                  >
                    <MdDelete className="inline mr-1" />
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

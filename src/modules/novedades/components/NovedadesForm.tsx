import { useState } from 'react';
import { API_BASE_URL } from '../../services/config';
import linkedinBaseImage from '../../../assets/linkedin-base.webp';
import { MdError } from "react-icons/md";


interface NovedadFormData {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  imagen: string;
  tipo: 'novedad' | 'evento';
  plataforma: 'phinix' | 'hidranix';
  linkedin_url: string;
}

interface NovedadesFormProps {
  onLogout: () => void;
  user: any;
  novedadId?: number;
  novedadData?: NovedadFormData;
  onSuccess?: () => void;
  isEditing?: boolean;
}

// Función helper para determinar si una URL necesita proxy
const needsProxy = (url: string): boolean => {
  return url.includes('linkedin.com') || url.includes('licdn.com');
};

// Función para obtener la URL con proxy si es necesario
const getImageUrl = (url: string): string => {
  if (needsProxy(url)) {
    return `${API_BASE_URL}/proxy_image.php?url=${encodeURIComponent(url)}`;
  }
  return url;
};

export const NovedadesForm = ({ 
  onLogout, 
  user, 
  novedadId, 
  novedadData,
  onSuccess,
  isEditing = false 
}: NovedadesFormProps) => {
  const [formData, setFormData] = useState<NovedadFormData>(() => {
    if (novedadData) {
      return {
        titulo: novedadData.titulo || '',
        descripcion: novedadData.descripcion || '',
        fecha: novedadData.fecha || new Date().toISOString().split('T')[0],
        categoria: novedadData.categoria || '',
        imagen: novedadData.imagen || '',
        tipo: (novedadData.tipo as 'novedad' | 'evento') || 'novedad',
        plataforma: (novedadData.plataforma as 'phinix' | 'hidranix') || 'phinix',
        linkedin_url: novedadData.linkedin_url || '',
      };
    }
    return {
      titulo: '',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      categoria: '',
      imagen: '',
      tipo: 'novedad',
      plataforma: 'phinix',
      linkedin_url: '',
    };
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>(novedadData?.imagen ? getImageUrl(novedadData.imagen) : '');
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Actualizar vista previa de imagen en tiempo real
    if (name === 'imagen') {
      setImageLoadError(false);
      if (value.trim()) {
        setImagePreview(getImageUrl(value));
      } else {
        setImagePreview('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const endpoint = isEditing && novedadId 
        ? `${API_BASE_URL}/update_novedad.php`
        : `${API_BASE_URL}/insert_novedad.php`;

      const payload = isEditing && novedadId
        ? { 
            id: novedadId,
            titulo: formData.titulo,
            descripcion: formData.descripcion,
            fecha: formData.fecha,
            categoria: formData.categoria,
            imagen: formData.imagen,
            tipo: formData.tipo,
            plataforma: formData.plataforma,
            linkedin_url: formData.linkedin_url
          }
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar la novedad');
      }

      if (data.success) {
        const mensaje = isEditing ? '¡Novedad actualizada exitosamente!' : '¡Novedad creada exitosamente!';
        setSuccess(mensaje);
        
        if (!isEditing) {
          // Resetear formulario solo si es creación
          setFormData({
            titulo: '',
            descripcion: '',
            fecha: new Date().toISOString().split('T')[0],
            categoria: '',
            imagen: '',
            tipo: 'novedad',
            plataforma: 'phinix',
            linkedin_url: '',
          });
          setImagePreview('');
          setImageLoadError(false);
        }
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          setSuccess('');
          if (onSuccess) {
            onSuccess();
          }
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Editar Novedad' : 'Nueva Novedad'}
            </h1>
            <p className="text-gray-600 mt-1">Bienvenido, {user.nombre_completo}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo y Plataforma */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="novedad">Novedad</option>
                  <option value="evento">Evento</option>
                </select>
              </div>

              <div>
                <label htmlFor="plataforma" className="block text-sm font-medium text-gray-700 mb-2">
                  Plataforma *
                </label>
                <select
                  id="plataforma"
                  name="plataforma"
                  value={formData.plataforma}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="phinix">Phinix</option>
                  <option value="hidranix">Hidranix</option>
                </select>
              </div>
            </div>

            {/* Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                id="titulo"
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Ej: Nuevo producto lanzado"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe la novedad o evento..."
                required
              />
            </div>

            {/* Fecha y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha *
                </label>
                <input
                  id="fecha"
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <input
                  id="categoria"
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Ej: Tecnología, Sostenibilidad"
                />
              </div>
            </div>

            {/* URL de Imagen */}
            <div>
              <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
                URL de Imagen
              </label>
              <input
                id="imagen"
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {needsProxy(formData.imagen) && (
                <p className="text-sm text-amber-600 mt-1">
                  Imagen de LinkedIn detectada
                </p>
              )}
            </div>

            {/* URL de LinkedIn */}
            <div>
              <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-2">
                URL de LinkedIn (opcional)
              </label>
              <input
                id="linkedin_url"
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="https://www.linkedin.com/posts/..."
              />
            </div>

            {/* Vista previa de imagen */}
            {imagePreview && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista Previa
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="max-w-full h-auto max-h-64 rounded-lg shadow-md mx-auto block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      setImageLoadError(true);
                      target.src = linkedinBaseImage;
                    }}
                  />
                  {imageLoadError && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-700 text-sm">
                      <MdError className="inline mr-1" /> Error al cargar imagen. Se muestra imagen por defecto. Verifica la URL.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mensajes */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (isEditing ? 'Actualizando...' : 'Guardando...') : (isEditing ? 'Actualizar Novedad' : 'Publicar Novedad')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

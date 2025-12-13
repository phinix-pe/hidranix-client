import { useState } from 'react';
import { API_BASE_URL } from '../../services/config';

interface NovedadFormData {
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  imagen: string;
  tipo: 'novedad' | 'evento';
  plataforma: 'phinix' | 'hidranix';
}

interface NovedadesFormProps {
  onLogout: () => void;
  user: any;
}

// Función helper para determinar si una URL necesita proxy
const needsProxy = (url: string): boolean => {
  return url.includes('linkedin.com') || url.includes('licdn.com');
};

// Función para obtener la URL con proxy si es necesario
const getImageUrl = (url: string): string => {
  if (needsProxy(url)) {
    return `http://localhost:8000/proxy_image.php?url=${encodeURIComponent(url)}`;
  }
  return url;
};

export const NovedadesForm = ({ onLogout, user }: NovedadesFormProps) => {
  const [formData, setFormData] = useState<NovedadFormData>({
    titulo: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    categoria: '',
    imagen: '',
    tipo: 'novedad',
    plataforma: 'phinix',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Actualizar vista previa de imagen
    if (name === 'imagen') {
      setImagePreview(value ? getImageUrl(value) : '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/insert_novedad.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la novedad');
      }

      if (data.success) {
        setSuccess('¡Novedad creada exitosamente!');
        // Resetear formulario
        setFormData({
          titulo: '',
          descripcion: '',
          fecha: new Date().toISOString().split('T')[0],
          categoria: '',
          imagen: '',
          tipo: 'novedad',
          plataforma: 'phinix',
        });
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => setSuccess(''), 3000);
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
            <h1 className="text-2xl font-bold text-gray-800">Nueva Novedad</h1>
            <p className="text-gray-600 mt-1">Bienvenido, {user.nombre_completo}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
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
                  ⚠️ Imagen de LinkedIn detectada - se usará proxy para mostrarla correctamente
                </p>
              )}
            </div>

            {/* Vista previa de imagen */}
            {imagePreview && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista Previa
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="max-w-full h-auto max-h-64 rounded-lg shadow-md mx-auto block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const errorMsg = document.createElement('p');
                      errorMsg.textContent = 'Error al cargar la imagen. Verifica la URL.';
                      errorMsg.className = 'text-red-600 text-center py-4';
                      target.parentElement?.appendChild(errorMsg);
                    }}
                  />
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : 'Publicar Novedad'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

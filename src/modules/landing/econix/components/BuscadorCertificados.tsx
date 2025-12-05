import React, { useState } from "react";

// 1. Define los tipos de datos esperados
type CertResult = {
  id: string; // El código único buscado
  name: string; // Nombre completo del alumno
  course: string;
  downloadUrl: string; // URL limpia del certificado (ej: /certs/H2V-2025-XYZ)
};

const API_URL = "https://phinix.com.pe/api/buscar_certificado.php"; // 🚨 ¡ACTUALIZAR CON TU RUTA REAL!

export default function Buscador() {
  const [id, setId] = useState("");
  const [results, setResults] = useState<CertResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);

    const qId = id.trim();
    if (!qId) {
      setError("Por favor, ingresa el código del certificado.");
      setLoading(false);
      return;
    }

    try {
      // 3. Llamada a la API (Fetch)
      // Pasamos el código en el parámetro 'code' para que PHP lo reciba vía $_GET
      const response = await fetch(`${API_URL}?code=${qId}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Mapea la respuesta del backend (data.data) al formato del frontend
        const mappedResult: CertResult = {
          id: qId,
          name: data.data.name,
          course: data.data.course,
          downloadUrl: data.data.downloadUrl,
        };
        setResults([mappedResult]);
      } else {
        // Código no encontrado o error reportado por PHP
        setResults([]);
        setError(data.message || "Certificado no encontrado.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("Error de conexión con el servidor. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Renderizado del Componente
  return (
    <div id="certificados"   className=" max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-xl border py-20">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔎 Verificación de Certificados
      </h2>
      <p className="text-gray-600 mb-6">
        Ingrese el código único ubicado en su certificado para verificar su autenticidad.
      </p>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ej: H2V-2025-ABCD1"
          className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-150 disabled:opacity-50"
          disabled={loading || !id.trim()}
        >
          {loading ? "Buscando..." : "Verificar Código"}
        </button>
      </form>

      {error && <p className="text-red-600 font-medium mt-4 p-2 bg-red-50 rounded-lg">{error}</p>}

      <div className="mt-8 space-y-4">
        {/* Mostrar resultados */}
        {results && results.length === 0 && (
          <p className="text-center text-lg text-gray-600 p-4 border-l-4 border-yellow-500 bg-yellow-50">
            No se encontró ningún certificado con ese código.
          </p>
        )}
        {results &&
          results.map((c) => (
            <article key={c.id} className="p-6 border-2 border-green-200 rounded-xl bg-green-50 shadow-md">
              <h3 className="text-xl font-bold mb-2 text-green-800">
                ✅ Certificado Encontrado
              </h3>
              <p className="text-lg font-semibold text-gray-700">{c.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                **Curso:** {c.course}
              </p>
              <p className="text-sm text-gray-600">
                **Código ID:** {c.id}
              </p>
              
              {c.downloadUrl && (
                <a
                  href={c.downloadUrl} // URL limpia que apunta al JPG/PDF en tu carpeta /certs/
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 shadow-lg"
                >
                  Abrir Certificado
                </a>
              )}
            </article>
          ))}
      </div>
    </div>
  );
}
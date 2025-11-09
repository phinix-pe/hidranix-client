import { useState } from "react";
import { NavBarEconix } from "./NavBarEconix";
import { AnimationComponent } from "../../animation/AnimationComponent";

export const CertificateEconix = () => {
  const [code, setCode] = useState("");
  const [certificate, setCertificate] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    // Simulación de búsqueda en una base de datos o API
    if (code === "ECO-12345") {
      setCertificate({
        name: "Juan Pérez",
        course: "Curso de Hidrógeno Verde Avanzado",
        date: "15/10/2025",
        instructor: "Ing. María Gómez",
        downloadUrl: "#",
      });
      setError("");
    } else {
      setCertificate(null);
      setError("No se encontró ningún certificado con ese código.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBarEconix variantColor={false} />

      <div className="pt-32 pb-20 px-6 flex flex-col items-center">
        <AnimationComponent
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h1 className="text-4xl font-bold text-primary-dark mb-8">
            Verifica tu Certificado
          </h1>

          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-200">
            <p className="text-gray-700 mb-4 text-center">
              Ingresa el código del certificado para verificar su validez.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ejemplo: ECO-12345"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Buscar
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}

            {certificate && (
              <div className="mt-8 p-4 border-t border-gray-200 text-center">
                <h2 className="text-xl font-semibold text-primary-dark mb-2">
                  {certificate.course}
                </h2>
                <p className="text-gray-700">👤 {certificate.name}</p>
                <p className="text-gray-700">📅 {certificate.date}</p>
                <p className="text-gray-700 mb-4">
                  👩‍🏫 {certificate.instructor}
                </p>

                <a
                  href={certificate.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Descargar Certificado
                </a>
              </div>
            )}
          </div>
        </AnimationComponent>
      </div>
    </div>
  );
};

// src/modules/landing/pages/LandingHidranix.tsx
import Inicio from "../components/Inicio";
import Navbar from "../components/Navbar";
import Nosotros from "../components/Nosotros";
import Servicios from "../components/Servicios";

const LandingHidranix = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Section: Inicio */}
      <Inicio />
      {/* <section id="inicio" className="h-screen w-full flex items-center justify-center bg-green-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary-dark">Bienvenido a Hidranix</h1>
          <p className="mt-4 text-xl text-gray-700">Servicio de hidrógeno verde con tecnología IoT.</p>
        </div>
      </section> */}

      {/* Section: Nosotros */}
      <Nosotros />
      {/* <section id="nosotros" className="h-screen w-full py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-dark">Nosotros</h2>
          <p className="mt-4 text-lg text-gray-700">Somos una empresa comprometida con el futuro, ofreciendo soluciones energéticas limpias mediante el uso de hidrógeno verde y tecnología IoT.</p>
        </div>
      </section> */}

      {/* Section: Servicios */}
      <Servicios />
      {/* <section id="servicios" className="h-screen w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-dark">Servicios</h2>
          <p className="mt-4 text-lg text-gray-700">Ofrecemos soluciones energéticas innovadoras basadas en hidrógeno verde para hogares y empresas.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-dark">Energía limpia</h3>
              <p className="mt-2 text-gray-700">Soluciones de energía limpia y sostenible para el hogar y la industria.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-dark">Tecnología IoT</h3>
              <p className="mt-2 text-gray-700">Monitoreo en tiempo real mediante dispositivos IoT para una gestión eficiente de la energía.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-dark">Soluciones personalizadas</h3>
              <p className="mt-2 text-gray-700">Desarrollamos soluciones adaptadas a las necesidades energéticas de cada cliente.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Section: Clientes */}
      {/* <section id="clientes" className="h-screen w-full py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-dark">Nuestros Clientes</h2>
          <p className="mt-4 text-lg text-gray-700">Clientes satisfechos que confían en nuestras soluciones de energía limpia.</p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-6">
        <div className="text-center">
          <p>&copy; 2025 Hidranix. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingHidranix;
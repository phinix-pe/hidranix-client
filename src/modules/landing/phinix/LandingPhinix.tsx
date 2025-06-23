// src/modules/landing/pages/LandingPhinix.tsx
// import { Link } from "react-router-dom";
import NavbarPhinix from "./components/NavbarPhinix";
import Footer from "../shared/components/Footer";
import { InicioPhinix } from "./components/InicioPhinix";

const phinixSocialLinks = {
  facebookUrl: "https://www.facebook.com/profile.php?id=61553013520190",
  instagramUrl: "https://www.instagram.com/phinix.hidranix",
  linkedinUrl: "https://linkedin.com/company/hidranix",
  tiktokUrl: "https://www.tiktok.com/@phinix.hidranix",
};

const LandingPhinix = () => {
  return (
    <div>
      {/* Navbar */}
      <NavbarPhinix />

      {/* Section: Inicio */}
      {/* <section
        id="inicio"
        className="h-screen w-full flex items-center justify-center bg-green-100"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-900">
            Bienvenido a Phinix
          </h1>
          <p className="py-4 px-4 my-4 text-xl text-gray-700">
            Innovación, sostenibilidad y tecnología avanzada para el futuro.
          </p>
          <Link
            to={"/hidranix"}
            className="bg-red-900 text-white px-6 py-3 mt-6 rounded hover:bg-red-900"
          >
            Descubre Hidranix
          </Link>
        </div>
      </section> */}

      <InicioPhinix />
      {/* Section: Nosotros */}
      <section id="nosotros" className="h-screen w-full py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-900">Nosotros</h2>
          <p className="mt-4 text-lg text-gray-700">
            Somos una empresa innovadora comprometida con soluciones
            tecnológicas de vanguardia para el futuro.
          </p>
        </div>
      </section>

      {/* Section: Servicios */}
      <section id="servicios" className="h-screen w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-900">Servicios</h2>
          <p className="mt-4 text-lg text-gray-700">
            Ofrecemos soluciones tecnológicas en energía limpia, automatización,
            e inteligencia artificial.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-900">
                Energía Limpia
              </h3>
              <p className="mt-2 text-gray-700">
                Soluciones energéticas limpias para el hogar y la industria con
                tecnología avanzada.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-900">
                Automatización
              </h3>
              <p className="mt-2 text-gray-700">
                Tecnología IoT para automatizar procesos y monitoreo en tiempo
                real.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-900">
                Inteligencia Artificial
              </h3>
              <p className="mt-2 text-gray-700">
                Implementación de IA para optimizar procesos y mejorar la
                eficiencia energética.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Clientes */}
      <section id="clientes" className="h-screen w-full py-16 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-900">Nuestros Clientes</h2>
          <p className="mt-4 text-lg text-gray-700">
            Empresas y hogares que ya confían en nuestras soluciones
            tecnológicas.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer
        {...phinixSocialLinks}
        slogan="Unidos para optimizar el ahorro, fomentar descarbonización,usando Energías Renovables con Hidrógeno Verde."
        pageName="Phinix"
      />
    </div>
  );
};

export default LandingPhinix;

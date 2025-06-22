// src/modules/landing/pages/LandingHidranix.tsx
import Eventos from "./components/Eventos";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import Navbar from "./components/Navbar";
import Nosotros from "./components/Nosotros";
import Novedades from "./components/Novedades";
import Servicios from "./components/Servicios";

const LandingHidranix = () => {
  return (
    <div>
      <Navbar />

      <Inicio />
      <Nosotros />
      <Servicios />
      <Novedades />
      <Eventos />
      {/* Section: Clientes */}
      <Footer />
    </div>
  );
};

export default LandingHidranix;
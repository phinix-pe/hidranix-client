// src/modules/landing/pages/LandingHidranix.tsx
import Eventos from "./components/Eventos";
import Footer from "../shared/components/Footer";
import Inicio from "./components/Inicio";
import Navbar from "./components/Navbar";
import Nosotros from "./components/Nosotros";
import Novedades from "./components/Novedades";
import Servicios from "./components/Servicios";

const hidranixSocialLinks = {
  facebookUrl: "https://www.facebook.com/profile.php?id=61553013520190",
  instagramUrl: "https://www.instagram.com/phinix.hidranix",
  linkedinUrl: "https://linkedin.com/company/hidranix",
  tiktokUrl: "https://www.tiktok.com/@phinix.hidranix",
};

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
      <Footer
        {...hidranixSocialLinks}
        slogan="Soluciones innovadoras en hidráulica"
        pageName="Hidranix"
      />
    </div>
  );
};

export default LandingHidranix;

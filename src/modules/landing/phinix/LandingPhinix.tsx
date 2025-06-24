// src/modules/landing/pages/LandingPhinix.tsx
// import { Link } from "react-router-dom";
import NavbarPhinix from "./components/NavbarPhinix";
import Footer from "../shared/components/Footer";
import { InicioPhinix } from "./components/InicioPhinix";
import { CardItemContent } from "../shared/interfaces";
import { GridCard } from "./components/GridCard";

// images
import phinixMayo from "../../../assets/eventos/phinix_mayo.jpg";
import phinixMayoForo from "../../../assets/eventos/phinix_participacion_foro.jpg";
import phinixArticuloCientifico from "../../../assets/eventos/phinix_articulo_cientifico.jpg";
import phinixControlElectrico from "../../../assets/eventos/phinix_control_electrico.jpg";
import phinixCatalogo from "../../../assets/eventos/phinix_catalogo.jpg";
import phinixDiaMadre from "../../../assets/eventos/phinix_dia_madre.jpg";
import phinixCongresoInternacional from "../../../assets/eventos/phinix_congreso_internacional.jpg";
import phinixDiaTrabajador from "../../../assets/eventos/phinix_trabajador.jpg";
import phinixNewYear from "../../../assets/eventos/phinix_new_year.jpg";
import phinixIa from "../../../assets/phinix_ia.jpg";
import phinixCleanEnergy from "../../../assets/phinix_clean_energy.jpg";
import phinixAutomation from "../../../assets/phinix_automation.jpg";

const phinixSocialLinks = {
  facebookUrl: "https://www.facebook.com/profile.php?id=61553013520190",
  instagramUrl: "https://www.instagram.com/phinix.hidranix",
  linkedinUrl: "https://linkedin.com/company/hidranix",
  tiktokUrl: "https://www.tiktok.com/@phinix.hidranix",
};

const eventos: CardItemContent[] = [
  {
    title: "📌✨ Evento destacado del mes | Mayo 2025",
    description:
      "Nos llena de orgullo cerrar el mes con una gran noticia 💚 PHINIX S.A.C. fue reconocida por el Gobierno Regional de Arequipa durante la ceremonia por el Día Nacional de la Micro y Pequeña Empresa (MYPE), como una de las iniciativas más destacadas por su compromiso con la innovación, sostenibilidad e impacto regional. 🏆🌱 El evento, realizado en el Teatro de la Casa Museo Mario Vargas Llosa, reunió a empresas de toda la región y resaltó el valioso rol de las MYPEs en la construcción de un futuro más justo, tecnológico y responsable. ✨ Este reconocimiento refuerza nuestra misión: seguir impulsando soluciones que transforman la industria con propósito. ¡Gracias a todos los que forman parte de este camino!",
    imgSrc: phinixMayo,
    date: "Mayo 2025",
    chipContent: "Evento",
  },
  {
    title: "🧠⚙️ Innovación accesible desde el sur del Perú",
    description:
      "Nos enorgullece compartir que nuestro CEO, Keneth Brayan Perez Huaroc, ha sido coautor del artículo científico “Implementation of a Low-Cost Electronic Speed Controller for a Low-Voltage Three-Phase Induction Motor in a Reused Vehicle”, publicado en la ASEAN Journal on Science and Technology for Development 🧪🌍. Este estudio presenta el diseño de un controlador electrónico de velocidad de bajo costo para motores trifásicos, una tecnología clave para la transición hacia vehículos eléctricos más accesibles y sostenibles 🚗⚡. 📚 El proyecto destaca por: ✅ Reducir costos de conversión de vehículos a eléctricos, ✅ Usar componentes disponibles en el mercado local y ✅ Promover soluciones energéticas viables para mercados emergentes. Desde PHINIX S.A.C. seguimos apostando por la ingeniería que transforma con impacto social y ambiental 🌱💡",
    imgSrc: phinixArticuloCientifico,
    date: "4 de dicimebre del 2024",
    chipContent: "Publicación científica",
  },
  {
    title:
      "✨ Gran momento en el XV Congreso Internacional de Dirección de Proyectos PMI Capítulo Sur Perú 2024 en Arequipa! ✨",
    description:
      'El pasado 2 de noviembre, nuestro CEO, Keneth Brayan Perez Huaroc , presentó nuestro innovador proyecto hashtag#Hidranix en el congreso. Este proyecto explora el uso de agua como combustible, convirtiéndola en hidrógeno verde, con aplicaciones prometedoras en cocción de alimentos y electromovilidad. La ponencia, titulada "Innovación y Emprendimiento en la Dirección de Proyectos para la Transición Energética: Aplicaciones del Hidrógeno Verde", mostró cómo hashtag#Hidranix puede contribuir a una transición energética sostenible y revolucionar distintos sectores. Agradecidos con los Organizadores Isaac Franco Zamata Teves y a ponentes con los que se participó como Eduardo Lanao ,Luis Felipe Julca Torres, PMP®, CAPM®, Microsoft MCP©, CIP, Giancarlo Avila A., Victor Cano, Soledad Briones Salas. 🌱 ¡Gracias a todos los que apoyan esta visión de un futuro más limpio y sustentable! 🌱',
    imgSrc: phinixCongresoInternacional,
    date: "2 de noviembre del 2024",
    chipContent: "Evento internacional",
  },
];

const novedades: CardItemContent[] = [
  {
    title:
      "🔬♻ ¡Así fue la participación de nuestra startup Hidranix en el Foro de Química Verde y Economía Circular! ♻🔬",
    description:
      "El pasado 21 de mayo, HIDRANIX, la startup de innovación sostenible de PHINIX S.A.C., participó en el Foro de Química Verde y Economía Circular organizado por Cámara de Comercio e Industria de Arequipa y Grupo GEA🌱 Nuestra presencia reafirma el compromiso con una ingeniería que transforma y con el desarrollo de soluciones basadas en hidrógeno verde, economía circular y tecnologías limpias. 💧⚡ Gracias a espacios como este —respaldados por UNIDO, Fondo para el Medio Ambiente Mundial , y el Centro de Química Verde de Yale University— seguimos impulsando el diálogo entre la academia y la industria para construir un futuro sostenible desde el sur del Perú. 🌍",
    imgSrc: phinixMayoForo,
    date: "21 de mayo 2025",
    chipContent: "Participación",
  },
  {
    title: "🔧⚡ ¿Qué es un Sistema de Control Eléctrico?",
    description:
      "Un Sistema de Control Eléctrico es el conjunto de dispositivos, sensores y circuitos que permite dirigir, automatizar y proteger el funcionamiento de máquinas y procesos industriales. ✅ Se aplican en: Plantas industriales, sistemas de bombeo y climatización, automatización de procesos, energías renovables y más. 🧠 Desde PHINIX S.A.C. aplicamos estos sistemas en proyectos sostenibles, garantizando eficiencia energética y optimización operativa a través de soluciones inteligentes y personalizadas.💡 Apostamos por una ingeniería que transforma.",
    imgSrc: phinixControlElectrico,
    date: "Mayo 2025",
    chipContent: "Informativo",
  },
  {
    title: "🚀 ¡PHINIX S.A.C. lanza su nuevo Catálogo 2025!",
    description:
      "Explora nuestras soluciones tecnológicas para impulsar la sostenibilidad y la eficiencia en sectores clave: ⚡ Energía limpia, 💧 agua y eficiencia hídrica, 🚘 electromovilidad, 🔌 automatización industrial y 💡 tecnología de última generación, productos de calidad y compromiso con el medio ambiente. Todo en un solo lugar. Todo al alcance de tu industria. 📥 Escanea el código QR",
    imgSrc: phinixCatalogo,
    date: "2025",
    chipContent: "Lanzamiento",
  },
  {
    title: "💚👷‍♀️ Feliz Día de la Madre 👷‍♀️💚",
    description:
      "En PHINIX S.A.C. celebramos a todas las madres que inspiran con su fuerza, sabiduría y amor incondicional. Madres ingenieras, madres de ingenieros, madres que creen en un futuro mejor y lo hacen posible cada día. 🌍✨ Gracias por enseñarnos a construir con valores, a avanzar con pasión y a soñar en grande. Hoy y siempre, honramos su legado. 💫",
    imgSrc: phinixDiaMadre,
    date: "Mayo 2025",
    chipContent: "Celebración",
  },
  {
    title: "👷🤖¡Feliz día del trabajador!🤖👷",
    description:
      "🌍 En PHINIX S.A.C. creemos que nada se enciende sin energía… ¡y esa energía son nuestras personas! En este Día Internacional del Trabajador, reconocemos a quienes impulsan el cambio hacia un futuro más sostenible. 💚 Gracias por ser parte del motor que transforma el mundo con innovación, compromiso y propósito.",
    imgSrc: phinixDiaTrabajador,
    date: "1 de mayo 2025",
    chipContent: "Celebración",
  },
  {
    title: "🎉✨ ¡Feliz Año Nuevo 2025! ✨🎉",
    description:
      "🌟 Este nuevo año es una oportunidad para seguir creciendo, innovando y construyendo un futuro más sostenible juntos. 🌍💡 🙏 Agradecemos los retos superados, las lecciones aprendidas y los logros alcanzados en 2024. 🔑 Que el 2025 nos traiga éxito, salud, y muchas más razones para sonreír y seguir avanzando. 😊🚀 💡 Te desea PHINIX E.I.R.L. e HIDRANIX, trabajando juntos hacia un futuro más sostenible. 💪🌱 #FelizAñoNuevo #Phinix #Hidranix #InnovaciónSostenible #2025. 🥂 ¡Por un año lleno de logros, colaboración y progreso! 🥂 🎆 ¿Cuál es tu compromiso para un 2025 más sostenible? ¡Compártelo con nosotros!",
    imgSrc: phinixNewYear,
    date: "Enero 2025",
    chipContent: "Celebración",
  },
];

const servicios: CardItemContent[] = [
  {
    title: "Energía Limpia",
    description:
      "Ofrecemos soluciones avanzadas en energía renovable para hogares y empresas, ayudándote a reducir costos y cuidar el medio ambiente con la última tecnología.",
    imgSrc: phinixCleanEnergy,
  },
  {
    title: "Automatización",
    description:
      "Integramos sistemas inteligentes de automatización y monitoreo en tiempo real mediante IoT, optimizando procesos, aumentando la productividad y garantizando un control total de tus operaciones.",
    imgSrc: phinixAutomation,
  },
  {
    title: "Inteligencia Artificial",
    description:
      "Aplicamos inteligencia artificial para analizar datos, optimizar recursos y mejorar la eficiencia energética, permitiendo una toma de decisiones más precisa y rentable para tu negocio.",
    imgSrc: phinixIa,
  },
];

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
      {/* <section id="nosotros" className="h-screen w-full py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-900">Nosotros</h2>
          <p className="mt-4 text-lg text-gray-700">
            Somos una empresa innovadora comprometida con soluciones
            tecnológicas de vanguardia para el futuro.
          </p>
        </div>
      </section> */}

      {/* Section: Servicios */}
      {/* <section id="servicios" className="h-screen w-full py-16 bg-white">
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
      </section> */}

      {/* Section: Clientes */}
      {/* <section id="clientes" className="h-screen w-full py-16 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-900">Nuestros Clientes</h2>
          <p className="mt-4 text-lg text-gray-700">
            Empresas y hogares que ya confían en nuestras soluciones
            tecnológicas.
          </p>
        </div>
      </section> */}
      <GridCard
        title="Servicios"
        subTitle="Ofrecemos soluciones tecnológicas en energía limpia, automatización, e inteligencia artificial."
        key="services"
        cards={servicios}
        isClickable={false} // No clickable for services
      />
      <GridCard
        title="Eventos"
        subTitle="Conoce más de nuestros eventos"
        key="events"
        cards={eventos}
      />
      <GridCard
        title="Novedades"
        subTitle="Entérate de nuestras últimas novedades"
        key="news"
        cards={novedades}
      />

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

// src/modules/landing/pages/LandingPhinix.tsx
// import { Link } from "react-router-dom";
import NavbarPhinix from "./components/NavbarPhinix";
import Footer from "../shared/components/Footer";
import { InicioPhinix } from "./components/InicioPhinix";
import { CardItemContent, Contact } from "../shared/interfaces";
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
import phinixSmartHome from "../../../assets/phinix_smarthome.jpeg";
import phinixPozoTierra from "../../../assets/phinix_pozo_tierra.jpg";
import phinixMantenimientoElectrico from "../../../assets/phinix_mantenimiento-electrico.jpg";
import { WhatsAppCTAMultiple } from "../shared/components/WhatsAppCTAMultiple";

const phinixSocialLinks = {
  facebookUrl: "https://www.facebook.com/phinix.sac",
  instagramUrl: "https://www.instagram.com/phinix.sac",
  linkedinUrl: "https://www.linkedin.com/company/phinix-sac/",
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
    title: "Pozo a Tierra + Certificado",
    description:
      "Protege a tus equipos y colaboradores de accidentes eléctricos, cumple con las normativas vigentes y evita posibles sanciones. Con nuestra instalación técnica especializada, medición precisa con telurómetro y un completo reporte técnico, obtendrás un certificado oficial que garantiza la seguridad de tu infraestructura.",
    imgSrc: phinixPozoTierra,
  },
  {
    title: "Mantenimiento Eléctrico para Empresas y PYMEs",
    description:
      "Asegura el correcto funcionamiento de tus instalaciones eléctricas, evitando fallas que puedan generar paradas operativas, recalentamientos o incendios. Realizamos una inspección exhaustiva de tus tableros eléctricos, limpieza técnica y reapriete de conexiones, entregándote un informe técnico con recomendaciones para mantener tus sistemas siempre a punto.",
    imgSrc: phinixMantenimientoElectrico,
  },
  {
    title: "Automatización Domótica",
    description:
      "Transforma tu espacio en un entorno más cómodo, seguro y eficiente con la automatización domótica. Controla las luces y dispositivos desde tu smartphone o mediante asistentes virtuales como Alexa o Google Home. Además, con sensores de movimiento y cámaras de seguridad, lograrás un ahorro energético y una modernización total de tu hogar o empresa.",
    imgSrc: phinixSmartHome,
  },
];
const customContacts: Contact[] = [
  {
    name: "Asesor de ventas",
    number: "+51916699070",
    message: "Hola, me gustaría solicitar una cotización de ...",
  },
  // {
  //   name: "Soporte Técnico",
  //   number: "+51989563108",
  //   message: "Hola, necesito ayuda técnica",
  // },
];

const LandingPhinix = () => {
  return (
    <div>
      {/* Navbar */}
      <NavbarPhinix />

      <InicioPhinix />

      <GridCard
        title="Servicios"
        subTitle="Somos PHINIX S.A.C., empresa autorizada especializada en soluciones eléctricas, mantenimiento y tecnología inteligente para hogares, negocios y empresas."
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
      <WhatsAppCTAMultiple contacts={customContacts} />
    </div>
  );
};

export default LandingPhinix;

// src/modules/landing/pages/LandingPhinix.tsx
// import { Link } from "react-router-dom";
import NavbarPhinix from "./components/NavbarPhinix";
import Footer from "../shared/components/Footer";
import { InicioPhinix } from "./components/InicioPhinix";
import { CardItemContent, Contact } from "../shared/interfaces";
import { GridCard } from "./components/GridCard";
import ServicesGrid from "./components/ServicesGrid";

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
import phinixContacto from "../../../assets/phinix_contacto.png";
import { WhatsAppCTAMultiple } from "../shared/components/WhatsAppCTAMultiple";
import ConsultarySection from "./components/ConsultarySection";
import iconoLinkedin from "../../../assets/icons/linkedin.svg";
import iconoFacebook from "../../../assets/icons/facebook.svg";
import iconoInstagram from "../../../assets/icons/instagram.svg";
import iconoWhatsapp from "../../../assets/icons/whatsapp.svg";
import phinixServiciosHVAC from "../../../assets/phinix_servicios_hvac.png";

import phinixSponsorUnsa from "../../../assets/333.png";
import phinixSponsorEnergizatePeru from "../../../assets/phinix_sponsor_energizate_peru.jpg";
import phinixSponsorPeruEnergia from "../../../assets/111.jpg";
import phinixSponsorFlit from "../../../assets/phinix_sponsor_flit.jpg";
import phinixSponsorGaiaSpePeru from "../../../assets/222.png";
import phinixSponsorPerumin from "../../../assets/phinix_sponsor_perumin.png";
import phinixServiciosTerceros from "../../../assets/phinix_servicios_terceros.png";
import phinixInoxSoldadura from "../../../assets/phinix_inox_soldadura.png";
import { SponsorsCircle } from "./components/SponsorsCircle";

// Importar nuevas imágenes de servicios
import phinixAlquilerBuses from "../../../assets/servicios/phinix_alquiler_buses.webp";
import phinixAutomatizacionDigital from "../../../assets/servicios/phinix_automatizacion_digital.jpg";
import phinixAutomatizacionIndustrial from "../../../assets/servicios/phinix_automatizacion_industrial.webp";
import phinixDashboardIot from "../../../assets/servicios/phinix_dashboard_iot.webp";
import phinixDistribucionEnergia from "../../../assets/servicios/phinix_distribucion_energia.png";
import phinixDomoticaIndustrial from "../../../assets/servicios/phinix_domotica_industrial.webp";
import phinixDrywall from "../../../assets/servicios/phinix_drywall.webp";
import phinixELearning from "../../../assets/servicios/phinix_e_learning.webp";
import phinixEnergiasRenovables from "../../../assets/servicios/phinix_energias_renovables.png";
import phinixEquipoIndustrial from "../../../assets/servicios/phinix_equipo_industrial.webp";
import phinixFabricacionInox from "../../../assets/servicios/phinix_fabricacion_inox.webp";
import phinixImpresion3d from "../../../assets/servicios/phinix_impresion_3d.webp";
import phinixIntegracionSeguridad from "../../../assets/servicios/phinix_integracion_seguridad.jpg";
import phinixMantenimientoElectricoNuevo from "../../../assets/servicios/phinix_mantenimiento_electrico.webp";
import phinixMantenimientoIntegral from "../../../assets/servicios/phinix_mantenimiento_integral.webp";
import phinixMonitoreoDigital from "../../../assets/servicios/phinix_monitoreo_digital.jpg";
import phinixOmElectrico from "../../../assets/servicios/phinix_om_electrico.webp";
import phinixOutsourcing from "../../../assets/servicios/phinix_outsourcing.webp";
import phinixPanelesSolares from "../../../assets/servicios/phinix_paneles_solares.webp";
import phinixSeguridadInteligente from "../../../assets/servicios/phinix_seguridad_inteligente.webp";
import phinixSistemasElectricos from "../../../assets/servicios/phinix_sistemas_electricos.jpg";
import phinixSuministroIndustrial from "../../../assets/servicios/phinix_suministro_industrial.webp";
const phinixSocialLinks = {
  facebookUrl: "https://www.facebook.com/phinix.sac",
  instagramUrl: "https://www.instagram.com/phinix.sac",
  linkedinUrl: "https://www.linkedin.com/company/phinix-sac/",
  tiktokUrl: "https://www.tiktok.com/@phinix.hidranix",
};

const eventos: CardItemContent[] = [
  {
    title: "📌✨ Reconocimiento por el Día Nacional de la Micro y Pequeña Empresa (MYPE) | Mayo 2025",
    description:
      "Nos llena de orgullo cerrar el mes con una gran noticia 💚 PHINIX S.A.C. fue reconocida por el Gobierno Regional de Arequipa durante la ceremonia por el Día Nacional de la Micro y Pequeña Empresa (MYPE), como una de las iniciativas más destacadas por su compromiso con la innovación, sostenibilidad e impacto regional. 🏆🌱 El evento, realizado en el Teatro de la Casa Museo Mario Vargas Llosa, reunió a empresas de toda la región y resaltó el valioso rol de las MYPEs en la construcción de un futuro más justo, tecnológico y responsable. ✨ Este reconocimiento refuerza nuestra misión: seguir impulsando soluciones que transforman la industria con propósito. ¡Gracias a todos los que forman parte de este camino!",
    imgSrc: phinixMayo,
    date: "Mayo 2025",
    chipContent: "Evento",
  },
  {
    title: "🧠⚙️ Publicación de articulo en la ASEAN Journal on Science and Technology for Development",
    description:
      "Nos enorgullece compartir que nuestro CEO, Keneth Brayan Perez Huaroc, ha sido coautor del artículo científico “Implementation of a Low-Cost Electronic Speed Controller for a Low-Voltage Three-Phase Induction Motor in a Reused Vehicle”, publicado en la ASEAN Journal on Science and Technology for Development 🧪🌍. Este estudio presenta el diseño de un controlador electrónico de velocidad de bajo costo para motores trifásicos, una tecnología clave para la transición hacia vehículos eléctricos más accesibles y sostenibles 🚗⚡. 📚 El proyecto destaca por: ✅ Reducir costos de conversión de vehículos a eléctricos, ✅ Usar componentes disponibles en el mercado local y ✅ Promover soluciones energéticas viables para mercados emergentes. Desde PHINIX S.A.C. seguimos apostando por la ingeniería que transforma con impacto social y ambiental 🌱💡",
    imgSrc: phinixArticuloCientifico,
    date: "4 de dicimebre del 2024",
    chipContent: "Publicación científica",
  },
  {
    title:
      "✨ XV Congreso Internacional de Dirección de Proyectos PMI Capítulo Sur Perú 2024 ✨",
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
      "🔬♻ ¡Hidranix en el Foro de Química Verde y Economía Circular! ♻🔬",
    description:
      "El pasado 21 de mayo, HIDRANIX, la startup de innovación sostenible de PHINIX S.A.C., participó en el Foro de Química Verde y Economía Circular organizado por Cámara de Comercio e Industria de Arequipa y Grupo GEA🌱 Nuestra presencia reafirma el compromiso con una ingeniería que transforma y con el desarrollo de soluciones basadas en hidrógeno verde, economía circular y tecnologías limpias. 💧⚡ Gracias a espacios como este —respaldados por UNIDO, Fondo para el Medio Ambiente Mundial , y el Centro de Química Verde de Yale University— seguimos impulsando el diálogo entre la academia y la industria para construir un futuro sostenible desde el sur del Perú. 🌍",
    imgSrc: phinixMayoForo,
    date: "21 de mayo 2025",
    chipContent: "Participación",
  },
  {
    title: "🔧⚡ ¿Qué es un Sistema de Control Eléctrico y cuáles son sus aplicaciones?",
    description:
      "Un Sistema de Control Eléctrico es el conjunto de dispositivos, sensores y circuitos que permite dirigir, automatizar y proteger el funcionamiento de máquinas y procesos industriales. ✅ Se aplican en: Plantas industriales, sistemas de bombeo y climatización, automatización de procesos, energías renovables y más. 🧠 Desde PHINIX S.A.C. aplicamos estos sistemas en proyectos sostenibles, garantizando eficiencia energética y optimización operativa a través de soluciones inteligentes y personalizadas.💡 Apostamos por una ingeniería que transforma.",
    imgSrc: phinixControlElectrico,
    date: "Mayo 2025",
    chipContent: "Informativo",
  },
  {
    title: "🚀 ¡PHINIX S.A.C. lanza su nuevo Catálogo de Productos y Servicios 2025!",
    description:
      "Explora nuestras soluciones tecnológicas para impulsar la sostenibilidad y la eficiencia en sectores clave: ⚡ Energía limpia, 💧 agua y eficiencia hídrica, 🚘 electromovilidad, 🔌 automatización industrial y 💡 tecnología de última generación, productos de calidad y compromiso con el medio ambiente. Todo en un solo lugar. Todo al alcance de tu industria. 📥 Escanea el código QR",
    imgSrc: phinixCatalogo,
    date: "2025",
    chipContent: "Lanzamiento",
  },
  {
    title: "💚 ¡Feliz Día de la Madre! 💚",
    description:
      "En PHINIX S.A.C. celebramos a todas las madres que inspiran con su fuerza, sabiduría y amor incondicional. Madres ingenieras, madres de ingenieros, madres que creen en un futuro mejor y lo hacen posible cada día. 🌍✨ Gracias por enseñarnos a construir con valores, a avanzar con pasión y a soñar en grande. Hoy y siempre, honramos su legado. 💫",
    imgSrc: phinixDiaMadre,
    date: "Mayo 2025",
    chipContent: "Celebración",
  },
  {
    title: "👷 ¡Feliz día del trabajador! 👷",
    description:
      "🌍 En PHINIX S.A.C. creemos que nada se enciende sin energía… ¡y esa energía son nuestras personas! En este Día Internacional del Trabajador, reconocemos a quienes impulsan el cambio hacia un futuro más sostenible. 💚 Gracias por ser parte del motor que transforma el mundo con innovación, compromiso y propósito.",
    imgSrc: phinixDiaTrabajador,
    date: "1 de mayo 2025",
    chipContent: "Celebración",
  },
  {
    title: "✨ ¡Feliz Año Nuevo 2025! ✨",
    description:
      "🌟 Este nuevo año es una oportunidad para seguir creciendo, innovando y construyendo un futuro más sostenible juntos. 🌍💡 🙏 Agradecemos los retos superados, las lecciones aprendidas y los logros alcanzados en 2024. 🔑 Que el 2025 nos traiga éxito, salud, y muchas más razones para sonreír y seguir avanzando. 😊🚀 💡 Te desea PHINIX E.I.R.L. e HIDRANIX, trabajando juntos hacia un futuro más sostenible. 💪🌱 #FelizAñoNuevo #Phinix #Hidranix #InnovaciónSostenible #2025. 🥂 ¡Por un año lleno de logros, colaboración y progreso! 🥂 🎆 ¿Cuál es tu compromiso para un 2025 más sostenible? ¡Compártelo con nosotros!",
    imgSrc: phinixNewYear,
    date: "Enero 2025",
    chipContent: "Celebración",
  },
];

// Reorganización de servicios por categorías
const serviciosCategorizados = [
  {
    title: "Ingeniería Eléctrica, Mantenimiento Integral y HVAC",
    services: [
      {
        id: "pozo-a-tierra",
        title: "Instalaciones Certificadas de Pozos a Tierra y Tableros Eléctricos",
        shortTitle: "Pozos a Tierra y Tableros",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Seguridad y protección eléctrica: evita accidentes, sanciones y daños a equipos.
        • Servicio especializado: instalación, medición, reporte y certificado oficial.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Instalación técnica especializada.
        • Medición con telurémetro.
        • Reporte Técnico y planos.
        • Certificado oficial.`,
        twoColumns: true,
        imgSrc: phinixPozoTierra,
      },
      {
        id: "instalaciones-electricas-industriales",
        title: "Instalaciones Eléctricas Industriales y Comerciales",
        shortTitle: "Instalaciones Eléctricas",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Soluciones eléctricas confiables: diseño e instalación para industrias y comercios.
        • Trabajo certificado: infraestructura segura y adaptable a cada proyecto.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Diseño e instalación de sistemas eléctricos.
        • Infraestructura segura y certificada.
        • Adaptación a proyectos específicos.`,
        twoColumns: true,
        imgSrc: phinixMantenimientoElectrico,
      },
      {
        id: "mantenimiento-puntual",
        title: "Mantenimiento Puntual (Preventivo y Correctivo)",
        shortTitle: "Mantenimiento Puntual",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Mantenimiento eléctrico seguro: previene fallas, incendios y paradas operativas.
        • Servicio técnico completo: inspección, limpieza, reapriete e informe especializado.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Inspección de tableros eléctricos.
        • Limpieza técnica y reapriete de conexiones.
        • Informe técnico con recomendaciones.`,
        twoColumns: true,
        imgSrc: phinixMantenimientoElectrico,
      },
      {
        id: "equipos-industriales-mineria",
        title: "Equipos Industriales y de Minería",
        shortTitle: "Equipos Industriales",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Línea amarilla, equipos subterráneos, chancado, molienda y transporte.
        • Priorizando disponibilidad y reducción de fallas.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Mantenimiento de equipos industriales.
        • Optimización de disponibilidad operativa.
        • Reducción de fallas y tiempos de parada.`,
        twoColumns: true,
        imgSrc: phinixEquipoIndustrial,
      },
      {
        id: "proyectos-hvac",
        title: "Proyectos HVAC (Aire Acondicionado) y Confort Térmico",
        shortTitle: "Proyectos HVAC",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Ventilación, calefacción, torres de enfriamiento, unidades splits, chillers, extractores e inyectores.
        • Servicio HVAC integral: instalación, mantenimiento y diagnóstico especializado.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Instalación y mantenimiento de equipos HVAC.
        • Soluciones de ventilación, calefacción y aire acondicionado.
        • Diagnóstico técnico y recomendaciones.`,
        twoColumns: true,
        imgSrc: phinixServiciosHVAC,
      },
      {
        id: "mantenimiento-integral",
        title: "Mantenimiento Integral",
        shortTitle: "Mantenimiento Integral",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Planificación estratégica de mantenimientos preventivos y correctivos.
        • Asegurando confiabilidad, seguridad y continuidad operativa.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Planificación estratégica de mantenimientos.
        • Servicios preventivos y correctivos.
        • Garantía de confiabilidad operativa.`,
        twoColumns: true,
        imgSrc: phinixMantenimientoIntegral,
      },
      {
        id: "sistemas-electricos-mecanicos",
        title: "Sistemas Eléctricos, Mecánicos e Instrumentación",
        shortTitle: "Sistemas Eléctricos y Mecánicos",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Soporte integral en equipos eléctricos, mecánicos y de control.
        • Garantizando eficiencia y precisión en los procesos.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Soporte técnico en equipos eléctricos.
        • Mantenimiento de sistemas mecánicos.
        • Instrumentación y control de procesos.`,
        twoColumns: true,
        imgSrc: phinixSistemasElectricos,
      },
      {
        id: "sistemas-distribucion-energia",
        title: "Sistemas de Distribución y Entrega de Energía",
        shortTitle: "Distribución de Energía",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Inspección, fiscalización y mantenimiento de redes de distribución.
        • Garantizando la calidad, continuidad y seguridad en la entrega de energía.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Inspección de redes de distribución.
        • Fiscalización y mantenimiento.
        • Garantía de calidad y seguridad energética.`,
        twoColumns: true,
        imgSrc: phinixDistribucionEnergia,
      },
      {
        id: "centrales-renovables",
        title: "Centrales de Energías Renovables",
        shortTitle: "Energías Renovables",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Soporte técnico y mantenimiento para parques solares, eólicos e hidroeléctricos.
        • Asegurando la eficiencia energética y confiabilidad de la generación sostenible.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Mantenimiento de parques solares.
        • Soporte técnico para sistemas eólicos.
        • Gestión de centrales hidroeléctricas.`,
        twoColumns: true,
        imgSrc: phinixEnergiasRenovables,
      },
    ],
  },
  {
    title: "Domótica, Automatización y Seguridad Inteligente",
    services: [
      {
        id: "automatizacion-industrial",
        title: "Automatización Industrial",
        shortTitle: "Automatización Industrial",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Automatización industrial: programación de PLCs y SCADA para optimizar procesos.
        • Mayor eficiencia operativa: reducción de errores y mejora en la producción.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Programación de PLCs.
        • Implementación de sistemas SCADA.
        • Optimización de procesos industriales.`,
        twoColumns: true,
        imgSrc: phinixAutomatizacionIndustrial,
      },
      {
        id: "domotica-hogares",
        title: "Domótica para Hogares, Hoteles y Oficinas",
        shortTitle: "Domótica Residencial",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Domótica inteligente: control de luces por app o voz, compatible con Alexa/Google Home.
        • Ambientes modernos y seguros: comodidad, ahorro energético y control total.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Instalación de control de luces por app o voz.
        • Sensores de movimiento y cámaras.
        • Compatibilidad con Alexa y Google Home.`,
        twoColumns: true,
        imgSrc: phinixDomoticaIndustrial,
      },
      {
        id: "seguridad-inteligente",
        title: "Seguridad Inteligente",
        shortTitle: "Seguridad Inteligente",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Seguridad avanzada: cámaras, alarmas, sensores y control de accesos.
        • Protección en tiempo real: gestión remota desde app o sistema centralizado.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Instalación de cámaras de seguridad.
        • Sistemas de alarmas y sensores.
        • Control de accesos remoto.`,
        twoColumns: true,
        imgSrc: phinixSeguridadInteligente,
      },
    ],
  },
  {
    title: "Desarrollo Web y Soluciones Digitales Corporativas",
    services: [
      {
        id: "plataformas-monitoreo",
        title: "Plataformas Digitales (Web/Móvil) para Monitoreo",
        shortTitle: "Plataformas de Monitoreo",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Sistemas de monitoreo: adaptados a cada necesidad.
        • Gestión en línea: acceso remoto y en tiempo real desde cualquier dispositivo.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Desarrollo de plataformas web y móviles.
        • Sistemas de monitoreo personalizados.
        • Acceso remoto en tiempo real.`,
        twoColumns: true,
        imgSrc: phinixMonitoreoDigital,
      },
      {
        id: "integracion-sistemas-digitales",
        title: "Integración de Sistemas Digitales y Ciberseguridad",
        shortTitle: "Integración Digital",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Conectividad segura entre plataformas.
        • Ciberseguridad avanzada: protección de la información y operaciones críticas.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Integración de sistemas digitales.
        • Implementación de ciberseguridad.
        • Protección de datos e información.`,
        twoColumns: true,
        imgSrc: phinixIntegracionSeguridad,
      },
      {
        id: "automatizacion-digital",
        title: "Automatización Digital y Reportes Inteligentes",
        shortTitle: "Automatización Digital",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Procesos más ágiles con reportes inteligentes.
        • Optimización de datos: análisis preciso para mejorar la toma de decisiones.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Automatización de procesos digitales.
        • Generación de reportes inteligentes.
        • Análisis de datos y métricas.`,
        twoColumns: true,
        imgSrc: phinixAutomatizacionDigital,
      },
      {
        id: "dashboards-iot",
        title: "Desarrollo de Dashboards IoT y Aplicaciones Empresariales",
        shortTitle: "Dashboards IoT",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Dashboards IoT y apps empresariales: desarrollo de soluciones personalizadas.
        • Visualización clara: control de indicadores y métricas en un solo panel.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Desarrollo de dashboards IoT.
        • Creación de aplicaciones empresariales.
        • Visualización de indicadores y métricas.`,
        twoColumns: true,
        imgSrc: phinixDashboardIot,
      },
      {
        id: "plataformas-elearning",
        title: "Plataformas de Capacitación en Línea (E-Learning)",
        shortTitle: "E-Learning",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Entrenamiento remoto: cursos interactivos y accesibles desde cualquier lugar.
        • Formación digital personalizada.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Desarrollo de plataformas e-learning.
        • Creación de cursos interactivos.
        • Acceso remoto y personalizado.`,
        twoColumns: true,
        imgSrc: phinixELearning,
      },
    ],
  },
  {
    title: "Facility & Industrial Solutions",
    services: [
      {
        id: "fabricacion-mecanizado",
        title: "Fabricación y Mecanizado de Piezas",
        shortTitle: "Fabricación y Mecanizado",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Fabricación y mecanizado de piezas: torneado, fresado y soldadura inox.
        • Soluciones precisas: componentes de alta calidad para la industria.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Torneado y fresado de piezas.
        • Soldadura en acero inoxidable.
        • Componentes de alta precisión.`,
        twoColumns: true,
        imgSrc: phinixFabricacionInox,
      },
      {
        id: "impresiones-3d",
        title: "Impresiones 3D en Resina",
        shortTitle: "Impresiones 3D",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Prototipado rápido y de alta precisión para múltiples industrias.
        • Acabados profesionales: alta resolución, resistentes y personalizados.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Prototipado preciso y rápido.
        • Alta resolución y acabados profesionales.
        • Adaptable a múltiples industrias.`,
        twoColumns: true,
        imgSrc: phinixImpresion3d,
      },
      {
        id: "outsourcing-industrial",
        title: "Outsourcing Industrial",
        shortTitle: "Outsourcing Industrial",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Soporte especializado en mantenimiento y operaciones clave.
        • Optimiza recursos: personal técnico experto cuando tu empresa lo necesita.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Personal técnico especializado.
        • Mantenimiento y operaciones industriales.
        • Soporte temporal según necesidades.`,
        twoColumns: true,
        imgSrc: phinixOutsourcing,
      },
      {
        id: "comercializacion-equipos-industriales",
        title: "Comercialización e Importación de Equipos Industriales y de Energía",
        shortTitle: "Equipos Industriales",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Suministro de maquinaria, repuestos y soluciones energéticas de alta calidad.
        • Garantía y respaldo técnico para el sector industrial y corporativo.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Suministro de maquinaria industrial.
        • Repuestos y soluciones energéticas.
        • Garantía y soporte técnico.`,
        twoColumns: true,
        imgSrc: phinixSuministroIndustrial,
      },
      {
        id: "comercializacion-paneles-solares",
        title: "Comercialización e Importación de Equipos (Paneles Solares, Sistemas de Hidrógeno, IoT)",
        shortTitle: "Paneles Solares e IoT",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Paneles solares, sistemas de hidrógeno e IoT para proyectos innovadores.
        • Tecnología eficiente que impulsa la transición hacia energías limpias.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Paneles solares y sistemas fotovoltaicos.
        • Sistemas de hidrógeno verde.
        • Soluciones IoT para proyectos sostenibles.`,
        twoColumns: true,
        imgSrc: phinixPanelesSolares,
      },
      {
        id: "alquiler-vehiculos",
        title: "Alquiler de Vehículos para Transporte de Personal (Tercerizados)",
        shortTitle: "Alquiler de Vehículos",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Flota de camionetas, vans y buses para empresas e industrias.
        • Movilidad segura, cómoda y confiable para tus operaciones diarias.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Camionetas, vans y buses.
        • Transporte de personal corporativo.
        • Servicio confiable y seguro.`,
        twoColumns: true,
        imgSrc: phinixAlquilerBuses,
      },
      {
        id: "om-electrico-bombeo",
        title: "O&M Eléctrico y Bombeo",
        shortTitle: "O&M Eléctrico",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Alta, media y baja tensión, grupos electrógenos, UPS, tableros, pozos a tierra, auditorías energéticas.
        • Sistemas de bombeo (periféricas, centrífugas, sumergibles, hidroneumáticos).`,
        descriptionCol2: `<strong>Incluye</strong>
        • Mantenimiento eléctrico de alta/media/baja tensión.
        • Grupos electrógenos y UPS.
        • Sistemas de bombeo especializados.`,
        twoColumns: true,
        imgSrc: phinixOmElectrico,
      },
      {
        id: "infraestructura-servicios-generales",
        title: "Infraestructura y Servicios Generales",
        shortTitle: "Servicios Generales",
        descriptionCol1: `<strong>Beneficios clave</strong>
        • Carpintería, drywall, pintura, gasfitería, jardinería, sanitarias.
        • Limpieza industrial especializada.`,
        descriptionCol2: `<strong>Incluye</strong>
        • Servicios de carpintería y drywall.
        • Pintura, gasfitería y jardinería.
        • Limpieza industrial y sanitarios.`,
        twoColumns: true,
        imgSrc: phinixDrywall,
      },
    ],
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
// #088c9c rgb(8,140,156)
// Servicios Agregados phinix
const presentacion: CardItemContent[] = [
  {
    title: "MISIÓN",
    description:
      `Desarrollar e implementar soluciones tecnológicas integrales en energía, automatización, digitalización y sostenibilidad, asegurando eficiencia operativa, seguridad y valor agregado para nuestros clientes.

      Contibuimos al desarrollo de mineras, corporativos y comunidades urbanas, impulsando un futuro más innovador, limpio y sostenible.
      `,
  },
  {
    title: "VISIÓN",
    description:
      `Ser reconocidos en América Latina como una empresa referente en ingeniería eléctrica, energías renovables, innovación digital y servicios industriales, liderando la transformación tecnológica sostenible que conecte la mineria, la industria y las ciudades hacia un futuro verde, inteligente e inclusivo.`,
    
  },
  {
  title: "NUESTROS VALORES",
  descriptionCol1: `
    <ol class="custom-values-list">
      <li><strong>Innovación continua:</strong> Impulsamos ideas disruptivas aplicadas a energías limpias, digitalización y electromovilidad.</li>
      <li><strong>Compromiso con la sostenibilidad:</strong> Trabajamos con responsabilidad ambiental y eficiencia en el uso de recursos.</li>
      <li><strong>Excelencia técnica:</strong> Brindamos calidad, precisión y seguridad en cada proyecto que desarrollamos.</li>
      <li><strong>Ética y transparencia:</strong> Construimos relaciones honestas y responsables con nuestros clientes, aliados y colaboradores.</li>
    </ol>
  `,
  descriptionCol2: `
    <ol class="custom-values-list" start="5">
      <li><strong>Cercanía y servicio al cliente:</strong> Escuchamos, entendemos y acompañamos a nuestros clientes para brindar soluciones a la medida.</li>
      <li><strong>Colaboración:</strong> Fomentamos el trabajo en equipo y las alianzas estratégicas para crecer juntos.</li>
      <li><strong>Impacto social:</strong> Promovemos el desarrollo local y la inclusión a través de nuestras iniciativas tecnológicas y educativas.</li>
      <li><strong>Sostenibilidad:</strong> Buscamos equilibrio en tres aspectos clave: el crecimiento económico, la protección del medio ambiente y el bienestar social.</li>
    </ol>
  `,
  twoColumns: true,
},
  {
    title: "CONTACTO",
    description: `
    <strong>Contáctanos</strong>
    <img src="${iconoLinkedin}" alt="LinkedIn" class="inline-icon" /> PHINIX S.A.C.
    <img src="${iconoFacebook}" alt="Facebook" class="inline-icon" /> PHINIX S.A.C.
    <img src="${iconoInstagram}" alt="Instagram" class="inline-icon" /> phinix.sac
    <img src="${iconoWhatsapp}" alt="WhatsApp" class="inline-icon" /> +51 916 699 070
    <img src="${iconoWhatsapp}" alt="WhatsApp" class="inline-icon" /> +51 989 563 108
    
    `,
    imgSrc: phinixContacto,
  },
]

const sponsors  : CardItemContent[] = [
  { 
    title: "UNSA", 
    imgSrc: phinixSponsorUnsa , 
    description: "Arequipa, Peru"},
  { 
    title: "Energízate Perú", 
    imgSrc: phinixSponsorEnergizatePeru , 
    description: "Arequipa, Peru"
  },
  { 
    title: "Perú Energía", 
    imgSrc: phinixSponsorPeruEnergia , 
    description: "Arequipa, Peru"
  },
  { 
    title: "Flit", 
    imgSrc: phinixSponsorFlit , 
    description: "Arequipa, Peru"
  },
  { 
    title: "Gaia SPE Perú", 
    imgSrc: phinixSponsorGaiaSpePeru , 
    description: "Arequipa, Peru"
  },
  { 
    title: "Perumin Hub", 
    imgSrc: phinixSponsorPerumin , 
    description: "Arequipa, Peru"
  },
  
  ]
const LandingPhinix = () => {
  return (
    <div>
      {/* Navbar */}
      <NavbarPhinix />

      <InicioPhinix />


      <GridCard
        id="nosotros"
        title="Presentación de PHINIX S.A.C."
        subTitle="Somos PHINIX S.A.C., empresa especializada en soluciones eléctricas, mantenimiento integral y tecnologías inteligentes, ofreciendo proyectos de energías renovables, automatización, consultorías y servicios industriales para hogares, corporaciones y operaciones mineras."
        key="presentacion"
        cards={presentacion}
        isClickable={false} // No clickable for services
        minWidth={390}
        equalHeight={true} // Igualar alturas para presentación
        disableHover={true} // Desactivar hover en presentación
      />

      {/* Servicios con nuevo componente ServicesGrid */}
      <ServicesGrid categories={serviciosCategorizados} />

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

      {/* <GridCard
        id="sponsors"
        title="Nuestros Patrocinadores"
        subTitle="Conoce más de nuestros principales sponsor"
        key="sponsors"
        cards={sponsors}
        isClickable={false} // No clickable for services
        minWidth={160}
        equalHeight={true} // Igualar alturas para presentación
      /> */}

      <SponsorsCircle sponsors={sponsors} />


      {/* Consultoría Form */}
      <ConsultarySection />

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

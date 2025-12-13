// src/modules/landing/pages/LandingPhinix.tsx
// import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavbarPhinix from "./components/NavbarPhinix";
import Footer from "../shared/components/Footer";
import { InicioPhinix } from "./components/InicioPhinix";
import { CardItemContent, Contact } from "../shared/interfaces";
import { GridCard } from "./components/GridCard";
import ServicesGrid from "./components/ServicesGrid";
import { API_BASE_URL } from "../../services/config";

// images
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
import phinixSponsorCCIAQP from "../../../assets/phinix_sponsor_cciaqp.png";
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
  {
    title: "Cámara de Comercio AQP",
    imgSrc: phinixSponsorCCIAQP ,
    description: "Arequipa, Peru"
  }
  ]

// Función helper para determinar si una URL necesita proxy
const needsProxy = (url: string): boolean => {
  return url ? (url.includes('linkedin.com') || url.includes('licdn.com')) : false;
};

// Función para obtener la URL con proxy si es necesario
const getImageUrl = (url: string): string => {
  if (needsProxy(url)) {
    return `http://localhost:8000/proxy_image.php?url=${encodeURIComponent(url)}`;
  }
  return url;
};

const LandingPhinix = () => {
  const [eventos, setEventos] = useState<CardItemContent[]>([]);
  const [novedades, setNovedades] = useState<CardItemContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventosResponse, novedadesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/get_novedades.php?plataforma=phinix&tipo=evento&limit=3`),
          fetch(`${API_BASE_URL}/get_novedades.php?plataforma=phinix&tipo=novedad&limit=6`)
        ]);

        const eventosData = await eventosResponse.json();
        const novedadesData = await novedadesResponse.json();

        // Mapear los datos de la API al formato CardItemContent
        const mappedEventos = eventosData.map((item: any) => ({
          id: item.id?.toString(),
          title: item.titulo,
          description: item.descripcion,
          date: item.fecha,
          imgSrc: getImageUrl(item.imagen),
          chipContent: item.categoria,
        }));

        const mappedNovedades = novedadesData.map((item: any) => ({
          id: item.id?.toString(),
          title: item.titulo,
          description: item.descripcion,
          date: item.fecha,
          imgSrc: getImageUrl(item.imagen),
          chipContent: item.categoria,
        }));

        setEventos(mappedEventos);
        setNovedades(mappedNovedades);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

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
import { useEffect } from "react";
import type { Contact, CourseData } from "../../../shared/interfaces";
import { NavBarEconix } from "../../components/NavBarEconix";
import { CourseHero } from "../components/CourseHero";
import { CourseInfo } from "../components/CourseInfo";
import { CourseModules } from "../components/CourseModules";
import { CourseDetails } from "../components/CourseDetails";
import { CourseInvestment } from "../components/CourseInvestment";
import Footer from "../../../shared/components/Footer";
import { WhatsAppCTAMultiple } from "../../../shared/components/WhatsAppCTAMultiple";
import { CourseRegistration } from "../components/CourseRegistration";
import silaboPdf from "../../../../../assets/files/Silabo_H2V_002.pdf";
const phinixSocialLinks = {
  facebookUrl: "https://www.facebook.com/phinix.sac",
  instagramUrl: "https://www.instagram.com/phinix.sac",
  linkedinUrl: "https://www.linkedin.com/company/phinix-sac/",
  tiktokUrl: "https://www.tiktok.com/@phinix.hidranix",
};

const courseContacts: Contact[] = [
  {
    name: "Asesor Académico",
    number: "+51916699070",
    message:
      "Hola, me gustaría obtener más información sobre el curso de Hidrógeno Verde...",
  },
];

const courseData: CourseData = {
  title:
    "Hidrógeno Verde: Generación y Almacenamiento para Aplicaciones Energéticas Sostenibles",
  courseCode: "H2V002",
  duration: "36 horas académicas",
  modality: "Online",
  startDate: "02/09/2025",
  endDate: "09/10/2025",
  schedule: "Martes y jueves 7:00 p.m. - 8:30 p.m.",
  sessions: "12 sesiones",
  weeks: "6 semanas",
  hoursPerWeek: "6 horas",
  objective:
    "Proporcionar a los participantes un conocimiento profundo sobre el hidrógeno verde, sus aplicaciones, su impacto en la transición energética, y cómo contribuir a la reducción de huella de carbono mediante esta tecnología innovadora. Los participantes aprenderán sobre la producción, almacenamiento y uso del hidrógeno verde en un mundo que busca soluciones sostenibles.",
  methodology: [
    "Clases teóricas con ejemplos de casos reales, presentaciones multimedia y recursos interactivos",
    "Talleres prácticos con simulaciones, estudios de caso, y análisis de proyectos de hidrógeno verde",
    "Evaluaciones interactivas para medir el progreso y comprensión de los temas",
    "Foro de discusión online para compartir ideas y resolver dudas con expertos",
    "Certificación a nombre de PHINIX S.A.C. e HIDRANIX, al completar el curso con éxito",
  ],
  dirigidoA: [
    "Profesionales de ingeniería interesados en energías renovables y tecnologías sostenibles",
    "Técnicos y especialistas en sistemas energéticos que busquen especializarse en hidrógeno verde",
    "Estudiantes de ingeniería en etapa avanzada con interés en transición energética",
    "Empresarios y emprendedores del sector energético que busquen nuevas oportunidades de negocio",
    "Consultores y asesores en proyectos de sostenibilidad y medio ambiente",
  ],
  modules: [
    {
      number: 1,
      title:
        "Fundamentos del Hidrógeno Verde y Producción Directa sin Compresión",
      sessions: "1 y 2",
      hours: 12,
      week: 1,
      dates: ["Martes 2 de septiembre", "Jueves 4 de septiembre"],
      objective:
        "Brindar a los participantes una comprensión técnica sólida sobre el hidrógeno verde como vector energético, enfocándose especialmente en métodos de generación que permitan alcanzar presiones elevadas desde la producción.",
      topics: [
        "El rol del hidrógeno en la transición energética mundial",
        "Tipología y clasificación del hidrógeno: gris, azul, turquesa y verde",
        "Fundamentos de la electrólisis del agua",
        "Cadena de valor del hidrógeno",
        "Aplicaciones energéticas del hidrógeno verde",
        "Regulación, seguridad y mercados emergentes",
      ],
    },
    {
      number: 2,
      title: "Tecnologías de Compresión y Licuefacción de Hidrógeno",
      sessions: "3 y 4",
      hours: 6,
      week: 3,
      dates: ["Jueves 11 de septiembre", "Martes 16 de septiembre"],
      objective:
        "Profundizar en los métodos de compresión de hidrógeno gaseoso y explorar alternativas de licuefacción y almacenamiento en estado líquido o supercrítico.",
      topics: [
        "Fundamentos físicos de la compresión de gases",
        "Tipos de compresores para hidrógeno: principios y aplicaciones",
        "Parámetros de diseño y eficiencia en sistemas de compresión",
        "Principios de licuefacción del hidrógeno y comportamiento criogénico",
        "Almacenamiento criogénico y riesgos operativos",
        "Sistemas híbridos de generación-presurización integrados",
      ],
    },
    {
      number: 3,
      title: "Repostaje, Recarga y Seguridad en Sistemas de Almacenamiento",
      sessions: "5 y 6",
      hours: 6,
      week: 4,
      dates: ["Jueves 18 de septiembre", "Martes 23 de septiembre"],
      objective:
        "Capacitar en los fundamentos técnicos del repostaje automático, la recarga segura de cilindros de hidrógeno a alta presión y el diseño seguro de sistemas de almacenamiento.",
      topics: [
        "Fundamentos del repostaje de hidrógeno a alta presión",
        "Componentes del sistema de repostaje: válvulas, conectores y sensores",
        "Diseño de sistemas de recarga: desde electrolizador hasta cilindro",
        "Riesgos en el almacenamiento de hidrógeno a alta presión",
        "Estrategias de mitigación y diseño seguro",
        "Normativas y protocolos de seguridad en almacenamiento",
      ],
    },
    {
      number: 4,
      title: "Normativa, Estándares Técnicos y Buenas Prácticas",
      sessions: "7 y 8",
      hours: 6,
      week: 5,
      dates: ["Jueves 25 de septiembre", "Martes 30 de septiembre"],
      objective:
        "Dotar de conocimientos fundamentales sobre el marco normativo internacional y nacional del hidrógeno, así como las mejores prácticas para el diseño, construcción y operación.",
      topics: [
        "Normas y estándares internacionales clave en sistemas de hidrógeno",
        "Reglamentación nacional y marco legal peruano",
        "Protocolos de pruebas, ensayos y certificación de componentes",
        "Buenas prácticas en el diseño de sistemas de hidrógeno",
        "Operación segura y monitoreo continuo",
        "Mantenimiento preventivo y predictivo en sistemas de H₂",
      ],
    },
    {
      number: 5,
      title: "Aplicación Práctica - Sistema Integrado HIDRANIX",
      sessions: "9, 10 y 11",
      hours: 6,
      week: 6,
      dates: [
        "Jueves 2 de octubre",
        "Martes 7 de octubre",
        "Jueves 9 de octubre",
      ],
      objective:
        "Aplicar de forma integral los conocimientos técnicos adquiridos a un caso real: el sistema de cocina de hidrógeno HIDRANIX.",
      topics: [
        "Arquitectura general del sistema HIDRANIX",
        "Electrolizador presurizado: diseño, materiales y resistencia mecánica",
        "Lógica de conexión hidráulica y presurización automática",
        "Proceso automático de llenado del tanque de fibra de carbono",
        "Uso del gas para combustión en la hornilla",
        "Mecanismos de seguridad térmica, estructural y de presión",
        "Evaluación funcional del sistema bajo estándares técnicos",
      ],
    },
  ],
  investment: {
    regular: 600,
    earlyBird: 570,
    earlyBirdDeadline: "24/08/2025",
  },
  instructorInfo: {
    company: "PHINIX S.A.C. e HIDRANIX",
    description:
      "Expertos en tecnologías energéticas sostenibles y sistemas de hidrógeno verde",
    contact: "+51 916699070",
    email: "hidranix.phinix@gmail.com",
  },
  benefits: [
    "Conocimiento especializado en hidrógeno verde",
    "Aplicación práctica con casos reales",
    "Certificado digital reconocido",
    "Acceso a foros de discusión con expertos",
    "Material didáctico actualizado",
    "Networking con profesionales del sector",
  ],
  silaboPdf: silaboPdf,
};

export const CourseH2V002 = () => {
  useEffect(() => {
    document.title = `${courseData.title} - Econix`;
  }, []);

  return (
    <>
      <NavBarEconix variantColor showTitle title={courseData.title} />
      <CourseHero courseData={courseData} />
      <CourseInfo courseData={courseData} />
      <CourseModules modules={courseData.modules} />
      <CourseDetails courseData={courseData} />
      <CourseInvestment courseData={courseData} />
      <CourseRegistration courseData={courseData} />
      <Footer
        {...phinixSocialLinks}
        slogan="Educación, consultoría y oportunidad de nuevas innovaciones exitosas"
        pageName="Econix"
      />
      <WhatsAppCTAMultiple contacts={courseContacts} />
    </>
  );
};

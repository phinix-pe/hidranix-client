import type { Contact, CourseData } from "../../../shared/interfaces";
import silaboPdf from "../../../../../assets/files/Silabo_SSOMA001.pdf";

export const courseContacts: Contact[] = [
  {
    name: "Asesor Académico",
    number: "+51916699070",
    message:
      "Hola, me gustaría obtener más información sobre el curso de Sistemas Fotovoltaicos...",
  },
  {
    name: "Asesor Académico",
    number: "+51989563108",
    message:
      "Hola, me gustaría obtener más información sobre el curso de Sistemas Fotovoltaicos...",
  },
];

export const courseData: CourseData = {
  title:
    "Sistemas Fotovoltaicos: Diseño, Dimensiones e Integración a Sistemas Eléctricos",
  courseCode: "FOTO001",
  duration: "12 horas académicas",
  modality: "Híbrido (Virtual y Presencial)",
  startDate: "25/11/2025",
  endDate: "29/11/2025",
  schedule: "Martes y Viernes (Online) / Sábado (Presencial)",
  sessions: "3 sesiones",
  weeks: "1 semana",
  hoursPerWeek: "12 horas",
  objective:
    "Capacitar a los participantes en los conceptos técnicos fundamentales y en la práctica del diseño y dimensionamiento de sistema fotovoltaicos. Al finalizar el workshop, podrán evaluar la viabilidad técnica y económica de proyectos solares, seleccionar componentes adecuados y comprender el mantenimiento básico para garantizar la eficiencia de los sistemas.",
  methodology: [
    "Clases teóricas con ejemplos de casos reales, presentaciones multimedia y recursos interactivos.",
    "Talleres prácticos con simulaciones, estudios de caso, y análisis de proyectos solares.",
    "Certificación a nombre de PHINIX S.A.C. e HIDRANIX, al completar el curso con éxito.",
  ],
  dirigidoA: [
    "Estudiantes y profesionales de ingeniería eléctrica, mecánica, mecatrónica, energía y afines.",
    "Técnicos e instaladores interesados en sistemas solares fotovoltaicos.",
    "Emprendedores del sector energético.",
    "Entusiastas que deseen iniciarse en el diseño y aplicación de proyectos solares residenciales o comerciales.",
  ],

  modules: [
    {
      number: 1,
      title: "Fundamentos y Conceptos Técnicos (Online)",
      sessions: "1",
      hours: 4,
      week: 1,
      dates: ["Martes 25 de Noviembre (7:00pm - 8:40pm)"],
      objective:
        "Comprender la base teórica y el contexto técnico de la energía solar y los sistemas fotovoltaicos.",
      topics: [
        "Introducción a la energía solar y sus aplicaciones.",
        "Radiación solar, irradiancia y potencia incidente.",
        "Tipos de tecnologías fotovoltaicas: monocristalina, policristalina, PERC.",
        "Configuración de sistemas On-Grid y Off-Grid.",
        "Componentes principales y su función en el sistema.",
        "Normativas y estándares aplicables en Perú (COES, NEC, IEC).",
      ],
    },
    {
      number: 2,
      title: "Dimensionamiento y Aplicación Práctica (Online)",
      sessions: "2",
      hours: 4,
      week: 1,
      dates: ["Viernes 28 de Noviembre (7:00pm - 8:40pm)"],
      objective:
        "Desarrollar el proceso de cálculo y dimensionamiento básico de un sistema solar residencial o comercial.",
      topics: [
        "Pasos del dimensionamiento: análisis de consumo, ubicación y demanda.",
        "Cálculo de potencia instalada y selección de paneles e inversor.",
        "Criterios para elección de baterías y controladores (para Off-Grid).",
        "Diseño básico del diagrama unifilar y consideraciones de instalación.",
        "Introducción a herramientas de simulación.",
        "Mantenimiento preventivo, seguridad eléctrica y eficiencia del sistema.",
      ],
    },
    {
      number: 3,
      title: "Práctica de lo Aprendido (Presencial)",
      sessions: "3",
      hours: 4,
      week: 1,
      dates: ["Sábado 29 de Noviembre (9:00am - 2:00pm)"],
      objective:
        "Aplicar de forma práctica los conocimientos de diseño, dimensionamiento e instalación en un taller en vivo.",
      topics: [
        "Taller de dimensionamiento práctico.",
        "Reconocimiento e instalación de componentes.",
        "Simulación de escenarios (On-Grid y Off-Grid).",
        "Mediciones y protocolos de seguridad.",
      ],
    },
  ],
  investment: {
    regular: 180,
    earlyBird: 180,
    earlyBirdDeadline: "",
  },
  instructorInfo: {
    company: "PHINIX S.A.C. e HIDRANIX",
    description:
      "Ing. Rolando Garay: Gerente Comercial - M4S Microrredes Sostenibles. Ingeniero Mecánico Electricista (UNI). Máster en Energías Renovables. 9 años de trayectoria. | Ing. Keneth Perez: Gerente General de PHINIX. Ingeniero Eléctrico (UNSA). Candidato a Magíster en Gestión de la Energía. Especialista en sistemas solares, automatización e IoT.",
    contact: "+51 916699070",
    email: "comercial.phinix@gmail.com",
  },
  benefits: [
    "Capacitación personalizada",
    "Modalidad híbrida",
    "Impulsa la innovación y el uso de energías renovables",
    "Certificación a nombre de PHINIX S.A.C. e HIDRANIX",
    "Talleres prácticos con simulaciones y estudios de caso",
    "Networking con docentes líderes en el sector",
  ],
  silaboPdf: silaboPdf,
  registrationLink: "https://forms.gle/H2RjRj2We9yvop3L8",
};

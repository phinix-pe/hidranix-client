import type { Contact, CourseData } from "../../../shared/interfaces";
import silaboPdf from "../../../../../assets/files/Silabo_SSOMA001.pdf";

export const courseContacts: Contact[] = [
  {
    name: "Asesor Académico",
    number: "+51916699070",
    message:
      "Hola, me gustaría obtener más información sobre el curso de SSOMA...",
  },
  {
    name: "Asesor Académico",
    number: "+51989563108",
    message:
      "Hola, me gustaría obtener más información sobre el curso de SSOMA...",
  },
];

export const courseData: CourseData = {
  title:
    "Curso Especializado SSOMA: Seguridad, Prevención y Sostenibilidad para Entornos Industriales",
  courseCode: "SSOMA001",
  duration: "24 horas académicas",
  modality: "Híbrido (Virtual y Presencial)",
  startDate: "12/11/2025",
  endDate: "13/12/2025",
  schedule: "Miércoles, Viernes (Virtual) y Sábado (Presencial)",
  sessions: "10 sesiones + 1 introductoria",
  weeks: "4 semanas",
  hoursPerWeek: "6 horas (promedio)",
  objective:
    "Brindar a los participantes conocimientos teóricos y prácticos en Seguridad y Salud en el Trabajo (SST) y Gestión Ambiental, incorporando el enfoque de Seguridad Basada en el Comportamiento (BBS). El curso busca desarrollar competencias para identificar, evaluar y controlar riesgos laborales y ambientales, promover la cultura preventiva, y fomentar la sostenibilidad dentro de las organizaciones, integrando la normativa vigente con herramientas modernas de gestión.",
  methodology: [
    "Clases virtuales sincrónicas con presentaciones multimedia, normativa actualizada y casos de estudio.",
    "Talleres prácticos aplicados a la realidad laboral (IPERC, planes ambientales, checklist BBS).",
    "Análisis de casos reales de incidentes de SST y emergencias ambientales.",
    "Dinámicas de grupo y simulaciones para reforzar la toma de decisiones en seguridad y ambiente.",
    "Foro de discusión y retroalimentación entre participantes e instructores.",
  ],
  dirigidoA: [
    "Estudiantes, técnicos y profesionales de Ingeniería Industrial, Ambiental, de Minas, Civil, Química, Mecánica, Energía y afines.",
    "Personal que trabaja o desea trabajar en minería, construcción, manufactura, energía, hidrocarburos, logística y operaciones.",
    "Supervisores, jefes de área y responsables de seguridad, medio ambiente, operaciones, mantenimiento y recursos humanos.",
  ],

  modules: [
    {
      number: 1,
      title: "Fundamentos de la Seguridad y la Sostenibilidad",
      sessions: "1 y 2",
      hours: 4,
      week: 1,
      dates: ["Miércoles 12/11/2025", "Viernes 14/11/2025"],
      objective:
        "Dotar a los participantes de los conocimientos básicos sobre la Seguridad y Salud en el Trabajo (SST) y la Gestión Ambiental, comprendiendo el marco normativo vigente y los principios de sostenibilidad. Se busca generar una visión integral de la prevención y la responsabilidad ambiental en las organizaciones.",
      topics: [
        "Introducción a la SST y Marco Normativo (2.0 h)",
        "Fundamentos de Gestión Ambiental y Economía Circular (2.0 h)",
      ],
    },
    {
      number: 2,
      title: "Identificación y Control de Riesgos Laborales",
      sessions: "3, 4 y 5",
      hours: 7,
      week: 2,
      dates: [
        "Miércoles 19/11/2025",
        "Viernes 21/11/2025",
        "Miércoles 26/11/2025",
      ],
      objective:
        "Capacitar a los participantes en la identificación, evaluación y control de riesgos laborales, aplicando herramientas como la Matriz IPERC y la jerarquía de controles, con énfasis en la selección adecuada de Equipos de Protección Personal (EPP) y el diseño de medidas preventivas efectivas en distintos entornos de trabajo.",
      topics: [
        "Tipología de Riesgos en el Trabajo (2.5 h)",
        "Matriz IPERC y Herramientas de Evaluación (2.0 h)",
        "Controles de Riesgo y Equipos de Protección Personal (EPP) (2.5 h)",
      ],
    },
    {
      number: 3,
      title: "Gestión Ambiental y Seguridad Basada en el Comportamiento",
      sessions: "6, 7 y 8",
      hours: 7,
      week: 3,
      dates: [
        "Viernes 28/11/2025",
        "Miércoles 03/12/2025",
        "Viernes 05/12/2025",
      ],
      objective:
        "Brindar competencias para implementar sistemas de gestión ambiental (ISO 14001) integrados con la gestión de SST (ISO 45001), fomentar prácticas adecuadas de manejo de residuos y planes de contingencia, e introducir el enfoque de Seguridad Basada en el Comportamiento (BBS) como herramienta para fortalecer la cultura preventiva.",
      topics: [
        "Normativa Ambiental y Sistemas de Gestión Integrados (2.5 h)",
        "Gestión de Residuos y Planes de Contingencia Ambiental (2.0 h)",
        "Seguridad Basada en el Comportamiento (BBS) (2.5 h)",
      ],
    },
    {
      number: 4,
      title: "Cultura Preventiva, Emergencias y Práctica Presencial",
      sessions: "9 y 10",
      hours: 6,
      week: 4,
      dates: ["Miércoles 10/12/2025", "Sábado 13/12/2025"],
      objective:
        "Consolidar lo aprendido mediante el desarrollo de habilidades prácticas en identificación de peligros, gestión de emergencias y aplicación del enfoque BBS. Los participantes reforzarán la importancia de la cultura preventiva y el liderazgo en seguridad, aplicando sus conocimientos en una sesión presencial práctica con simulacros y propuestas de mejora.",
      topics: [
        "Cultura de Seguridad y Preparación ante Emergencias (2.0 h)",
        "Taller Integral en Campo (4.0 h - Presencial)",
      ],
    },
  ],
  investment: {
    regular: 240,
    earlyBird: 240,
    earlyBirdDeadline: "",
  },
  instructorInfo: {
    company: "PHINIX S.A.C. y Colegio de Ingenieros del Perú - Arequipa",
    description:
      "Ing. Alexander Bravo: Gerente General de BCG SOLUCIONES DE INGENIERIA Y GESTION. Ingeniero de Minas (UNSA) con Maestría en Ciencias en Seguridad y Medio Ambiente. Más de 10 años de experiencia en minería e hidrocarburos, especialista en perforación, voladura y seguridad. Ha implementado sistemas de gestión en compañías como Volcan, Hudbay, Cerro Verde, Quellaveco, Antapaccay, entre otras.",
    contact: "+51 916699070",
    email: "comercial.phinix@gmail.com",
  },
  benefits: [
    "Formación práctica en prevención, seguridad y sostenibilidad.",
    "Mejora tu empleabilidad con enfoque alineado a estándares corporativos.",
    "Desarrolla liderazgo en gestión de riesgos y responsabilidad ambiental.",
    "Aplicable a sectores como minería, construcción, industria, energía e hidrocarburos.",
    "Orientado a la acción y mejora continua con certificación profesional incluida.",
  ],
  silaboPdf: silaboPdf,
  registrationLink: "https://forms.gle/uVqsXryUYzz7GWfLA",
};

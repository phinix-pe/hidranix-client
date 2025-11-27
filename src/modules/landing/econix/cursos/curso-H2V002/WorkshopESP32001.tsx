import type { Contact, CourseData } from "../../../shared/interfaces";
import silaboPdf from "../../../../../assets/files/Silabo_ESP32001.pdf";

export const courseContacts: Contact[] = [
  {
    name: "Asesor Académico",
    number: "+51916699070",
    message:
      "Hola, me gustaría obtener más información sobre el Workshop de Automatización e IoT con ESP32...",
  },
];

export const courseData: CourseData = {
  title: "AUTOMATIZACIÓN E IOT: PROGRAMACIÓN INTELIGENTE CON ESP32",
  courseCode: "ESP32001",
  duration: "9 horas académicas",
  modality: "100% presencial en la Cámara de Comercio de Arequipa",
  startDate: "06/12/2025",
  endDate: "06/12/2025",
  schedule: "Sábado 9 A.M. - 1 P.M.",
  sessions: "1 sesión",
  weeks: "1 semana",
  hoursPerWeek: "5 horas académicas",
  objective:
    "Te permitirá aprender de forma práctica a usar el ESP32, un microcontrolador moderno y versatil, para desarrollar proyectos conectados a internet y enviar datos en tiempo real. Este taller te acercará al mundo de la automatización, la eficiencia y la innovación tecnológica, potenciando tus habilidades para crear soluciones inteligentes.",
  methodology: [
    "Taller 100% presencial y práctico",
    "Configuración de hardware (ESP32 y sensor NTC)",
    "Programación en Arduino IDE y Visual Studio Code",
    "Desarrollo de proyecto IoT con conexión WiFi a la nube",
    "Creación de dashboards online para visualización de datos en tiempo real",
  ],
  dirigidoA: [
    "Estudiantes y profesionales de ingeniería, electrónica, mecatrónica e informática.",
    "Personas con conocimientos básicos de programación que deseen iniciarse en loT.",
    "Emprendedores y entusiastas makers interesados en proyectos de automatización y monitoreo.",
  ],

  modules: [
    {
      number: 1,
      title: "Contenido del Workshop",
      sessions: "1",
      hours: 5,
      week: 1,
      dates: ["Sábado 06/12/2025"],
      objective:
        "Aplicar en la práctica los fundamentos del ESP32, desde la configuración inicial hasta el envío de datos de sensores a la nube y su visualización.",
      topics: [
        "CONOCIENDO EL ESP32: Características, pines, modelos, instalación y configuración.",
        "CONEXIÓN A WIFI: Configuración WiFi y pruebas de conexión.",
        "USO DE SENSORES: Conexión física de sensor NTC y lectura de datos.",
        "DATOS EN LA NUBE: Protocolos IoT (HTTP/MQTT), configuración de servidores y envío en tiempo real.",
        "VISUALIZACIÓN DE LA INFORMACIÓN: Creación de dashboards online y gráficos en tiempo real.",
      ],
    },
  ],
  investment: {
    regular: 150,
    earlyBird: 150,
    earlyBirdDeadline: "",
  },
  instructorInfo: {
    company: "PHINIX S.A.C.",
    description:
      "Ing. Keneth Brayan Pérez Huaroc. Ingeniero Eléctrico (UNSA), especialista en automatización, IoT, Arduino y ESP32. Amplia experiencia en PLC, SCADA HMI y más de 10 años de experiencia en proyectos industriales.",
    contact: "+51 916699070",
    email: "comercial.phinix@gmail.com",
  },
  benefits: [
    "Aprendizaje práctico para desarrollar proyectos IoT.",
    "Conocimiento de un microcontrolador versátil (ESP32).",
    "Capacidad para crear soluciones inteligentes y conectadas.",
    "Certificado por 9 horas académicas.",
    "Potencia tus habilidades en automatización e innovación.",
  ],
  silaboPdf: silaboPdf,
  registrationLink: "https://forms.gle/CHy4WcK8FsWYLmUf7",
};

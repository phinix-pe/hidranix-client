import { Course, User } from "./types";

// --- CONFIGURACIÓN ---
export const CURRENT_DATE = new Date();

// --- UTILS ---
export const getCourseStatus = (endDateString: string) => {
  const endDate = new Date(endDateString);
  const diffTime = endDate.getTime() - CURRENT_DATE.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isExpired = diffDays < 0;
  return { isExpired, daysLeft: diffDays };
};

// --- MOCK DATA ---
export const initialUser: User = {
  id: 1,
  name: "Braulio Maldonado",
  email: "bmaldonadoc@unsa.edu.pe",
  avatar: "BM",
  role: "student",
  bio: "Estudiante de Ingeniería apasionado por la automatización.",
};

export const initialCoursesData: Course[] = [
  {
    id: 101,
    title: "Automatización e IOT: Programación Inteligente con ESP32",
    instructor: "Ing. Keneth Brayan Pérez Huaroc",
    progress: 35,
    isCompleted: false,
    startDate: "2025-11-01",
    endDate: "2025-12-15",
    totalModules: 8,
    image:
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=600",
    description: "Domina el internet de las cosas...",
    modules: [
      {
        id: "m1",
        title: "Módulo 1: Introducción al IoT y ESP32",
        lessons: [
          {
            id: "l1",
            title: "Fundamentos de IoT",
            type: "video",
            duration: "10:00",
            completed: true,
          },
          {
            id: "l2",
            title: "Configuración del entorno Arduino IDE",
            type: "video",
            duration: "15:30",
            completed: true,
          },
          {
            id: "l3",
            title: "Lectura: Hoja de datos del ESP32",
            type: "text",
            duration: "5 min",
            completed: true,
          },
        ],
      },
      {
        id: "m2",
        title: "Módulo 2: Sensores y Actuadores",
        lessons: [
          {
            id: "l4",
            title: "Lectura de sensores analógicos",
            type: "video",
            duration: "12:00",
            completed: false,
          },
          {
            id: "l5",
            title: "Control de Relés y Motores",
            type: "video",
            duration: "20:00",
            completed: false,
          },
          {
            id: "l6",
            title: "Proyecto: Sistema de Riego Automático",
            type: "assignment",
            duration: "Tarea",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 102,
    title: "Sistemas Fotovoltaicos: Diseño, Dimensiones e Integración",
    instructor: "Ing. Rolando Garay",
    progress: 100,
    isCompleted: true,
    startDate: "2025-10-01",
    endDate: "2025-12-29",
    totalModules: 5,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
    description: "Aprende a dimensionar e instalar paneles solares...",
    modules: [
      {
        id: "m1_solar",
        title: "Módulo 1: Energía Solar Básica",
        lessons: [
          {
            id: "l1_s",
            title: "La Radiación Solar",
            type: "video",
            duration: "14:00",
            completed: true,
          },
          {
            id: "l2_s",
            title: "Tipos de Paneles Solares",
            type: "text",
            duration: "10 min",
            completed: true,
          },
        ],
      },
    ],
  },
  {
    id: 103,
    title: "SSOMA: Seguridad, Prevención y Sostenibilidad",
    instructor: "Ing. Alexander Bravo",
    progress: 15,
    isCompleted: false,
    startDate: "2025-11-10",
    endDate: "2025-11-22",
    totalModules: 4,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
    description: "Normativas de seguridad industrial...",
    modules: [
      {
        id: "m1_ssoma",
        title: "Módulo 1: Normativa Vigente",
        lessons: [
          {
            id: "l1_ssoma",
            title: "Ley de Seguridad y Salud",
            type: "video",
            duration: "25:00",
            completed: true,
          },
          {
            id: "l2_ssoma",
            title: "Matrices IPERC",
            type: "text",
            duration: "15 min",
            completed: false,
          },
        ],
      },
    ],
  },
];

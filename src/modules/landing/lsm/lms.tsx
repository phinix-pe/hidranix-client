import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  ShieldAlert,
  CheckCircle,
  Calendar,
  Lock,
  Award,
  BookOpen,
  Menu,
  Bell,
  LogOut,
  ChevronDown,
  Video,
  FileText,
  Clock,
  Upload,
  Cpu,
  X,
  Download,
  AlertTriangle,
  User as UserIcon,
  Save,
  Loader2,
} from "lucide-react";

// ==========================================
// 1. TYPES (Actualizados para la DB)
// ==========================================

export type LessonType = "video" | "text" | "assignment";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed: boolean;
  content_url?: string; // Campo nuevo de DB
  content_text?: string; // Campo nuevo de DB
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  totalModules: number;
  image: string;
  description: string;
  modules: Module[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface Submission {
  file: string;
  date: string;
  status: "submitted" | "graded" | "pending";
}

export interface EditProfileForm {
  name: string;
  email: string;
  bio: string;
}

// ==========================================
// 2. DATA & UTILS & API SERVICE
// ==========================================

const API_URL = "http://localhost:3001";

export const CURRENT_DATE = new Date();

export const getCourseStatus = (endDateString: string) => {
  const endDate = new Date(endDateString);
  const diffTime = endDate.getTime() - CURRENT_DATE.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isExpired = diffDays < 0;
  return { isExpired, daysLeft: diffDays };
};

// --- API HELPER ---
async function apiCall(
  endpoint: string,
  method: string = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  token?: string
) {
  const headers: HeadersInit = {};

  // Solo agregamos Content-Type JSON si NO es FormData
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401 || response.status === 403) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Error en la petición");
  }

  return response.json();
}

// ==========================================
// 3. COMPONENTS
// ==========================================

// --- Global Styles ---
export const GlobalStyles: React.FC = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");
    
    :root {
      --color-primary: #006a78;
      --color-primary-light: #1a7984;
      --color-primary-dark: #043c42;
      --color-background: #f7f7f7;
      --color-gold: #c5a059;
      --color-danger: #e53e3e;
    }

    body {
      font-family: "Inter", sans-serif;
      background-color: var(--color-background);
    }
    
    .certificate-pattern {
      background-color: #fdfbf7;
      background-image: radial-gradient(#006a78 0.5px, transparent 0.5px), radial-gradient(#006a78 0.5px, #ffffff 0.5px);
      background-size: 20px 20px;
    }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(200, 200, 200, 0.5);
      border-radius: 20px;
    }

    .animate-bounce-in {
      animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes bounceIn {
      0% { opacity: 0; transform: translate(-50%, -20px); }
      100% { opacity: 1; transform: translate(-50%, 0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `}</style>
);

// --- ProgressBar ---
interface ProgressBarProps {
  progress: number;
  isExpired?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  isExpired = false,
}) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className={`h-2.5 rounded-full transition-all duration-500 ${
        isExpired
          ? "bg-gray-400"
          : progress === 100
          ? "bg-green-500"
          : "bg-[#006a78]"
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

// --- CertificatePreview ---
interface CertificatePreviewProps {
  course: Course;
  studentName: string;
  onClose: () => void;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  course,
  studentName,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
          <h3 className="font-bold text-[#043c42] flex items-center gap-2">
            <Award className="text-[#c5a059]" size={20} />
            Certificado Oficial
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 p-4 md:p-8 flex justify-center">
          <div className="certificate-pattern w-full max-w-3xl aspect-[1.414/1] relative shadow-lg border-[12px] border-[#043c42] p-8 md:p-12 flex flex-col items-center text-center justify-between text-[#043c42]">
            <div className="absolute top-0 left-0 w-24 h-24 border-r-[1px] border-b-[1px] border-[#c5a059] bg-[#043c42]"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-l-[1px] border-t-[1px] border-[#c5a059] bg-[#043c42]"></div>
            <div className="absolute top-6 left-6 text-white font-bold tracking-widest z-10">
              ECONIX
            </div>

            <div className="w-full h-full border-2 border-[#c5a059] p-8 flex flex-col items-center justify-center relative bg-white/90">
              <div className="mb-6">
                <Award size={48} className="text-[#c5a059] mx-auto mb-2" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#043c42] tracking-wide uppercase">
                  Certificado
                </h1>
                <p className="text-[#006a78] tracking-[0.2em] uppercase text-sm mt-1">
                  De Finalización
                </p>
              </div>
              <p className="text-gray-500 italic mb-4 font-serif text-lg">
                Otorgado a
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#006a78] mb-2 font-serif border-b-2 border-[#c5a059] pb-4 px-8">
                {studentName}
              </h2>
              <p className="text-gray-500 mt-6 mb-2">Por completar el curso</p>
              <h3 className="text-xl md:text-2xl font-bold text-[#043c42] max-w-2xl leading-tight mb-8">
                {course.title}
              </h3>
              <div className="flex justify-between w-full max-w-xl mt-8 pt-8">
                <div className="text-center">
                  <div className="w-32 h-px bg-gray-400 mb-2 mx-auto"></div>
                  <p className="font-bold text-xs">{course.instructor}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-[-20px] relative top-[-30px]">
                    <div className="w-full h-full rounded-full border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] font-bold text-[10px] p-1 rotate-[-15deg] opacity-80">
                      ECONIX CERTIFIED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium"
          >
            Cerrar
          </button>
          <button className="px-6 py-2 bg-[#006a78] text-white rounded-lg font-medium hover:bg-[#043c42] flex items-center gap-2">
            <Download size={18} /> Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CoursesList ---
interface CoursesListProps {
  courses: Course[];
  onEnterCourse: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  onEnterCourse,
  onViewCertificate,
}) => {
  if (courses.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-gray-400">
        <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
        <p>No hay cursos disponibles.</p>
        <p className="text-sm">Inscríbete en uno para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => {
        const { isExpired, daysLeft } = getCourseStatus(course.endDate);

        return (
          <div
            key={course.id}
            className={`bg-white rounded-xl shadow-sm border ${
              isExpired ? "border-red-100" : "border-gray-200"
            } overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative`}
          >
            {/* Header de la Card e Imagen */}
            <div className="h-40 overflow-hidden relative">
              <img
                src={course.image}
                alt={course.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isExpired ? "grayscale" : "group-hover:scale-105"
                }`}
              />
              <div
                className={`absolute inset-0 transition-colors ${
                  isExpired
                    ? "bg-red-900/10"
                    : "bg-[#043c42]/20 group-hover:bg-[#043c42]/10"
                }`}
              ></div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1">
                {isExpired ? (
                  <span className="text-red-600 flex items-center gap-1">
                    <ShieldAlert size={12} /> VENCIDO
                  </span>
                ) : course.isCompleted ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle size={12} /> COMPLETADO
                  </span>
                ) : (
                  <span className="text-[#006a78]">
                    {course.totalModules} Módulos
                  </span>
                )}
              </div>
            </div>

            {/* Cuerpo de la Card */}
            <div className="p-6 flex-1 flex flex-col">
              <h3
                className={`font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem] leading-tight ${
                  isExpired ? "text-gray-500" : "text-[#043c42]"
                }`}
              >
                {course.title}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                  IN
                </div>
                <p className="text-sm text-gray-500">{course.instructor}</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">
                    {isExpired
                      ? "Acceso Finalizado"
                      : `${course.progress}% Completado`}
                  </span>
                </div>
                <ProgressBar progress={course.progress} isExpired={isExpired} />
              </div>

              {/* Footer con Botones */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar size={14} />
                  <span>
                    Vence: {new Date(course.endDate).toLocaleDateString()}
                  </span>
                  {!isExpired && !course.isCompleted && (
                    <span
                      className={`ml-auto font-bold ${
                        daysLeft < 7 ? "text-red-500" : "text-[#006a78]"
                      }`}
                    >
                      {daysLeft} días restantes
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {/* CASO 1: Vencido y NO Completado -> Bloqueado */}
                  {isExpired && !course.isCompleted ? (
                    <div className="w-full bg-red-50 border border-red-100 rounded-lg p-2 flex items-center justify-center gap-2 text-red-700 font-bold text-sm">
                      <Lock size={16} /> Curso Cerrado
                    </div>
                  ) : /* CASO 2: Vencido Y Completado -> Solo Certificado (Full Width) */
                  isExpired && course.isCompleted ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCertificate(course);
                      }}
                      className="w-full py-2.5 bg-[#c5a059] text-white rounded-lg font-medium hover:bg-[#b08d48] transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <Award size={18} /> Ver Certificado Oficial
                    </button>
                  ) : (
                    /* CASO 3: Curso Activo -> Botones Normales */
                    <>
                      <button
                        onClick={() => onEnterCourse(course)}
                        className={`flex-1 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm ${
                          course.isCompleted
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-[#006a78] text-white hover:bg-[#043c42] shadow-md shadow-[#006a78]/20"
                        }`}
                      >
                        {course.isCompleted
                          ? "Repasar Material"
                          : "Continuar Curso"}
                      </button>

                      {course.isCompleted && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewCertificate(course);
                          }}
                          className="w-12 bg-[#c5a059] text-white rounded-lg flex items-center justify-center hover:bg-[#b08d48] transition-colors shadow-sm relative z-10"
                          title="Ver Certificado"
                        >
                          <Award size={20} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- Dashboard ---
interface DashboardProps {
  user: User;
  courses: Course[];
  isLoading: boolean;
  onEnterCourse: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  courses,
  isLoading,
  onEnterCourse,
  onViewCertificate,
}) => {
  const [dashboardTab, setDashboardTab] = useState<"active" | "history">(
    "active"
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-20">
        <Loader2 className="animate-spin text-[#006a78] mb-4" size={48} />
        <p className="text-gray-500">Cargando tus cursos...</p>
      </div>
    );
  }

  const activeCourses = courses.filter((c) => {
    const { isExpired } = getCourseStatus(c.endDate);
    return !isExpired && !c.isCompleted;
  });

  const historyCourses = courses.filter((c) => {
    const { isExpired } = getCourseStatus(c.endDate);
    return isExpired || c.isCompleted;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#043c42]">
          Hola, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Gestiona tu aprendizaje. Tienes acceso hasta las fechas indicadas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-[#006a78]/10 text-[#006a78] rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#043c42]">
              {activeCourses.length}
            </h3>
            <p className="text-gray-500 text-sm">Cursos Activos</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-700 rounded-lg">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#043c42]">
              {
                historyCourses.filter(
                  (c) => getCourseStatus(c.endDate).isExpired && !c.isCompleted
                ).length
              }
            </h3>
            <p className="text-gray-500 text-sm">Cursos Vencidos</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setDashboardTab("active")}
          className={`pb-3 font-medium text-sm transition-colors relative ${
            dashboardTab === "active"
              ? "text-[#006a78]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Aprendizaje Activo ({activeCourses.length})
          {dashboardTab === "active" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006a78]"></div>
          )}
        </button>
        <button
          onClick={() => setDashboardTab("history")}
          className={`pb-3 font-medium text-sm transition-colors relative ${
            dashboardTab === "history"
              ? "text-[#006a78]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Historial y Vencidos ({historyCourses.length})
          {dashboardTab === "history" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006a78]"></div>
          )}
        </button>
      </div>

      <CoursesList
        courses={dashboardTab === "active" ? activeCourses : historyCourses}
        onEnterCourse={onEnterCourse}
        onViewCertificate={onViewCertificate}
      />
    </div>
  );
};

// --- Profile ---
interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [form, setForm] = useState<EditProfileForm>({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
  });

  useEffect(() => {
    setForm({ name: user.name, email: user.email, bio: user.bio || "" });
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, ...form });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-[#043c42] relative">
          <div className="absolute -bottom-10 left-8 p-1 bg-white rounded-full">
            <div className="h-20 w-20 rounded-full bg-[#1a7984] flex items-center justify-center text-white text-2xl font-bold border-4 border-white">
              {user.avatar}
            </div>
          </div>
        </div>
        <div className="pt-14 px-8 pb-8">
          <h2 className="text-2xl font-bold text-[#043c42]">Mi Perfil</h2>
          <p className="text-gray-500 text-sm mb-6">
            Gestiona tu información personal
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] focus:border-transparent outline-none bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({ ...form, bio: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] focus:border-transparent outline-none"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#006a78] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#043c42] transition-colors shadow-sm"
              >
                <Save size={18} /> Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- CoursePlayer ---
interface CoursePlayerProps {
  course: Course;
  onExit: () => void;
  showNotification: (msg: string) => void;
}
const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course: initialCourse, // Renombramos para usar estado local
  onExit,
  showNotification,
}) => {
  // Estado local del curso para reflejar cambios inmediatos (completados) sin refetch global
  const [course, setCourse] = useState<Course>(initialCourse);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    course.modules?.[0]?.lessons?.[0] || null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>(
    {}
  );
  const [isUploading, setIsUploading] = useState(false);

  // Cargar submissions existentes al montar
  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("econixToken");
      if (token) {
        try {
          const data = await apiCall("/api/submissions", "GET", null, token);
          setSubmissions(data);
        } catch (e) {
          console.error("Error cargando tareas", e);
        }
      }
    };
    fetchSubmissions();
  }, []);

  // --- SUBIR TAREA ---
  const handleAssignmentSubmit = async (lessonId: string, file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lessonId", lessonId);
      formData.append("courseId", course.id.toString());

      const token = localStorage.getItem("econixToken");
      await apiCall("/api/submissions", "POST", formData, token || "");

      // Actualizar estado de submission
      setSubmissions((prev) => ({
        ...prev,
        [lessonId]: {
          file: file.name,
          date: new Date().toLocaleString(),
          status: "submitted",
        },
      }));

      // Marcar lección como completada visualmente
      updateLocalLessonStatus(lessonId, true);

      showNotification("¡Tarea subida y lección completada!");
    } catch (error) {
      console.error(error);
      showNotification("Error al subir el archivo");
    } finally {
      setIsUploading(false);
    }
  };

  // --- BORRAR TAREA ---
  const handleDeleteSubmission = async (lessonId: string) => {
    if (!confirm("¿Estás seguro de querer borrar tu entrega?")) return;

    try {
      const token = localStorage.getItem("econixToken");
      // Nota: DELETE body no siempre es estándar, usamos params o query si es posible,
      // pero aquí mandamos courseId en body config dentro de apiCall si fuera necesario,
      // pero el backend lo lee de params en el ejemplo simple.
      await apiCall(
        `/api/submissions/${lessonId}`,
        "DELETE",
        { courseId: course.id },
        token || ""
      );

      // Eliminar del estado
      setSubmissions((prev) => {
        const newState = { ...prev };
        delete newState[lessonId];
        return newState;
      });

      showNotification("Entrega eliminada. Puedes subir otra.");
    } catch (error) {
      console.error(error);
      showNotification("Error al borrar la entrega");
    }
  };

  // --- MARCAR COMPLETADO ---
  const markLessonAsCompleted = async () => {
    if (!activeLesson) return;
    try {
      const token = localStorage.getItem("econixToken");
      await apiCall(
        `/api/lessons/${activeLesson.id}/complete`,
        "POST",
        { courseId: course.id },
        token || ""
      );

      updateLocalLessonStatus(activeLesson.id, true);
      showNotification("Lección completada ✅");
    } catch {
      showNotification("Error al marcar como completado");
    }
  };

  // Helper para actualizar estado local del curso profundo
  const updateLocalLessonStatus = (lessonId: string, completed: boolean) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      modules: prevCourse.modules.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed } : l
        ),
      })),
    }));

    // También actualizar activeLesson si es el actual
    if (activeLesson?.id === lessonId) {
      setActiveLesson((prev) => (prev ? { ...prev, completed } : null));
    }
  };

  const navigateLesson = (direction: "next" | "prev") => {
    if (!activeLesson) return;
    const allLessons = course.modules.reduce<Lesson[]>(
      (acc, module) => [...acc, ...module.lessons],
      []
    );
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);

    if (direction === "next" && currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "w-80" : "w-0"
        } overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 bg-[#f7f7f7]">
          <button
            onClick={onExit}
            className="text-xs font-semibold text-gray-500 hover:text-[#006a78] flex items-center gap-1 mb-2"
          >
            <ChevronDown size={14} className="rotate-90" /> Volver al Dashboard
          </button>
          <h2 className="font-bold text-[#043c42] leading-tight text-lg">
            {course.title}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {course.modules.map((module) => {
            // Verificar si el módulo está completo
            const isModuleCompleted = module.lessons.every((l) => l.completed);

            return (
              <div key={module.id} className="border-b border-gray-100">
                <div
                  className={`p-4 font-bold text-sm sticky top-0 flex justify-between items-center ${
                    isModuleCompleted
                      ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                      : "bg-[#fcfcfc] text-[#006a78] border-l-4 border-transparent"
                  }`}
                >
                  {module.title}
                  {isModuleCompleted && (
                    <CheckCircle size={16} className="text-green-600" />
                  )}
                </div>
                <div>
                  {module.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left p-4 flex gap-3 hover:bg-[#f0f9fa] transition-colors border-l-4 ${
                          isActive
                            ? "bg-[#eefcfd] border-[#006a78]"
                            : "border-transparent bg-white"
                        }`}
                      >
                        <div
                          className={`mt-0.5 ${
                            isActive ? "text-[#006a78]" : "text-gray-400"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle size={18} className="text-[#1a7984]" />
                          ) : lesson.type === "video" ? (
                            <Video size={18} />
                          ) : (
                            <FileText size={18} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              isActive
                                ? "font-bold text-[#043c42]"
                                : "text-gray-600"
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <span className="text-xs text-gray-400">
                            {lesson.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-y-auto flex flex-col relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 p-2 bg-[#006a78] text-white rounded-md shadow-lg hover:bg-[#043c42]"
          >
            <Menu size={20} />
          </button>
        )}

        {activeLesson ? (
          <div className="max-w-4xl mx-auto w-full p-6 lg:p-12">
            <div className="mb-8 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 text-[#006a78] text-sm font-bold uppercase tracking-wider mb-2">
                {activeLesson.type === "video"
                  ? "Video Clase"
                  : activeLesson.type === "assignment"
                  ? "Proyecto Práctico"
                  : "Material de Lectura"}
              </div>
              <h1 className="text-3xl font-bold text-[#043c42] mb-4">
                {activeLesson.title}
              </h1>
            </div>

            {/* VIDEO */}
            {activeLesson.type === "video" && (
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg relative group aspect-video flex flex-col items-center justify-center text-white p-8 text-center">
                {activeLesson.content_url ? (
                  <>
                    <div className="mb-6 bg-white/10 p-4 rounded-full">
                      <Video size={48} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Contenido Externo Disponible
                    </h3>
                    <p className="mb-6 text-gray-300 text-sm max-w-md">
                      Video alojado externamente. Haz clic para abrirlo.
                    </p>
                    <a
                      href={activeLesson.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#c5a059] text-white font-bold rounded-lg hover:bg-[#b08d48] transition-colors flex items-center gap-2"
                      onClick={() => markLessonAsCompleted()}
                    >
                      <BookOpen size={20} /> Abrir Recurso de Clase
                    </a>
                  </>
                ) : (
                  <p>No hay URL de video configurada.</p>
                )}
              </div>
            )}

            {/* TEXTO */}
            {activeLesson.type === "text" && (
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm prose max-w-none">
                <h3 className="text-[#006a78] font-bold text-xl mb-4">
                  Contenido de Lectura
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {activeLesson.content_text || "Sin contenido disponible."}
                </p>
              </div>
            )}

            {/* ASSIGNMENT CON BORRADO Y VISTA PREVIA */}
            {activeLesson.type === "assignment" && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 bg-[#eefcfd] border-b border-[#006a78]/20">
                  <h3 className="text-xl font-bold text-[#043c42] mb-2">
                    Entrega de Actividad
                  </h3>
                  <p className="text-[#006a78]">
                    {activeLesson.content_text ||
                      "Sube el PDF solicitado para completar la lección."}
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  {submissions[activeLesson.id] ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center text-center relative group">
                      <CheckCircle size={32} className="text-green-600 mb-2" />
                      <h3 className="font-bold text-green-800">
                        ¡Archivo Recibido!
                      </h3>
                      <div className="flex items-center gap-2 text-green-700 bg-white px-3 py-1 rounded-full text-xs font-mono mt-2 border border-green-200">
                        <FileText size={12} />{" "}
                        {submissions[activeLesson.id].file}
                      </div>
                      <p className="text-green-600 text-xs mt-2">
                        Enviado el {submissions[activeLesson.id].date}
                      </p>

                      {/* Botón de Borrar/Cambiar */}
                      <button
                        onClick={() => handleDeleteSubmission(activeLesson.id)}
                        className="mt-6 text-red-500 hover:text-red-700 text-sm font-bold underline flex items-center gap-1"
                      >
                        <X size={14} /> Borrar envío y subir otro
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center hover:bg-[#f7f7f7] transition-colors group cursor-pointer relative">
                      {isUploading ? (
                        <div className="text-[#006a78] font-bold flex flex-col items-center">
                          <Loader2 className="animate-spin mb-2" size={32} />
                          Subiendo archivo...
                        </div>
                      ) : (
                        <>
                          <Upload
                            size={32}
                            className="text-[#006a78] mb-4 group-hover:scale-110 transition-transform"
                          />
                          <h3 className="font-bold text-[#043c42] mb-1">
                            Cargar Archivos (PDF)
                          </h3>
                          <p className="text-xs text-gray-400 mb-4">
                            Haz clic para seleccionar
                          </p>
                          <label className="cursor-pointer absolute inset-0 w-full h-full opacity-0">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0])
                                  handleAssignmentSubmit(
                                    activeLesson.id,
                                    e.target.files[0]
                                  );
                              }}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-gray-100">
              {/* Botón Marcar Completo (Solo si no es assignment ya completo) */}
              {!activeLesson.completed &&
                activeLesson.type !== "assignment" && (
                  <button
                    onClick={markLessonAsCompleted}
                    className="self-center flex items-center gap-2 text-[#006a78] hover:bg-[#eefcfd] px-6 py-2 rounded-full border border-[#006a78] transition-colors font-medium mb-4"
                  >
                    <CheckCircle size={18} /> Marcar Lección como Completada
                  </button>
                )}

              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => navigateLesson("prev")}
                  className="flex items-center gap-2 font-medium px-4 py-2 rounded-lg text-gray-500 hover:text-[#006a78] hover:bg-gray-50"
                >
                  <ChevronDown size={20} className="rotate-90" /> Anterior
                </button>
                <button
                  onClick={() => navigateLesson("next")}
                  className="flex items-center gap-2 font-medium px-4 py-2 rounded-lg text-gray-500 hover:text-[#006a78] hover:bg-gray-50"
                >
                  Siguiente <ChevronDown size={20} className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Cpu size={48} className="text-[#006a78] opacity-20 mb-4" />
            <p>Selecciona una lección para comenzar</p>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Auth Components ---

interface LoginScreenProps {
  onLogin: (token: string, user: User) => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiCall("/auth/login", "POST", { email, password });
      onLogin(data.token, data.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al registrarse");
      } else {
        setError("Error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 relative z-10">
        <div className="text-center mb-8">
          <div className="bg-[#006a78] w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#006a78]/30">
            <BookOpen size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#043c42] tracking-tight">
            ECONIX
          </h1>
          <p className="text-gray-500 mt-2">
            Plataforma de Aprendizaje Profesional
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#006a78] text-white rounded-lg font-bold hover:bg-[#043c42] transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-[#006a78] font-bold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

interface RegisterScreenProps {
  onRegister: (token: string, user: User) => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onNavigateToLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiCall("/auth/register", "POST", {
        name,
        email,
        password,
      });
      onRegister(data.token, data.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al registrarse");
      } else {
        setError("Error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 relative z-10">
        <div className="text-center mb-6">
          <div className="bg-[#006a78] w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#006a78]/30">
            <UserIcon size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#043c42] tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-gray-500 mt-2">Únete a la comunidad de ECONIX</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="Juan Perez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repetir
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#006a78] text-white rounded-lg font-bold hover:bg-[#043c42] transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Registrarse"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-[#006a78] font-bold hover:underline"
              >
                Inicia Sesión
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP COMPONENT (EconixLMS Logic)
// ==========================================
import { useNavigate } from "react-router-dom";

export default function EconixLMS() {
  const navigate = useNavigate();
  const [loadingApp, setLoadingApp] = useState(true);

  // App State
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const [view, setView] = useState<
    "dashboard" | "course" | "certificates" | "profile"
  >("dashboard");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Course | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // 1. Initial Load Check
  useEffect(() => {
    const savedToken = localStorage.getItem("econixToken");
    const savedUser = localStorage.getItem("econixUser");

    // VALIDACIÓN ROBUSTA: Verificamos que no sea null, ni "undefined", ni cadena vacía
    if (savedToken && savedUser && savedUser !== "undefined") {
      setToken(savedToken);
      try {
        // Intentamos parsear. Si falla, el catch lo captura
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al leer usuario del storage:", error);
        // Si el JSON está roto, forzamos logout para limpiar
        handleLogout();
      }
    } else {
      // Si falta token o usuario, o dice "undefined", mandamos al login
      navigate("/econix/login");
    }
    setLoadingApp(false);
  }, [navigate]);

  // 2. Fetch User Data
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    if (!token) return;
    setLoadingCourses(true);
    try {
      // Asegúrate que apiCall esté disponible en el scope o importado
      const data = await apiCall("/api/me", "GET", null, token);
      setCourses(data.courses);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      if ((err as Error).message === "Unauthorized") handleLogout();
    } finally {
      setLoadingCourses(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEnterCourse = (course: Course) => {
    const { isExpired } = getCourseStatus(course.endDate);
    if (isExpired) {
      showNotification("⛔ Acceso denegado: El curso ha vencido.");
      return;
    }
    setActiveCourse(course);
    setView("course");
  };

  const handleLogout = () => {
    localStorage.removeItem("econixToken");
    localStorage.removeItem("econixUser");
    localStorage.removeItem("isEconixAuthenticated"); // Limpieza extra por si acaso
    setToken(null);
    setUser(null);
    setCourses([]);
    navigate("/econix/login");
  };

  const handleUpdateProfile = async (updatedUser: User) => {
    try {
      await apiCall(
        "/api/users/profile",
        "PUT",
        {
          name: updatedUser.name,
          bio: updatedUser.bio,
        },
        token!
      );

      setUser(updatedUser);
      localStorage.setItem("econixUser", JSON.stringify(updatedUser));
      showNotification("Perfil actualizado correctamente");
    } catch {
      showNotification("Error al actualizar perfil");
    }
  };

  if (loadingApp || !user)
    return <div className="p-10 text-center">Cargando Econix...</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900 font-sans flex flex-col relative">
      <GlobalStyles />

      {selectedCertificate && (
        <CertificatePreview
          course={selectedCertificate}
          studentName={user.name}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

      {notification && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-[#043c42] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-bounce-in z-50">
          <CheckCircle size={18} className="text-[#1a7984]" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
                >
                  <Menu size={24} />
                </button>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setView("dashboard");
                    setActiveCourse(null);
                  }}
                >
                  <div className="bg-[#006a78] p-2 rounded-lg">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <span className="font-bold text-xl text-[#043c42] hidden sm:block tracking-tight">
                    ECONIX
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => {
                    setView("dashboard");
                    setActiveCourse(null);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === "dashboard"
                      ? "text-[#006a78] bg-[#eefcfd]"
                      : "text-gray-500 hover:text-[#006a78]"
                  }`}
                >
                  Mis Cursos
                </button>
                <button
                  onClick={() => {
                    setView("certificates");
                    setActiveCourse(null);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    view === "certificates"
                      ? "text-[#006a78] bg-[#eefcfd]"
                      : "text-gray-500 hover:text-[#006a78]"
                  }`}
                >
                  <Award size={16} /> Certificados
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div
                className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => {
                  setView("profile");
                  setActiveCourse(null);
                }}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-[#043c42]">
                    {user.name.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500">Estudiante</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#1a7984] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
                  {user.avatar}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors tooltip-trigger"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {view === "dashboard" && (
          <main className="flex-1 overflow-y-auto bg-[#f7f7f7]">
            <Dashboard
              user={user}
              courses={courses}
              isLoading={loadingCourses}
              onEnterCourse={handleEnterCourse}
              onViewCertificate={setSelectedCertificate}
            />
          </main>
        )}

        {view === "course" && activeCourse && (
          <CoursePlayer
            course={activeCourse}
            onExit={() => {
              fetchUserData();
              setView("dashboard");
            }}
            showNotification={showNotification}
          />
        )}

        {view === "profile" && (
          <main className="flex-1 overflow-y-auto bg-[#f7f7f7]">
            <Profile user={user} onUpdate={handleUpdateProfile} />
          </main>
        )}

        {view === "certificates" && (
          <main className="flex-1 overflow-y-auto bg-[#f7f7f7] p-6 lg:p-10">
            <header className="max-w-7xl mx-auto mb-8 border-b border-gray-200 pb-8">
              <div className="flex items-center gap-3 text-[#006a78] mb-2">
                <Award size={32} />
                <h1 className="text-3xl font-bold text-[#043c42]">
                  Mis Certificados
                </h1>
              </div>
            </header>
            <div className="max-w-7xl mx-auto">
              <CoursesList
                courses={courses.filter((c) => c.isCompleted)}
                onEnterCourse={handleEnterCourse}
                onViewCertificate={setSelectedCertificate}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

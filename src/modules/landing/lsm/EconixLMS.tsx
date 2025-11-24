import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, BookOpen, Bell, LogOut, CheckCircle, Award } from "lucide-react";

import { GlobalStyles } from "./components/GlobalStyles";
import { initialUser, getCourseStatus, initialCoursesData } from "./data";
import { User, Course } from "./types";

// Componentes Internos
import { Dashboard } from "./dashboard/Dashboard";
import { CoursePlayer } from "./course/CoursePlayer";
import { Profile } from "./profile/Profile";
import { CertificatePreview } from "./certificates/CertificatePreview";
import { CoursesList } from "./dashboard/CoursesList";

export default function EconixLMS() {
  const navigate = useNavigate();

  // Estado interno del LMS
  const [user, setUser] = useState<User>(initialUser);
  const [view, setView] = useState<
    "dashboard" | "course" | "certificates" | "profile"
  >("dashboard");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Course | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Helper de notificaciones
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Lógica para entrar a un curso
  const handleEnterCourse = (course: Course) => {
    const { isExpired } = getCourseStatus(course.endDate);
    if (isExpired) {
      showNotification("⛔ Acceso denegado: El curso ha vencido.");
      return;
    }
    setActiveCourse(course);
    setView("course");
  };

  // Manejo del Logout
  const handleLogout = () => {
    localStorage.removeItem("isEconixAuthenticated");
    localStorage.removeItem("econixUserName");
    navigate("/econix/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900 font-sans flex flex-col relative">
      <GlobalStyles />

      {/* Modal de Certificados */}
      {selectedCertificate && (
        <CertificatePreview
          course={selectedCertificate}
          studentName={user.name}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

      {/* Toast de Notificación */}
      {notification && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-[#043c42] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-bounce-in z-50">
          <CheckCircle size={18} className="text-[#1a7984]" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Navbar del LMS */}
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

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex overflow-hidden">
        {view === "dashboard" && (
          <main className="flex-1 overflow-y-auto bg-[#f7f7f7]">
            <Dashboard
              user={user}
              onEnterCourse={handleEnterCourse}
              onViewCertificate={setSelectedCertificate}
            />
          </main>
        )}

        {view === "course" && activeCourse && (
          <CoursePlayer
            course={activeCourse}
            onExit={() => setView("dashboard")}
            showNotification={showNotification}
          />
        )}

        {view === "profile" && (
          <main className="flex-1 overflow-y-auto bg-[#f7f7f7]">
            <Profile
              user={user}
              onUpdate={(u) => {
                setUser(u);
                showNotification("Perfil actualizado");
              }}
            />
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
                courses={initialCoursesData.filter((c) => c.isCompleted)}
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

import React, { useState, ChangeEvent } from "react";
import {
  ChevronDown,
  Video,
  FileText,
  CheckCircle,
  FileCheck,
  Clock,
  Menu,
  Upload,
  Cpu,
} from "lucide-react";
import { Course, Lesson, Submission } from "../types";

interface CoursePlayerProps {
  course: Course;
  onExit: () => void;
  showNotification: (msg: string) => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course,
  onExit,
  showNotification,
}) => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    course.modules[0]?.lessons[0] || null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>(
    {}
  );

  const handleAssignmentSubmit = (lessonId: string, file: File) => {
    setSubmissions((prev) => ({
      ...prev,
      [lessonId]: {
        file: file.name,
        date: new Date().toLocaleString(),
        status: "submitted",
      },
    }));
    showNotification("¡Tarea enviada con éxito!");
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
      {/* Sidebar - LISTA DE MÓDULOS */}
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
          <div className="mt-3 p-2 bg-orange-50 border border-orange-100 rounded flex items-start gap-2">
            <Clock size={14} className="text-orange-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-orange-800">
                Cierre de Curso
              </p>
              <p className="text-[10px] text-orange-700">
                El acceso vence el{" "}
                {new Date(course.endDate).toLocaleDateString()}.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {course.modules.map((module) => (
            <div key={module.id} className="border-b border-gray-100">
              <div className="bg-[#fcfcfc] p-4 font-bold text-sm text-[#006a78] sticky top-0 border-l-4 border-transparent">
                {module.title}
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
                        ) : lesson.type === "assignment" ? (
                          <FileCheck size={18} />
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
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            {lesson.type === "assignment" ? (
                              <Clock size={10} />
                            ) : (
                              <Video size={10} />
                            )}
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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

            {/* RENDERIZADO SEGÚN TIPO */}
            {activeLesson.type === "video" && (
              <div className="aspect-video bg-[#043c42] rounded-xl overflow-hidden shadow-lg relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-[#006a78] transition-colors cursor-pointer">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            )}

            {activeLesson.type === "text" && (
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm prose max-w-none">
                <h3 className="text-[#006a78] font-bold text-xl mb-4">
                  Contenido de Lectura
                </h3>
                <p className="lead">
                  Documentación oficial y guías prácticas para el módulo actual.
                </p>
                <div className="bg-[#eefcfd] p-4 border-l-4 border-[#006a78] my-6 text-[#043c42]">
                  <strong>Nota:</strong> Este contenido es fundamental para el
                  examen final.
                </div>
              </div>
            )}

            {activeLesson.type === "assignment" && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 bg-[#eefcfd] border-b border-[#006a78]/20">
                  <h3 className="text-xl font-bold text-[#043c42] mb-2">
                    Entrega de Actividad
                  </h3>
                  <p className="text-[#006a78]">
                    Sube tus archivos antes de la fecha límite.
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  {submissions[activeLesson.id] ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center text-center">
                      <CheckCircle size={32} className="text-green-600 mb-2" />
                      <h3 className="font-bold text-green-800">
                        ¡Proyecto Entregado!
                      </h3>
                      <p className="text-green-600 text-sm">
                        Recibido el {submissions[activeLesson.id].date}
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center hover:bg-[#f7f7f7] transition-colors group cursor-pointer">
                      <Upload
                        size={32}
                        className="text-[#006a78] mb-4 group-hover:scale-110 transition-transform"
                      />
                      <h3 className="font-bold text-[#043c42] mb-1">
                        Cargar Archivos
                      </h3>
                      <label className="cursor-pointer relative mt-4">
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files[0])
                              handleAssignmentSubmit(
                                activeLesson.id,
                                e.target.files[0]
                              );
                          }}
                        />
                        <span className="px-6 py-3 bg-[#006a78] text-white rounded-lg font-medium hover:bg-[#043c42] transition-colors shadow-md">
                          Seleccionar Archivo
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
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

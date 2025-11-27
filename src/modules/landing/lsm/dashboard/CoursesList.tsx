import React from "react";
import {
  ShieldAlert,
  CheckCircle,
  Calendar,
  Lock,
  Award,
  BookOpen,
} from "lucide-react";
import { Course } from "../types";
import { getCourseStatus } from "../data";
import { ProgressBar } from "../components/ProgressBar";

interface CoursesListProps {
  courses: Course[];
  onEnterCourse: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  onEnterCourse,
  onViewCertificate,
}) => {
  if (courses.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-gray-400">
        <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
        <p>No hay cursos en esta sección.</p>
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
                    Vence:{" "}
                    {new Date(
                      course.endDate + "T00:00:00"
                    ).toLocaleDateString()}
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

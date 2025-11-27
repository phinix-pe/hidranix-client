import React, { useState } from "react";
import { BookOpen, Clock } from "lucide-react";
import { User, Course } from "../types";
import { getCourseStatus, initialCoursesData } from "../data";
import { CoursesList } from "./CoursesList";

interface DashboardProps {
  user: User;
  onEnterCourse: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onEnterCourse,
  onViewCertificate,
}) => {
  const [dashboardTab, setDashboardTab] = useState<"active" | "history">(
    "active"
  );

  const activeCourses = initialCoursesData.filter((c) => {
    const { isExpired } = getCourseStatus(c.endDate);
    return !isExpired && !c.isCompleted;
  });

  const historyCourses = initialCoursesData.filter((c) => {
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

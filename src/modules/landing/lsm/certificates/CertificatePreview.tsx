import React from "react";
import { Award, X, Download } from "lucide-react";
import { Course } from "../types";

interface CertificatePreviewProps {
  course: Course;
  studentName: string;
  onClose: () => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  course,
  studentName,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
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
        {/* Canvas del Certificado */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4 md:p-8 flex justify-center">
          <div className="certificate-pattern w-full max-w-3xl aspect-[1.414/1] relative shadow-lg border-[12px] border-[#043c42] p-8 md:p-12 flex flex-col items-center text-center justify-between text-[#043c42]">
            {/* Decoraciones */}
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
        {/* Footer Actions */}
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

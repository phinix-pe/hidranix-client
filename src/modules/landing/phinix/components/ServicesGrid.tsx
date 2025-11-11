import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CardItemContent } from "../../shared/interfaces";
import ServiceModal from "./ServiceModal";
import { IoIosArrowUp } from "react-icons/io";

interface ServicesGridProps {
  categories: {
    title: string;
    services: CardItemContent[];
  }[];
}

const ServicesGrid = ({ categories }: ServicesGridProps) => {
  const [selectedService, setSelectedService] = useState<CardItemContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleServiceClick = (service: CardItemContent) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div id="servicios" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-primary-light to-slate-900 bg-clip-text text-transparent">
            Nuestros Servicios
          </span>
        </h2>
        <p className="flex flex-row text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 px-4">
          Dirigido a Empresas, viviendas, locales, etc. Que requieren cumplir normas eléctricas o mejorar su seguridad
        </p>

        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-12 flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold text-primary-dark mb-10 px-2">
              {category.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
              {category.services.map((service, serviceIndex) => {
                const cardKey = `${catIndex}-${serviceIndex}`;
                return (
                  <motion.div
                    key={serviceIndex}
                    data-card-key={cardKey}
                    ref={(el) => {
                      cardRefs.current[cardKey] = el;
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: serviceIndex * 0.05,
                          ease: "easeOut",
                        },
                      },
                    }}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group w-48 sm:w-56 md:w-64 lg:w-72"
                    onClick={() => handleServiceClick(service)}
                  >
                    {service.imgSrc && (
                      <div className="relative overflow-hidden">
                        <img
                          src={service.imgSrc}
                          alt={service.shortTitle || service.title}
                          className="w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 group-hover:bg-black/50 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-primary-light text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <IoIosArrowUp className="text-xl transform rotate-90" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-4 sm:p-5 md:p-6">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-primary-dark line-clamp-2 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem]">
                        {service.shortTitle || service.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default ServicesGrid;

// src/modules/landing/components/Servicios.tsx
import { GiEnergyArrow, GiProcessor } from "react-icons/gi";
import { AnimationComponent } from "../../animation/AnimationComponent";
import { MdSettingsInputComposite } from "react-icons/md";

const Servicios = () => {
  const servicios = [
    {
      icon: <GiEnergyArrow className="w-12 h-12 mb-4 text-[#1a7984]" />,
      title: "Sistemas de Hidrógeno Verde",
      description:
        "Implementación de tecnología de electrólisis avanzada para producción eficiente de hidrógeno verde a escala industrial",
    },
    {
      icon: <GiProcessor className="w-12 h-12 mb-4 text-[#1a7984]" />,
      title: "Plataforma IoT Integrada",
      description:
        "Monitoreo inteligente y gestión remota de sistemas energéticos mediante dispositivos IoT conectados en tiempo real",
    },
    {
      icon: (
        <MdSettingsInputComposite className="w-12 h-12 mb-4 text-[#1a7984]" />
      ),
      title: "Soluciones Energéticas Personalizadas",
      description:
        "Diseño de sistemas modulares adaptados a necesidades específicas de consumo energético residencial e industrial",
    },
  ];

  return (
    <section
      id="servicios"
      className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimationComponent
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-[#003d3f] to-[#1a7984] bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
        </AnimationComponent>

        <AnimationComponent
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.3, duration: 1 } },
          }}
        >
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
            Soluciones integrales para la transición energética basadas en
            hidrógeno verde y sistemas inteligentes
          </p>
        </AnimationComponent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <AnimationComponent
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.5 + index * 0.1, duration: 0.8 },
                },
              }}
            >
              <div className="h-full">
                {" "}
                {/* Nuevo contenedor de altura completa */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100 hover:border-[#1a7984]/20 group h-full flex flex-col">
                  <div className="flex justify-center mb-4">
                    <div className="text-[#1a7984] group-hover:text-[#003d3f] transition-colors">
                      {servicio.icon}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#003d3f] text-center mb-4">
                    {servicio.title}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed flex-grow">
                    {servicio.description}
                  </p>
                </div>
              </div>
            </AnimationComponent>
          ))}
        </div>
        <AnimationComponent
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
          }}
          className="mt-16"
        >
          <div className="bg-[#003d3f] p-8 rounded-2xl text-center mx-auto max-w-4xl">
            <p className="text-white text-lg md:text-xl italic">
              "Reducción de hasta 70% en costos energéticos mediante nuestros
              sistemas inteligentes de gestión de hidrógeno"
            </p>
          </div>
        </AnimationComponent>
      </div>
    </section>
  );
};

export default Servicios;

import { AnimationComponent } from "../../animation/AnimationComponent";
import { FaRocket, FaRegLightbulb, FaLeaf } from "react-icons/fa";

const Nosotros = () => {
  return (
    <section
      id="nosotros"
      className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimationComponent
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary-light to-slate-900 bg-clip-text text-transparent">
                Nosotros
              </span>
            </h2>
          </div>
        </AnimationComponent>

        <AnimationComponent
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } },
          }}
        >
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 px-4">
            Revolucionando el sector energético mediante la transformación de
            agua en energía limpia y sostenible
          </p>
        </AnimationComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          {/* Misión */}
          <AnimationComponent
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.4 } },
            }}
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-50 mx-2">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <FaRocket className="w-8 h-8 mr-3 text-primary-light" />
                Misión
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Desarrollar tecnología pionera que transforme el agua en energía
                térmica y hidrógeno verde, proporcionando soluciones energéticas
                accesibles y sostenibles para combatir el cambio climático.
              </p>
            </div>
          </AnimationComponent>

          {/* Visión */}
          <AnimationComponent
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.6 } },
            }}
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-50 mx-2">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <FaRegLightbulb className="w-8 h-8 mr-3 text-primary-light" />
                Visión
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Liderar la transición energética global hacia fuentes 100%
                renovables para 2040, siendo referentes en innovación con
                tecnología IoT aplicada a la generación de hidrógeno verde a
                escala industrial.
              </p>
            </div>
          </AnimationComponent>
        </div>

        <AnimationComponent
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
          }}
          className="mt-16 px-4"
        >
          <div className="bg-primary-dark p-6 sm:p-8 rounded-2xl text-center max-w-4xl mx-auto flex items-center justify-center">
            <FaLeaf className="hidden md:block w-12 h-12 mr-4 text-primary-light" />
            <p className="text-white text-lg md:text-xl italic">
              "Alineados con el ODS 13: Implementando soluciones climáticas
              innovadoras que reducen en un 90% las emisiones de CO₂ en procesos
              de cocción industrial"
            </p>
          </div>
        </AnimationComponent>
      </div>
    </section>
  );
};

export default Nosotros;

import { AnimationComponent } from "../../animation/AnimationComponent";
import logoEconix from "../../../../assets/Logo_Econix_white.png";

export const InicioEconix = () => {
  return (
    <div
      id="inicio"
      className="relative bg-hero-pattern-with-opacity-econix w-full overflow-hidden flex items-center justify-center-safe h-[80vh] bg-cover bg-center flex-wrap"
    >
      <div
        className="absolute inset-0 w-full h-full bg-black/60 z-0"
        aria-hidden="true"
      ></div>

      <AnimationComponent
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-2xl px-4"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 0.8 },
          },
        }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-lg">
          Formamos a los líderes de la energía del futuro
        </h1>

        <p className="text-xl md:text-2xl font-semibold">
          <span className="text-white drop-shadow-lg">
            Educación, consultoría y oportunidades de nuevas innovaciones
            exitosas
          </span>
        </p>
      </AnimationComponent>

      <AnimationComponent
        viewport={{ once: true }}
        className="relative z-10 md:ml-20"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 1 },
          },
        }}
      >
        <img
          src={logoEconix}
          alt="Econix Logo"
          className="w-64 md:w-80 transition-transform transform hover:scale-105"
        />
      </AnimationComponent>
    </div>
  );
};

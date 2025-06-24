import { AnimationComponent } from "../../animation/AnimationComponent";

export const InicioPhinix = () => {
  return (
    <div className="bg-hero-pattern-with-opacity-phinix w-full overflow-hidden flex items-center justify-center min-h-screen bg-cover bg-center">
      <AnimationComponent
        className="text-center max-w-2xl px-4 -mt-40"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 0.8 },
          },
        }}
      >
        {/* <div className="text-center max-w-2xl px-4 -mt-40"> */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
          <span className="text-gradient bg-gradient-to-r from-primary-light to-primary-dark drop-shadow-lg">
            Impulsamos la transición energética en Perú
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-semibold">
          <span className="text-white drop-shadow-lg">
            Especialistas en hidrógeno verde, electromovilidad y automatización
            inteligente
          </span>
        </p>
        {/* </div> */}
      </AnimationComponent>
    </div>
  );
};

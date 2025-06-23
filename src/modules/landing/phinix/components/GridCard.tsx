import { AnimationComponent } from "../../animation/AnimationComponent";
import { CardItemContent } from "../../shared/interfaces";
import { GridCardItem } from "./GridCardItem";

interface Props {
  title: string;
  subTitle: string;
  cards: CardItemContent[];
}

export const GridCard = ({ title, subTitle, cards }: Props) => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
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
                {title}
              </span>
            </h2>
          </div>
        </AnimationComponent>

        <AnimationComponent
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
          }}
        >
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 px-4">
            {subTitle}
          </p>
        </AnimationComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          {cards.map((item, index) => (
            <GridCardItem
              key={index}
              item={item}
              animationDelay={0.5 + index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

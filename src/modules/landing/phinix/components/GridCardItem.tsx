import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { CardItemContent } from "../../shared/interfaces";

interface Props {
  item: CardItemContent;
  isClickable?: boolean;
  animationDelay: number;
  minWidth?: number;
  equalHeight?: boolean;
  disableHover?: boolean;
}

const modalVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", duration: 0.2, damping: 12 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

export const GridCardItem = ({
  item,
  animationDelay,
  isClickable = true,
  minWidth,
  equalHeight = false,
  disableHover = false,
}: Props) => {
  const { date, description, imgSrc, title, chipContent, descriptionCol1, descriptionCol2, twoColumns } = item;
  const [isOpen, setIsOpen] = useState(false);

  const safeDescription = description ?? "";
  const descriptionToShow = isClickable
    ? safeDescription.slice(0, 100)
    : safeDescription;

  const handleOpenModal = () => {
    if (isClickable) setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        id={item.id}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              delay: animationDelay,
              stiffness: 35,
              damping: 10,
              duration: 0.2,
            },
          },
        }}
        className={`bg-white rounded-lg overflow-hidden transition-shadow duration-300 ${
          !disableHover ? "hover:shadow-xl" : "shadow-md"
        } ${isClickable && !disableHover ? "cursor-pointer" : ""}`}
        style={{ minWidth: minWidth }}
        onClick={handleOpenModal}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: false }}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-auto object-cover aspect-video"
          />
        )}
        <div className={`p-6 flex-grow ${equalHeight ? "flex flex-col" : ""}`}>
          {chipContent && (
            <span className="inline-block bg-primary-light text-white text-xs font-semibold rounded-full px-3 py-1 mb-2">
              {chipContent}
            </span>
          )}
          <h3 className="text-xl font-semibold text-phinix-teal mb-2">{title}</h3>

          <div className={`text-gray-700 ${twoColumns ? "grid grid-cols-2 gap-6" : ""}`}>
            {twoColumns && descriptionCol1 && descriptionCol2 ? (
              <>
                <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: descriptionCol1 }} />
                <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: descriptionCol2 }} />
              </>
            ) : description?.includes('<') ? (
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="whitespace-pre-line">
                {descriptionToShow}
                {safeDescription.length > 100 && isClickable && (
                  <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent"></span>
                )}
              </p>
            )}
          </div>

          {isClickable && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-primary-light text-white cursor-pointer rounded-full p-2 focus:outline-none focus:ring focus:ring-primary-dark"
                onClick={handleOpenModal}
              >
                <IoIosArrowUp className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal/Ventana */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/75 z-[60] flex items-center justify-center p-4"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-[65]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 cursor-pointer text-primary-dark hover:text-primary-light focus:outline-none z-[70]"
              onClick={handleCloseModal}
            >
              <IoClose className="h-6 w-6 fill-current" />
            </button>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {imgSrc && (
                <div className="md:order-1">
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              )}
              <div className="md:order-2 flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {title}
                </h3>
                {date && <p className="text-gray-600 text-sm mb-2">{date}</p>}
                {chipContent && (
                  <span className="inline-block bg-primary-light text-white text-xs font-semibold rounded-full px-3 py-1 mb-4 w-fit">
                    {chipContent}
                  </span>
                )}
                
                {/* CONTENIDO DEL MODAL - MANEJA DOS COLUMNAS */}
                <div className={`mt-4 flex-grow ${twoColumns ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}`}>
                  {twoColumns && descriptionCol1 && descriptionCol2 ? (
                    <>
                      <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: descriptionCol1 }} />
                      <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: descriptionCol2 }} />
                    </>
                  ) : description?.includes('<') ? (
                    <div
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-line">{description}</p>
                  )}
                </div>
                
                {item.linkedin_url && (
                  <div className="mt-6 text-center">
                    <a
                      href={item.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Ver en LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
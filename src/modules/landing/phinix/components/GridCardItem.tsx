import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion"; // Usamos motion para la animación
import { CardItemContent } from "../../shared/interfaces";


interface Props {
  item: CardItemContent;
  isClickable?: boolean; // Prop opcional para controlar si es clickeable
  animationDelay: number;
  minWidth?: number; // ancho mínimo en px
  equalHeight?: boolean; // Prop opcional para igualar alturas
}


const modalVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", duration: 0.2, damping: 12 }, // Acelerar la animación del modal
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};






export const GridCardItem = ({
  item,
  animationDelay,
  isClickable = true,
  minWidth , // Ancho mínimo por defecto
  equalHeight = false, // Igualar alturas por defecto
}: Props) => {
  const { date, description, imgSrc, title, chipContent } = item;


  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
 
  const safeDescription = description ?? "";


  const descriptionToShow = isClickable
    ? safeDescription.slice(0, 100)
    : safeDescription;


  const handleOpenModal = () => {
    setIsOpen(isClickable);
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
              delay: animationDelay, // Reducir el delay para acelerar la aparición
              stiffness: 25, // Acelerar la animación
              damping: 8, // Reducir el damping para una animación más rápida
              duration: 0.3, // Acelerar la animación de la tarjeta
            },
          },
        }}
        className={` bg-white rounded-lg shadow-md overflow-hidden ${
          isHovered ? "scale-105 transition-transform duration-300 " : ""
        } ${isClickable ? "cursor-pointer" : ""}`}
        style={{ minWidth: minWidth}} //
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenModal} // Abrir al hacer click en la tarjeta también
        whileInView="visible" // Esto hace que la animación comience tan pronto como entre en la vista
        initial="hidden" // Estado inicial de la animación
        viewport={{ once: false }} // Esto asegura que la animación se repita cada vez que entra en la vista
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


          {/*INICIO Cammbios dos columnas */}
           {/* CONTENIDO DE DESCRIPCIÓN (CON TODAS LAS FUNCIONALIDADES) */}
          <div className={`text-gray-700 ${item.twoColumns ? "grid grid-cols-2 gap-6" : ""}`}>
            {item.twoColumns && item.descriptionCol1 && item.descriptionCol2 ? (
              <>
                <div className="whitespace-pre-line">{item.descriptionCol1}</div>
                <div className="whitespace-pre-line">{item.descriptionCol2}</div>
              </>
            ) : item.description?.includes('<') ? (
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: item.description }}
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
          {/* FIN Cammbios dos columnas */}


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
          className="fixed top-0 left-0 w-full h-full bg-black/75 z-50 flex items-center justify-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 relative">
            <button
              className="absolute top-4 right-4 cursor-pointer text-primary-dark hover:text-primary-light focus:outline-none"
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
              <div className="md:order-2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {title}
                </h3>
                {date && <p className="text-gray-600 text-sm mb-2">{date}</p>}
                {chipContent && (
                  <span className="inline-block bg-primary-light text-white text-xs font-semibold rounded-full px-3 py-1 mb-4">
                    {chipContent}
                  </span>
                )}
                <p className="text-gray-700">{description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};




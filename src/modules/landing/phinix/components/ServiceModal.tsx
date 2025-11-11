import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { CardItemContent } from "../../shared/interfaces";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: CardItemContent | null;
}

const modalVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", duration: 0.3, damping: 15 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  if (!isOpen || !service) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalVariants}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header fijo con botón de cerrar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-start z-10 rounded-t-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-dark pr-8">
            {service.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
            aria-label="Cerrar modal"
          >
            <IoClose className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-4 sm:p-6">
          {service.imgSrc && (
            <img
              src={service.imgSrc}
              alt={service.title}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6"
            />
          )}

          {service.twoColumns && service.descriptionCol1 && service.descriptionCol2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div
                className="text-gray-700 whitespace-pre-line text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: service.descriptionCol1 }}
              />
              <div
                className="text-gray-700 whitespace-pre-line text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: service.descriptionCol2 }}
              />
            </div>
          ) : service.description ? (
            <div
              className="text-gray-700 whitespace-pre-line text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceModal;

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useModal } from "../contexts/ModalContext";

const Modal = () => {
  const { isModalOpen, modalContent, modalTitle, closeModal } = useModal();

  const modalOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed flex justify-center items-center size-full top-0 left-0 z-30 bg-black/30"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative md:w-1/2 w-3/4 max-w-[350px] max-h-fit inset-0 bg-white rounded-md flex flex-col gap-2"
            onClick={modalOnClick}
          >
            <div className="flex justify-between p-4">
              <header>
                <h3 className="text-xl font-bold">{modalTitle}</h3>
              </header>
              <button onClick={closeModal}>
                <IoMdClose size={28} />
              </button>
            </div>

            <div className="h-full flex justify-center items-center">
              {modalContent}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  const modalOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
          onClick={onClose}
        >
          <div
            className={twMerge(
              "relative md:w-1/2 w-3/4 max-w-[350px] max-h-[80%] inset-0 bg-white rounded-md flex flex-col gap-2",
              className
            )}
            onClick={modalOnClick}
          >
            <div className="flex justify-between p-4">
              <header>
                <h3 className="text-xl font-bold">{title}</h3>
              </header>
              <button onClick={onClose}>
                <IoMdClose size={28} />
              </button>
            </div>

            <div className="h-full flex justify-center items-center">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

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
          className="fixed flex justify-center items-center size-full top-0 left-0 z-30 bg-black/30 dark:bg-black/50"
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
              "relative w-auto min-w-[300px] md:min-w-[350px] max-w-screen-3xl mx-auto max-h-[90%] inset-0 bg-white dark:bg-zinc-800 dark:border dark:border-zinc-700 rounded-md flex flex-col gap-2",
              className
            )}
            onClick={modalOnClick}
          >
            <div className="flex justify-between p-4 pb-1">
              <header>
                <h3 className="text-xl font-bold dark:text-zinc-100">
                  {title}
                </h3>
              </header>
              <button onClick={onClose}>
                <IoMdClose size={28} className="dark:text-zinc-100" />
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

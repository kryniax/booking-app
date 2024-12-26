import React, { useContext, useState } from "react";
import Modal from "../components/Modal";

type ModalContext = {
  isModalOpen: boolean;
  modalContent: React.ReactNode | undefined;
  modalTitle: string;
  openModal: (content: React.ReactNode, title: string) => void;
  closeModal: () => void;
};

const ModalContext = React.createContext<ModalContext | undefined>(undefined);

export const ModalContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState<string>("");

  const openModal = (content: React.ReactNode, title: string) => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
    setModalTitle("");
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, modalTitle, openModal, closeModal }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context as ModalContext;
};

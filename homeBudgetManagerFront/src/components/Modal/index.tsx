import React from "react";
import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Overlay, ModalContainer } from "./style";

/**
 * Componente de modal reutilizável.
 * Renderiza conteúdo em um portal e fecha ao clicar no overlay.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Renderiza o modal fora da árvore principal usando portal
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default Modal;

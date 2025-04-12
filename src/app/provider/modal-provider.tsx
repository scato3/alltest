'use client';

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import Modal from '../components/Modal';

interface ModalState {
  content: React.ReactNode;
  callback?: () => void;
}

interface ModalContextType {
  showModal: (content: React.ReactNode, callback?: () => void) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalState | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
    containerRef.current = modalRoot;

    return () => {
      if (modalRoot.parentElement) {
        modalRoot.parentElement.removeChild(modalRoot);
      }
    };
  }, []);

  const showModal = useCallback(
    (content: React.ReactNode, callback?: () => void) => {
      setModal({ content, callback });
    },
    [],
  );

  const hideModal = useCallback(() => { 
    setModal(null);
  }, []);

  const handleClose = useCallback(() => {
    const callback = modal?.callback;
    hideModal();
    callback && callback();
  }, [hideModal, modal?.callback]);

  const renderModal = () => {
    if (!modal?.content || !containerRef.current) return null;

    return createPortal(
      <Modal onClose={handleClose}>{modal.content}</Modal>,
      containerRef.current,
    );
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
}

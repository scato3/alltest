'use client';

import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  openModal: (component: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const PORTAL_ID = 'portal-root';

interface ModalState {
  isOpen: boolean;
  component: ReactNode | null;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    component: null,
  });

  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(PORTAL_ID);
    if (!element) {
      element = document.createElement('div');
      element.id = PORTAL_ID;
      document.body.appendChild(element);
    }
    setPortalElement(element);

    return () => {
      if (element) {
        document.body.removeChild(element);
      }
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openModal: (component) => setModalState({ isOpen: true, component }),
        closeModal: () => setModalState({ isOpen: false, component: null }),
      }}
    >
      {children}
      {modalState.isOpen &&
        portalElement &&
        createPortal(
          <div
            className={'modal'}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setModalState({ isOpen: false, component: null });
              }
            }}
          >
            {modalState.component}
          </div>,
          portalElement,
        )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

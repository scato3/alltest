import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

// 1. PortalContext 생성
interface PortalContextType {
  portalContainerRef: HTMLDivElement | null;
}

const PortalContext = createContext<PortalContextType | null>(null);

// 2. PortalProvider (컨텍스트 프로바이더)
interface PortalProviderProps {
  children: React.ReactNode;
}

export function PortalProvider({ children }: PortalProviderProps) {
  const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={{ portalContainerRef }}>
      {children}
      <div
        id="portal-container"
        ref={(elem) => {
          if (portalContainerRef !== null || elem === null) return;
          setPortalContainerRef(elem);  
        }}
      />
    </PortalContext.Provider>
  );
}

// 3. PortalConsumer (컨텍스트 소비자)
interface PortalConsumerProps {
  children: React.ReactNode;
}

export function PortalConsumer({ children }: PortalConsumerProps) {
  const context = useContext(PortalContext);

  if (!context?.portalContainerRef) {
    return null;
  }

  return createPortal(children, context.portalContainerRef);
}
'use client';

import QueryProvider from './query-provider';
import { ModalProvider } from './modal-provider';
import { OverlayProvider } from 'overlay-kit';

interface ProvidersProps {
  children: JSX.Element;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <OverlayProvider>
      <ModalProvider>
        <QueryProvider>{children}</QueryProvider>
      </ModalProvider>
    </OverlayProvider>
  );
}

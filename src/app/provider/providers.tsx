'use client';

import QueryProvider from './query-provider';
import { ModalProvider } from './modal-provider';

interface ProvidersProps {
  children: JSX.Element;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ModalProvider>
      <QueryProvider>{children}</QueryProvider>
    </ModalProvider>
  );
}

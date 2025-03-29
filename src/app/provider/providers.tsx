"use client";

import QueryProvider from "./query-provider";
import { PortalProvider } from "./globalportal-provider";

interface ProvidersProps {
  children: JSX.Element;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <PortalProvider>
      <QueryProvider>{children}</QueryProvider>
    </PortalProvider>
  );
}

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { ErrorHandler } from '@/utils/errorHandler';

type Props = {
  children: JSX.Element;
};

export default function QueryProvider({ children }: Props) {
  const errorHandler = ErrorHandler();

  const [client] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          refetchOnMount: false,
          retry: false,
        },
        mutations: {
          retry: false,
          onError: errorHandler,
        },
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

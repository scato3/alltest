"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 탭 전환 시 재요청 비활성화
          refetchOnReconnect: false, // 인터넷 연결 시 재요청 비활성화
          refetchOnMount: false, // 컴포넌트가 마운트될 때 재요청 비활성화
          retry: false, // 실패 시 재시도 비활성화
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
}

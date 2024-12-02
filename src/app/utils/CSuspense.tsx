"use client";

import React, { useRef } from "react";

type CSuspenseProps = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

function isPromise(value: any): value is Promise<any> {
  return !!value && typeof value.then === "function";
}

const CSuspense: React.FC<CSuspenseProps> = ({ fallback, children }) => {
  const promiseRef = useRef<Promise<any> | null>(null);

  try {
    // children에서 Promise를 던지는 경우 감지
    if (promiseRef.current) {
      throw promiseRef.current;
    }
    return <>{children}</>;
  } catch (error) {
    if (isPromise(error)) {
      promiseRef.current = error;
      return <>{fallback}</>;
    }
    throw error; // 예상치 못한 에러는 다시 던짐
  }
};

export default CSuspense;

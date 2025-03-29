"use client";

import { use, Suspense, useMemo } from "react";
import styles from "./loader.module.css";

// 지정된 시간 후에 resolve되는 Promise를 반환하는 함수
function fetchWithDelay(delay: number, message: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

// Suspense 호환 컴포넌트
function DataWithSuspense({ promise }: { promise: Promise<string> }) {
  const data = use(promise);
  return <p>{data}</p>;
}

// 작은 로더 컴포넌트
function MiniLoader() {
  return (
    <div className={styles.miniLoaderContainer}>
      <div className={styles.miniSpinner}></div>
    </div>
  );
}

export default function AsyncComponent() {
  const promise2Sec = useMemo(
    () => fetchWithDelay(2000, "2초 후 완료된 요청"),
    []
  );
  const promise3Sec = useMemo(
    () => fetchWithDelay(3000, "3초 후 완료된 요청"),
    []
  );
  const promise4Sec = useMemo(
    () => fetchWithDelay(4000, "4초 후 완료된 요청"),
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>비동기 요청 결과</h2>

      <Suspense fallback={<MiniLoader />}>
        <DataWithSuspense promise={promise2Sec} />
      </Suspense>

      <Suspense fallback={<MiniLoader />}>
        <DataWithSuspense promise={promise3Sec} />
      </Suspense>

      <Suspense fallback={<MiniLoader />}>
        <DataWithSuspense promise={promise4Sec} />
      </Suspense>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useThrottle } from "@/hooks/useThrottle";

export default function ThrottlePage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [count, setCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const throttledScroll = useThrottle(500);

  // 실제 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setCount((prev) => prev + 1);

      throttledScroll(() => {
        const position = window.scrollY;
        console.log(
          `[${new Date().toLocaleTimeString()}] 스크롤 위치:`,
          position
        );
        setScrollPosition(position);
        setProcessedCount((prev) => prev + 1);
      });
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttledScroll]);

  return (
    <main>
      <h1>스로틀링 예제</h1>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          background: "white",
          padding: "10px",
        }}
      >
        <p>스크롤 위치: {scrollPosition}px</p>
        <p>이벤트 발생: {count}회</p>
        <p>실제 처리: {processedCount}회</p>
        <p>스로틀링 시간: 3000ms (3초)</p>
      </div>

      <div style={{ height: "2000px" }}>
        <p>아래로 스크롤하세요</p>
      </div>
    </main>
  );
}

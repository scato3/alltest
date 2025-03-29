"use client";

import React, { useState, useRef, useEffect } from "react";

type ChatMessageProps = {
  message: string;
  onAction: () => void; // 메시지를 꾹 누르거나 더블클릭했을 때 실행될 동작
};

export default function ChatMessage({ message, onAction }: ChatMessageProps) {
  const [isLongPress, setIsLongPress] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 디바이스 환경 추적
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 모바일 환경인지 체크
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/mobile|android|iphone|ipad|ipod/.test(userAgent));
  }, []);

  // 모바일: 꾹 누르기 처리
  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      setIsLongPress(true); // 꾹 누른 상태를 true로 설정
      onAction();
    }, 500); // 500ms 이상 눌렀을 때 동작
  };

  const handleTouchEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsLongPress(false); // 터치가 끝나면 상태 초기화
  };

  // 웹: 더블클릭 처리
  const handleDoubleClick = () => {
    if (!isMobile) {
      // 모바일 환경에서는 더블클릭 무시
      onAction();
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick} // 웹: 더블클릭 이벤트
      onTouchStart={isMobile ? handleTouchStart : undefined} // 모바일: 터치 시작
      onTouchEnd={isMobile ? handleTouchEnd : undefined} // 모바일: 터치 종료
      style={{
        padding: "10px",
        margin: "5px 0",
        border: isLongPress ? "2px solid blue" : "1px solid #ccc", // 꾹 누른 상태에 따라 UI 변경
        borderRadius: "8px",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: isLongPress ? "#f0f8ff" : "white", // 꾹 누른 상태 강조
      }}
    >
      {message}
    </div>
  );
}

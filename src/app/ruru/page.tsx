"use client";

import { useState } from "react";
// flushSync 직접 임포트 방식 변경
import { flushSync } from "react-dom";

export default function Ruru() {
  const [a, setA] = useState(0);

  const onClick = () => {
    console.log("시작:", a); // 0

    flushSync(() => {
      setA(1);
    });
    console.log("업데이트 후:", a); // 여전히 0 (클로저 때문)
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">현재 값: {a}</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onClick}
      >
        Click me
      </button>
    </div>
  );
}

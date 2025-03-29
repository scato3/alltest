"use client";

import { useState } from 'react';

export default function ArgumentsPage() {
  const [logs, setLogs] = useState<string[]>([]);

  // 일반 함수 - arguments 사용
  function regularWithArguments() {
    const result = `일반 함수 (arguments): ${Array.from(arguments).join(', ')}`;
    setLogs(prev => [...prev, result]);
  }

  // 일반 함수 - rest parameter 사용
  function regularWithRest(...args: any[]) {
    const result = `일반 함수 (rest): ${args.join(', ')}`;
    setLogs(prev => [...prev, result]);
  }

  // 화살표 함수 - rest parameter 사용
  const arrowWithRest = (...args: any[]) => {
    const result = `화살표 함수 (rest): ${args.join(', ')}`;
    setLogs(prev => [...prev, result]);
  }

  // 로그 초기화
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Arguments vs Rest Parameters 예제</h1>

      <div className="space-y-4 mb-8">
        <div>
          <button
            onClick={() => regularWithArguments(1, 2, 3)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            일반 함수 (arguments)
          </button>

          <button
            onClick={() => regularWithRest(1, 2, 3)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
          >
            일반 함수 (rest)
          </button>

          <button
            onClick={() => arrowWithRest(1, 2, 3)}
            className="bg-purple-500 text-white px-4 py-2 rounded mr-4"
          >
            화살표 함수 (rest)
          </button>

          <button
            onClick={clearLogs}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            로그 지우기
          </button>
        </div>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">실행 로그:</h2>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="p-2 bg-white rounded shadow">
              {log}
            </div>
          ))}
        </div>
        {logs.length === 0 && (
          <p className="text-gray-500">아직 로그가 없습니다. 버튼을 눌러보세요.</p>
        )}
      </div>    </main>
  );
} 
'use client';

import { useCounterStore, getHistory } from '@/store/counterStore';
import Link from 'next/link';

export default function CounterDisplayPage() {
  const { increase, decrease, setA, a, count } = useCounterStore();
  const history = getHistory();

  console.log(history);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">카운터 상태 표시</h1>

      <div className="p-4 border rounded shadow mb-4">
        <button onClick={increase}>증가</button>
        <button onClick={decrease}>감소</button>
        <input type="text" value={a} onChange={(e) => setA(e.target.value)} />
        <p>{count}</p>
      </div>

      <p className="text-gray-600 mb-4">
        이 페이지는 전역 상태만 표시하고 있습니다. 값을 변경하려면 카운터
        페이지로 이동하세요.
      </p>

      <Link
        href="/counter"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        카운터 페이지로 이동
      </Link>
    </div>
  );
}

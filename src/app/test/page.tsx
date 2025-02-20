'use client';

import { useEffect, useState } from 'react';
import useCustomMemo from '../utils/CMemo';
import useCustomRef from '../utils/CRef';
import { startRender } from '../utils/CRef';

export default function Page() {
  startRender(); // 컴포넌트 시작시 호출

  const [count, setCount] = useState(0);

  const myArray = useCustomMemo(() => ['one', 'two', 'three'], []);

  const a = useCustomRef(5);
  const b = useCustomRef(4);
  const c = useCustomRef(5);

  console.log(a === c);
  console.log(b.current);

  useEffect(() => {
    setCount((prev) => prev + 1);
    console.log('useEffect 실행됨! 🚀');
  }, [myArray]);

  return (
    <div>
      <div>배열 테스트</div>
      <div>카운트: {count}</div>
    </div>
  );
}

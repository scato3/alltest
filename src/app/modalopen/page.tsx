'use client';

import { useModal } from '../provider/modal-provider';
import { useState } from 'react';
import Ex from './components/ex';

export default function ModalOpen() {
  const { showModal } = useModal();
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => showModal(<Ex count={count} setCount={setCount} />)}
      >
        모달 열기
      </button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

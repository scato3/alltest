import { Dispatch, SetStateAction } from 'react';

export default function Ex({
  count,
  setCount,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div>
      <p>부모 상태: {count}</p>
      <button onClick={() => setCount(count + 1)}>부모 상태 증가</button>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Test2() {
  const router = useRouter();

  const isServerSide = typeof window === 'undefined';
  const randomValue = Math.random();
  console.log('Test2', isServerSide, randomValue);

  return (
    <div>
      Test2 {randomValue}
      <div>
        <Link href="/huhu">Goto Test1 via Link</Link>
        <button
          onClick={() => {
            router.push('/huhu');
          }}
        >
          Goto Test1 via Button
        </button>
      </div>
    </div>
  );
}

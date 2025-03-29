'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Test1() {
  const router = useRouter();

  const isServerSide = typeof window === 'undefined';
  const randomValue = Math.random();
  console.log('Test1', isServerSide, randomValue);

  return (
    <div>
      Test1 {randomValue}
      <div>
        <Link href="/kakaka">Goto Test2 via Link</Link>
        <button
          onClick={() => {
            router.push('/kakaka');
          }}
        >
          Goto Test2 via Button
        </button>
      </div>
    </div>
  );
}

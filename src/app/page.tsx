'use client';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
export default function Home() {
  // 상태 타입을 명시적으로 지정 (string | null)
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/token')
      .then((res) => res.json())
      .then(() => {
        // 쿠키에서 토큰 읽기
        const tokenFromCookie = getCookie('auth-token') as string | undefined;
        // undefined일 경우 null로 처리
        if (tokenFromCookie) {
          setToken(tokenFromCookie);
        } else {
          setToken(null);
        }
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {token ? <p>Token: {token}</p> : <p>Loading token...</p>}
    </div>
  );
}

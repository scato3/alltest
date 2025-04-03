'use client';

import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function DebouncePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const debouncedSearch = useDebounce(500);

  return (
    <main>
      <h1>디바운스 검색 예제</h1>
      
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          console.log(`[${new Date().toLocaleTimeString()}] 입력:`, value);
          setSearchTerm(value);
          debouncedSearch((value: string) => {
            console.log(`[${new Date().toLocaleTimeString()}] 검색 실행:`, value);
            setResults([`검색결과: ${value}`, `추천: ${value}`]);
          })(value);
        }}
      />

      <div className="mt-4">
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </main>
  );
} 
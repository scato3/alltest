'use client';

import { useTest } from '../api/test';

export default function TestPage() {
  const { data, isLoading, error } = useTest();

  if (isLoading) return <div>Loading...</div>;
  if (error) throw error;

  return (
    <div>
      <h1>Test Page</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

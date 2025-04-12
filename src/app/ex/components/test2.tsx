'use client';

import { useState, useEffect } from 'react';

export default function Test2() {
  const [data, setData] = useState<number>(0);

  console.log('state', data);

  useEffect(() => {
    setData(1);
    console.log('data', data);
    setData(2);
    console.log('data', data);
    setData(3);
    console.log('data', data);
  }, [data]);

  return <div>Test2</div>;
}

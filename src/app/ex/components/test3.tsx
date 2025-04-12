'use client';

import { useEffect, useState, useRef } from 'react';

export default function Test1() {
  const [data, setData] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('effect 실행:', data);

    intervalRef.current = setInterval(() => {
      setData((prev) => prev + 1);
      if (data > 5) {
        setTrigger(true);
      }
    }, 1000);

    return () => {
      console.log('cleanup 실행:', data);
      clearInterval(intervalRef.current!);
    };
  }, [data]);

  useEffect(() => {
    if (trigger) {
      console.log('trigger effect 실행:', data);
      setData(0);
      setTrigger(false);
    }
  }, [trigger]);

  return <div>Test3: {data}</div>;
}

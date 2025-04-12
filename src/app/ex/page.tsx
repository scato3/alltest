'use client';

import { useState, useRef, useEffect } from 'react';

export default function Ex() {
  const [data, setData] = useState(0);
  const aRef = useRef(data);
  let a = 1;

  useEffect(() => {
    if (data < 100) {
      console.log('let', a);
      console.log('useState', data);
      console.log('useRef', aRef.current);
      setData((prev) => prev + 1);
      aRef.current = data;
      a = data;

      return () => {
        console.log('cleanup', a);
        console.log('cleanup data', data);
        console.log('cleanup useRef', aRef.current);
      };
    }
  }, [data]);
}

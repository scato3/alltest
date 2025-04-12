'use client';

import { useEffect, useRef, useState } from 'react';

export default function Test1() {
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
        console.log(
          'cleanup a',
          a,
          'clean up data',
          data,
          'clean up aRef ',
          aRef.current,
        );
      };
    }
  }, [data]);

  return <div>Test1</div>;
}

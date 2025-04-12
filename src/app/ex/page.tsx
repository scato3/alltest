'use client';

<<<<<<< HEAD
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
=======
import Test1 from './components/test1';
import Test2 from './components/test2';
import Test3 from './components/test3';
import { useState } from 'react';
export default function Ex() {
  const [tab, setTab] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      {tab && <Test1 />}
      {!tab && <Test2 />}
      {show && <Test3 />}
      <button onClick={() => setTab(!tab)}>Click</button>
      <button onClick={() => setShow(!show)}>Show</button>
    </div>
  );
>>>>>>> 9d1f05c058a1d8b0884196aeaef75473c837a8bf
}

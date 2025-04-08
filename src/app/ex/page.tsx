'use client';

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
}

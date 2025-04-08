'use client';

import { useState } from 'react';
import useThrottle from '../utils/useThrottle';

export default function ThrottlePage() {
  const [value, setValue] = useState('');
  const throttle = useThrottle();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    throttle(() => {
      console.log(newValue);
    }, 500);
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useDebounce } from '../utils/Debounce';

export default function DebouncePage() {
  const [value, setValue] = useState('');
  const debounce = useDebounce();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounce(() => {
      console.log(newValue);
    }, 500);
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}

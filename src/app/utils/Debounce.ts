import { useRef, useCallback } from 'react';

export const useDebounce = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((fn: Function, delay: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fn();
      timerRef.current = null;
    }, delay);
  }, []);
};

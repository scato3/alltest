import { useRef, useCallback } from 'react';

export default function useThrottle() {
  const isThrottled = useRef<boolean>(false);

  return useCallback((fn: Function, delay: number) => {
    if (isThrottled.current) return;

    fn();
    isThrottled.current = true;

    setTimeout(() => {
      isThrottled.current = false;
    }, delay);
  }, []);
}

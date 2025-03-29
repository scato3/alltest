import { useRef } from "react";

export const useThrottle = (delay: number) => {
  const timer = useRef(false);

  const throttle = <T>(callback: (value: T) => void) => {
    return (value: T) => {
      if (!timer.current) {
        callback(value);
        timer.current = true;

        setTimeout(() => {
          timer.current = false;
        }, delay);
      }
    };
  };

  return throttle;
};

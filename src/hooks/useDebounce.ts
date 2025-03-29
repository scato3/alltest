import { useRef } from "react";

export const useDebounce = (delay: number) => {
  const timeRef = useRef<NodeJS.Timeout>();

  const debounce = <T>(callback: (value: T) => void) => {
    return (value: T) => {
      if(timeRef.current) {
        clearTimeout(timeRef.current)
      }

      timeRef.current = setTimeout(() => {
        callback(value);
      }, delay)
    }
  }

  return debounce;
}
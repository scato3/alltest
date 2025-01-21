import { useRef } from 'react';

export default function useCustomCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: unknown[],
): T {
  const cacheRef = useRef<{ callback: T; deps: unknown[] } | null>(null);

  if (!cacheRef.current || !areDepsEqual(cacheRef.current.deps, deps)) {
    cacheRef.current = {
      callback,
      deps,
    };
  }

  return cacheRef.current.callback;
}

function areDepsEqual(oldDeps: unknown[], newDeps: unknown[]): boolean {
  if (oldDeps.length !== newDeps.length) return false;
  return oldDeps.every((dep, index) => Object.is(dep, newDeps[index]));
}

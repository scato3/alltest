import useCustomRef from './CRef';

export default function useCustomMemo<T>(factory: () => T, deps: unknown[]): T {
  const cacheRef = useCustomRef<{ value: T; deps: unknown[] } | null>(null);

  if (!cacheRef.current || !areDepsEqual(cacheRef.current.deps, deps)) {
    cacheRef.current = {
      value: factory(),
      deps,
    };
  }

  return cacheRef.current.value;
}

function areDepsEqual(oldDeps: unknown[], newDeps: unknown[]): boolean {
  if (oldDeps.length !== newDeps.length) return false;
  return oldDeps.every((dep, index) => Object.is(dep, newDeps[index]));
}

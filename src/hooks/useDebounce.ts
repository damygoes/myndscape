import { useEffect, useRef } from 'react';

type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): DebouncedFunction<T> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback: DebouncedFunction<T> = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Optional cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedCallback;
}

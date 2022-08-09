/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [value, setValue] = useState(() => {
    const saved =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

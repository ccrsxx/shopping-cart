import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type WindowSize = [number, number];

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize]: [
    WindowSize,
    Dispatch<SetStateAction<WindowSize>>
  ] = useState(() =>
    typeof window !== 'undefined'
      ? [window.innerWidth, window.innerHeight]
      : [0, 0]
  );

  useEffect(() => {
    const handleResize = (): void =>
      setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    if (windowSize.every((v) => !v)) handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}

import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type WindowSize = [number, number];

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize]: [
    WindowSize,
    Dispatch<SetStateAction<WindowSize>>
  ] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = (): void =>
      setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

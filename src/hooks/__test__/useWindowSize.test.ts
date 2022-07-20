import { act, renderHook } from '@testing-library/react';
import { useWindowSize } from '..';

describe('useWindowSize', () => {
  function triggerResize(dimension: 'width' | 'height', value: number): void {
    window[dimension === 'width' ? 'innerWidth' : 'innerHeight'] = value;
    window.dispatchEvent(new Event('resize'));
  }

  it('should be defined', () => {
    expect(useWindowSize).toBeDefined();
  });

  it('should return current window dimensions', () => {
    const { result } = renderHook(useWindowSize);

    expect(typeof result.current).toBe('object');
    expect(typeof result.current[0]).toBe('number');
    expect(typeof result.current[1]).toBe('number');
  });

  it('should update width correctly when resize event is dispatched', () => {
    const { result } = renderHook(useWindowSize);

    act(() => {
      triggerResize('width', 360);
    });

    expect(result.current[0]).toBe(360);

    act(() => {
      triggerResize('width', 2048);
    });

    expect(result.current[0]).toBe(2048);
  });

  it('should update height correctly when resize event is dispatched', () => {
    const { result } = renderHook(useWindowSize);

    act(() => {
      triggerResize('height', 360);
    });

    expect(result.current[1]).toBe(360);

    act(() => {
      triggerResize('height', 2048);
    });

    expect(result.current[1]).toBe(2048);
  });
});

import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '@lib/hooks/useLocalStorage';

describe('test useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should be defined', () => {
    expect(useLocalStorage).toBeDefined();
  });

  it('retrieves an existing value from localStorage', () => {
    localStorage.setItem('isOpen', 'true');

    const { result } = renderHook(() => useLocalStorage('isOpen', false));
    const [state] = result.current;

    expect(state).toBe(true);
  });

  it('should return initialValue if localStorage empty and set that to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('isOpen', false));
    const [state] = result.current;

    expect(state).toBe(false);
    expect(localStorage.getItem('isOpen')).toBe('false');
  });

  it('prefers existing value over initial state', () => {
    localStorage.setItem('foo', '"bar"');

    const { result } = renderHook(() => useLocalStorage('foo', 'baz'));
    const [state] = result.current;

    expect(state).toEqual('bar');
  });

  it('does not clobber existing localStorage with initialState', () => {
    localStorage.setItem('foo', '"bar"');

    const { result } = renderHook(() => useLocalStorage('foo', 'buzz'));

    expect(result.current).toBeTruthy();
    expect(localStorage.getItem('foo')).toEqual('"bar"');
  });

  it('correctly updates localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'));

    const [, setFoo] = result.current;

    act(() => setFoo('baz'));

    expect(localStorage.getItem('foo')).toEqual('"baz"');
  });

  it('sets initialState if initialState is an object', () => {
    renderHook(() => useLocalStorage('foo', { bar: true }));
    expect(localStorage.getItem('foo')).toEqual('{"bar":true}');
  });

  it('correctly and promptly returns a new value', () => {
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'));

    const [, setFoo] = result.current;

    act(() => setFoo('baz'));

    expect(localStorage.getItem('foo')).toEqual('"baz"');
  });

  it('sets localStorage from the function updater', () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ foo: string; fizz?: string }>('foo', { foo: 'bar' })
    );

    const [, setFoo] = result.current;

    act(() => setFoo((state) => ({ ...state, fizz: 'buzz' })));

    const [value] = result.current;

    expect(value.foo).toEqual('bar');
    expect(value.fizz).toEqual('buzz');
  });
});

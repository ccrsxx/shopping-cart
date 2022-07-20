import { filterMatch } from '../filterMatch';

describe('test filterMatch', () => {
  it('it returns true when match is found', () => {
    const test = 'Vladilena Milizé';
    const match = 'lena';

    expect(filterMatch(test, match)).toBe(true);
  });

  it('it returns false when match is not found', () => {
    const test = 'Vladilena Milizé';
    const match = 'emilia';

    expect(filterMatch(test, match)).toBe(false);
  });

  it('it returns true when matches word between spaces', () => {
    const test = 'Vladilena Milizé';
    const match = 'lenami';

    expect(filterMatch(test, match)).toBe(true);
  });
});

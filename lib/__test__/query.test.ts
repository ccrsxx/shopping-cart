import { filterQuery } from '@lib/query';

describe('test filterQuery', () => {
  it('it returns true when match is found', () => {
    const test = 'Vladilena Milizé';
    const match = 'lena';

    expect(filterQuery(test, match)).toBe(true);
  });

  it('it returns false when match is not found', () => {
    const test = 'Vladilena Milizé';
    const match = 'emilia';

    expect(filterQuery(test, match)).toBe(false);
  });

  it('it returns true when matches word between spaces', () => {
    const test = 'Vladilena Milizé';
    const match = 'lenami';

    expect(filterQuery(test, match)).toBe(true);
  });
});

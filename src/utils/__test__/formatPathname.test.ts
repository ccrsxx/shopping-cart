import { formatPathname } from '..';

describe('test formatPathname', () => {
  it('returns correct pathname', () => {
    const test = '/home';

    expect(formatPathname(test)).toBe('Home');
  });

  it("returns correct pathname when there's more than one path", () => {
    const test = '/product/1';

    expect(formatPathname(test)).toBe('Product');
  });

  it('returns "Not Found" when pathname is not available in the list', () => {
    const test = ['/live-chat', '/support', '/checkout'];

    test.forEach((path) => expect(formatPathname(path)).toBe('Not Found'));
  });
});

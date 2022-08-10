import { formatCurrency } from '@lib/currency';

describe('test formatCurrency', () => {
  it('returns correct currency', () => {
    const test = 24.12;

    expect(formatCurrency(test)).toBe('US$24.12');
  });

  it('removes third and more decimal place', () => {
    const test = 24.1234;

    expect(formatCurrency(test)).toBe('US$24.12');
  });

  it("adds second decimal place when there's none", () => {
    const test = 24;

    expect(formatCurrency(test)).toBe('US$24.00');
  });

  it('rounds up the decimal place to nearest whole number', () => {
    const test = 24.499;

    expect(formatCurrency(test)).toBe('US$24.50');
  });
});

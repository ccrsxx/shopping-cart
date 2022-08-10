const FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency'
});

export function formatCurrency(number: number): string {
  return FORMATTER.format(number);
}

const FORMATTER = new Intl.NumberFormat('en-us', {
  currency: 'USD',
  style: 'currency'
});

export function formatCurrency(number: number): string {
  return FORMATTER.format(number);
}

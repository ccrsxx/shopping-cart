export function formatCurrency(number: number) {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD'
  });
}

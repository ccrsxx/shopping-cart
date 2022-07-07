export function formatCurrency(number: number) {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD'
  });
}

export function formatPathname(pathname: string) {
  const formattedPath = pathname.replace(/[^a-z]/gi, '');
  return formattedPath
    ? formattedPath[0].toUpperCase() + formattedPath.slice(1)
    : 'Home';
}

export function filterMatch(target: string, filter: string) {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.toLowerCase().replace(/\s/g, '')
  );
  return newTarget.includes(newFilter);
}

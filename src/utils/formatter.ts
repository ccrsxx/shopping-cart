import { allPages } from '../data';

export function formatCurrency(number: number): string {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD'
  });
}

export function formatPathname(pathname: string): string {
  const formattedPath = pathname.replace(/[^a-z]/gi, '');
  const currentPath = formattedPath
    ? formattedPath[0].toUpperCase() + formattedPath.slice(1)
    : 'Home';
  return allPages.some((path) => currentPath.toLowerCase().includes(path))
    ? currentPath
    : 'Not Found';
}

export function filterMatch(target: string, filter: string): boolean {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.toLowerCase().replace(/\s/g, '')
  );
  return newTarget.includes(newFilter);
}

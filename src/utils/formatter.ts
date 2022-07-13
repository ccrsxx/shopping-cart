import { allPages } from '../data';

export function formatCurrency(number: number) {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD'
  });
}

export function formatPathname(pathname: string) {
  const formattedPath = pathname.replace(/[^a-z]/gi, '');
  const currentPath = formattedPath
    ? formattedPath[0].toUpperCase() + formattedPath.slice(1)
    : 'Home';
  return allPages.some((path) => currentPath.toLocaleLowerCase().includes(path))
    ? currentPath
    : 'Not Found';
}

export function filterMatch(target: string, filter: string) {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.toLowerCase().replace(/\s/g, '')
  );
  return newTarget.includes(newFilter);
}

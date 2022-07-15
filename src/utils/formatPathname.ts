import { allPages } from '../data';

export function formatPathname(pathname: string): string {
  const formattedPath = pathname.replace(/[^a-z]/gi, '');
  const currentPath = formattedPath
    ? formattedPath[0].toUpperCase() + formattedPath.slice(1)
    : 'Home';
  return currentPath === 'Home' ||
    allPages.some((path) => currentPath.toLowerCase().includes(path))
    ? currentPath
    : 'Not Found';
}

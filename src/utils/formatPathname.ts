export function formatPathname(pathname: string) {
  const formattedPath = pathname.replace(/[^a-z]/gi, '');
  return formattedPath
    ? formattedPath[0].toUpperCase() + formattedPath.slice(1)
    : 'Home';
}

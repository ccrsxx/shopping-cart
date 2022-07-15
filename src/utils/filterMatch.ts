export function filterMatch(target: string, filter: string): boolean {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.toLowerCase().replace(/\s/g, '')
  );
  return newTarget.includes(newFilter);
}

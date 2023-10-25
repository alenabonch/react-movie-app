export function updateUrlSearchParams(key: string, value: string): URL {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  return url;
}

const basePath =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function currentRoute() {
  const { pathname } = window.location;
  if (!basePath || !pathname.startsWith(basePath)) return pathname;

  return pathname.slice(basePath.length) || '/';
}

export function appRoute(path: string) {
  const route = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${route}` || '/';
}

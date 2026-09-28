// Préfixe un chemin absolu du site ('/dojo', '/logo.png'…) par le `base` d'Astro,
// pour que les liens marchent aussi bien sous /kje (GitHub Pages) qu'à la racine du domaine.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path: string): string {
  if (path === '/') return `${base}/`;
  return `${base}${path}`;
}

// Inverse de `url` : chemin de la page sans le `base`, pour comparer aux liens du menu.
export function sansBase(pathname: string): string {
  const reste = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return reste === '' ? '/' : reste;
}

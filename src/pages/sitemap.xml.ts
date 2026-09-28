import type { APIRoute } from 'astro';
import { url } from '../lib/url';
import { getCollection } from 'astro:content';

const staticRoutes = [
  '/',
  '/dojo',
  '/planning',
  '/actualites',
  '/tarifs',
  '/contact',
  '/mentions-legales',
];

export const GET: APIRoute = async ({ site }) => {
  const actus = await getCollection('actualites');
  const routes: { path: string; lastmod?: Date }[] = [
    ...staticRoutes.map((path) => ({ path })),
    ...actus.map((actu) => ({ path: `/actualites/${actu.slug}`, lastmod: actu.data.date })),
  ];

  const urls = routes
    .map(({ path, lastmod }) => {
      const date = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${new URL(url(path), site)}</loc>${date}</url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

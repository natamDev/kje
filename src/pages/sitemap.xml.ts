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
  const actuRoutes = actus.map((actu) => `/actualites/${actu.slug}`);
  const routes = [...staticRoutes, ...actuRoutes];

  const urls = routes
    .map((route) => `  <url><loc>${new URL(url(route), site)}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

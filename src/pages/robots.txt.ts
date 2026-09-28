import type { APIRoute } from 'astro';
import { url } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(url('/sitemap.xml'), site);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

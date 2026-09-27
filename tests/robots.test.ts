import { describe, expect, it } from 'vitest';
import { readDistFile, readDistHtml } from './helpers/dist';

describe('robots.txt', () => {
  it('autorise l’indexation et référence le sitemap', () => {
    const content = readDistFile('robots.txt');
    expect(content).toContain('User-agent: *');
    expect(content).toContain('Allow: /');
    expect(content).toMatch(/Sitemap: https?:\/\/[^\s]+\/sitemap\.xml/);
  });
});

describe('adresse du site', () => {
  it('utilise l’adresse Netlify dans robots.txt et l’URL canonique', () => {
    expect(readDistFile('robots.txt')).toContain('Sitemap: https://tranquil-mooncake-d1bdc5.netlify.app/sitemap.xml');
    expect(readDistHtml('/tarifs')).toContain('<link rel="canonical" href="https://tranquil-mooncake-d1bdc5.netlify.app/tarifs"');
  });
});

import { describe, expect, it } from 'vitest';
import { readDistFile } from './helpers/dist';

describe('sitemap.xml', () => {
  it('liste toutes les pages statiques et les actualités', () => {
    const content = readDistFile('sitemap.xml');

    const pagesStatiques = [
      '/',
      '/dojo',
      '/planning',
      '/actualites',
      '/galerie',
      '/resultats',
      '/tarifs',
      '/contact',
    ];
    for (const page of pagesStatiques) {
      expect(content).toContain(`<loc>https://example.com${page}</loc>`);
    }

    expect(content).toContain('<loc>https://example.com/actualites/2026-02-20-stage-kyokushin</loc>');
    expect(content).toContain('<loc>https://example.com/actualites/2026-01-15-portes-ouvertes</loc>');
  });
});

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
      '/tarifs',
      '/contact',
      '/mentions-legales',
    ];
    for (const page of pagesStatiques) {
      expect(content).toContain(`<loc>https://kyokushin-jutsu-eskrima-aubagne.fr${page}</loc>`);
    }

    expect(content).not.toContain('/galerie');
    expect(content).not.toContain('/resultats');
    expect(content).toContain('<loc>https://kyokushin-jutsu-eskrima-aubagne.fr/actualites/2026-09-16-remise-des-ceintures</loc>');
    expect(content).toContain('<loc>https://kyokushin-jutsu-eskrima-aubagne.fr/actualites/2026-09-05-forum-des-associations</loc>');
  });

  it('date les actualités avec lastmod', () => {
    const content = readDistFile('sitemap.xml');
    expect(content).toContain(
      '<url><loc>https://kyokushin-jutsu-eskrima-aubagne.fr/actualites/2026-09-16-remise-des-ceintures</loc><lastmod>2026-09-16</lastmod></url>',
    );
  });
});

import { describe, expect, it } from 'vitest';
import { readDistHtml } from './helpers/dist';

describe('navigation commune', () => {
  it('affiche un lien vers chaque section principale sur la page d\'accueil', () => {
    const html = readDistHtml('/');
    const attendus: Array<[string, string]> = [
      ['/', 'Accueil'],
      ['/dojo', 'Le dojo'],
      ['/planning', 'Planning'],
      ['/actualites', 'Actualités'],
      ['/galerie', 'Galerie'],
      ['/resultats', 'Résultats'],
      ['/tarifs', 'Tarifs'],
      ['/contact', 'Contact'],
    ];
    for (const [href, label] of attendus) {
      expect(html).toContain(`href="${href}"`);
      expect(html).toContain(label);
    }
  });

  it('affiche le logo rond dans le header', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<header>[\s\S]*<img[^>]*src="\/logo-rond\.png"[\s\S]*<\/header>/);
  });

  it('signale la page en cours dans la navigation', () => {
    const html = readDistHtml('/planning');
    expect(html).toMatch(/<a href="\/planning"[^>]*aria-current="page"/);
    expect(html).not.toMatch(/<a href="\/"[^>]*aria-current="page"/);
  });

  it('charge les polices Shippori Mincho et Zen Kaku Gothic', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*Shippori\+Mincho\+B1[^"]*Zen\+Kaku\+Gothic\+New/);
  });
});

describe('pied de page', () => {
  it("affiche l'affiliation FFK avec son logo", () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<footer>[\s\S]*<img[^>]*src="\/logo-ffk\.jpg"[^>]*alt="Fédération Française de Karaté"[\s\S]*<\/footer>/);
    expect(html).toContain('Club affilié FFK');
  });
});

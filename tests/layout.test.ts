import { existsSync } from 'node:fs';
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
      ['/tarifs', 'Tarifs'],
      ['/contact', 'Contact'],
    ];
    for (const [href, label] of attendus) {
      expect(html).toContain(`href="${href}"`);
      expect(html).toContain(label);
    }
  });

  it('ne propose plus les pages Galerie et Résultats', () => {
    const html = readDistHtml('/');
    expect(html).not.toContain('href="/galerie"');
    expect(html).not.toContain('href="/resultats"');
    expect(existsSync('dist/galerie')).toBe(false);
    expect(existsSync('dist/resultats')).toBe(false);
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

  it('affiche le nom légal et un lien vers les mentions légales', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<footer>[\s\S]*Kyokushin Jutsu Escrima Aubagnais[\s\S]*<\/footer>/);
    expect(html).toMatch(/<footer>[\s\S]*href="\/mentions-legales"[\s\S]*<\/footer>/);
  });
});

describe('nom du club', () => {
  it('affiche « Kyokushin Jutsu Escrima Aubagne » dans le header et le titre', () => {
    const html = readDistHtml('/planning');
    expect(html).toMatch(/<header>[\s\S]*Kyokushin Jutsu Escrima Aubagne[\s\S]*<\/header>/);
    expect(html).toContain('<title>Planning — Kyokushin Jutsu Escrima Aubagne</title>');
    expect(html).not.toContain('Kyokushin + Jujutsu Eskrima');
  });
});

describe('menu mobile', () => {
  it('expose un bouton Menu accessible qui contrôle la navigation', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<button[^>]*class="menu-toggle"[^>]*>/);
    expect(html).toMatch(/<button[^>]*aria-controls="menu-principal"/);
    expect(html).toMatch(/<button[^>]*aria-expanded="false"/);
    expect(html).toMatch(/<nav[^>]*id="menu-principal"[^>]*aria-label="Menu principal"/);
  });

  it('cache le bouton tant que le script ne l’a pas activé', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<button[^>]*class="menu-toggle"[^>]*hidden/);
  });
});

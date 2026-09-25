import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe("page d'accueil", () => {
  it("affiche le CTA vers la page contact", () => {
    const html = readDistHtml('/');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('Essai gratuit');
  });

  it("affiche l'ours en image hero", () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<section class="hero">[\s\S]*<img[^>]*src="\/ours-montagne\.png"/);
  });

  it("affiche un résumé des horaires avec un lien vers le planning complet", () => {
    const html = readDistHtml('/');
    expect(html).toContain('Lundi');
    expect(html).toContain('href="/planning"');
  });

  it("affiche les dernières actualités", () => {
    const html = readDistHtml('/');
    expect(html).toContain('Stage de Kyokushin');
    expect(html).toContain('Journée portes ouvertes');
  });
});

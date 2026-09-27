import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe("page d'accueil", () => {
  it("affiche le CTA vers la page contact", () => {
    const html = readDistHtml('/');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('Essai gratuit');
  });

  it("affiche l'ours à l'encre en image hero", () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<section class="hero">[\s\S]*<img[^>]*src="\/ours-encre\.png"/);
  });

  it("affiche le kanji Kyokushin et le titre dans le hero", () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<section class="hero">[\s\S]*極真空手/);
    expect(html).toMatch(/<h1[^>]*>La force tranquille de l'ours\.<\/h1>/);
  });

  it("présente les deux styles avec un lien vers la page du dojo", () => {
    const html = readDistHtml('/');
    expect(html).toContain('Mas Oyama');
    expect(html).toContain('Eskrima');
    expect(html).toContain('href="/dojo"');
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

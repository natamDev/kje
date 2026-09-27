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
    expect(html).toMatch(/<h1[^>]*>Forge le corps\. Trempe l'esprit\.<\/h1>/);
    expect(html).toContain('depuis 1999');
  });

  it("présente les deux styles avec un lien vers la page du dojo", () => {
    const html = readDistHtml('/');
    expect(html).toContain('Mas Oyama');
    expect(html).toContain('Eskrima');
    expect(html).toContain('href="/dojo"');
  });

  it("affiche un résumé des horaires avec un lien vers le planning complet", () => {
    const html = readDistHtml('/');
    expect(html).toContain('Mardi');
    expect(html).toContain('19:15');
    expect(html).toContain('href="/planning"');
  });

  it("affiche les dernières actualités", () => {
    const html = readDistHtml('/');
    expect(html).toContain('Remise des ceintures');
    expect(html).toContain('Forum des associations sportives');
  });

  it("intègre la vidéo de présentation du dojo (sans cookies) avec son crédit", () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<iframe[^>]*src="https:\/\/www\.youtube-nocookie\.com\/embed\/JPf8OOb2EKw"[^>]*>/);
    expect(html).toMatch(/<iframe[^>]*title="Asso Kyokushin Jutsu Eskrima Aubagne"/);
    expect(html).toContain('Webbus Pays d');
  });
});

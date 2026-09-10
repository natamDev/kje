import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe("page d'accueil", () => {
  it("affiche le CTA vers la page contact", () => {
    const html = readDistHtml('/');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('Essai gratuit');
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

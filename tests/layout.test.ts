import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from './helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

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
});

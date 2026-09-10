import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page galerie', () => {
  it('affiche les entrées de galerie avec leurs médias', () => {
    const html = readDistHtml('/galerie');
    expect(html).toContain('Portes ouvertes 2026');
    expect(html).toMatch(/<img[^>]+src="\/images\/galerie\/placeholder\.svg"/);
  });
});

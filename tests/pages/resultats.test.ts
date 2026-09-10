import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page résultats', () => {
  it('affiche les résultats de compétition avec élève et compétition', () => {
    const html = readDistHtml('/resultats');
    expect(html).toContain('Championnat régional');
    expect(html).toContain('Jean Dupont');
    expect(html).toContain('1ère place -70kg');
  });
});

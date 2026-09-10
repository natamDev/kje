import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('actualités', () => {
  it('liste les actualités avec un lien vers le détail', () => {
    const html = readDistHtml('/actualites');
    expect(html).toContain('Stage de Kyokushin');
    expect(html).toMatch(/href="\/actualites\/[^"]+"/);
  });

  it('affiche le détail d’une actualité', () => {
    const html = readDistHtml('/actualites/2026-02-20-stage-kyokushin');
    expect(html).toContain('Stage de Kyokushin');
  });
});

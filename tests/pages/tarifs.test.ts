import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page tarifs', () => {
  it('affiche les tarifs formatés en euros', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('350 €');
    expect(html).toContain('Gratuit');
  });
});

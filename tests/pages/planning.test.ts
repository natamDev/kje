import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page planning', () => {
  it('affiche les créneaux groupés par jour avec leurs horaires', () => {
    const html = readDistHtml('/planning');
    expect(html).toContain('Lundi');
    expect(html).toContain('18:00');
    expect(html).toContain('Kyokushin');
  });
});

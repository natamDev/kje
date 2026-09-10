import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page contact', () => {
  it('affiche un lien mailto pour contacter le dojo', () => {
    const html = readDistHtml('/contact');
    expect(html).toMatch(/href="mailto:[^"]+"/);
  });
});

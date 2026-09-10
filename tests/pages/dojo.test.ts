import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page le dojo', () => {
  it('présente les deux styles pratiqués', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Kyokushin');
    expect(html).toContain('Jujutsu Eskrima');
  });
});

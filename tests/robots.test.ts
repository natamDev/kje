import { describe, expect, it } from 'vitest';
import { readDistFile } from './helpers/dist';

describe('robots.txt', () => {
  it('autorise l’indexation et référence le sitemap', () => {
    const content = readDistFile('robots.txt');
    expect(content).toContain('User-agent: *');
    expect(content).toContain('Allow: /');
    expect(content).toMatch(/Sitemap: https?:\/\/[^\s]+\/sitemap\.xml/);
  });
});

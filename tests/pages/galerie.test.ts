import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page galerie', () => {
  it('affiche les entrées de galerie avec leurs médias', () => {
    const html = readDistHtml('/galerie');
    expect(html).toContain('Portes ouvertes 2026');
    expect(html).toMatch(/<img[^>]+src="\/images\/galerie\/placeholder\.svg"/);
  });
});

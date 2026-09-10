import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page résultats', () => {
  it('affiche les résultats de compétition avec élève et compétition', () => {
    const html = readDistHtml('/resultats');
    expect(html).toContain('Championnat régional');
    expect(html).toContain('Jean Dupont');
    expect(html).toContain('1ère place -70kg');
  });
});

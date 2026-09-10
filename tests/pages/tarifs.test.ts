import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page tarifs', () => {
  it('affiche les tarifs formatés en euros', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('350 €');
    expect(html).toContain('Gratuit');
  });
});

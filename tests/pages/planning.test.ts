import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page planning', () => {
  it('affiche les créneaux groupés par jour avec leurs horaires', () => {
    const html = readDistHtml('/planning');
    expect(html).toContain('Lundi');
    expect(html).toContain('18:00');
    expect(html).toContain('Kyokushin');
  });
});

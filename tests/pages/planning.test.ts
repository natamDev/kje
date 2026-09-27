import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page planning', () => {
  it('affiche les créneaux du mardi et du jeudi', () => {
    const html = readDistHtml('/planning');
    expect(html).toContain('Mardi');
    expect(html).toContain('Jeudi');
    expect(html).toContain('18:00');
    expect(html).toContain('19:15');
    expect(html).toContain('20:30');
    expect(html).toContain('Enfants');
    expect(html).toContain('Adultes confirmés');
    expect(html).not.toContain('Lundi');
  });
});

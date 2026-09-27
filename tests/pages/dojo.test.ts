import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page le dojo', () => {
  it('présente les deux styles pratiqués', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Kyokushin');
    expect(html).toContain('Jujutsu Eskrima');
  });
});

describe('page le dojo : professeurs', () => {
  it('présente les instructeurs et leurs grades', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Gérard Calenge');
    expect(html).toContain('5<sup>e</sup> Dan');
    expect(html).toContain('Diplômé d’Instructeur Fédéral (DIF)');
    expect(html).toContain('Pascal Wherle');
    expect(html).toContain('4<sup>e</sup> Dan');
    expect(html).not.toContain('présentation du/des sensei');
  });
});

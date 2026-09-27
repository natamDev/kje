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
    expect(html).toContain('Pascal Wehrle');
    expect(html).toContain('4<sup>e</sup> Dan');
    expect(html).toContain('Grégory Cenci');
    expect(html).toContain('1<sup>er</sup> Dan');
    expect(html).toContain('Hélène');
    expect(html).not.toContain('présentation du/des sensei');
  });
});

describe('page le dojo : diplômes', () => {
  it('indique le DIF pour Gérard Calenge et Pascal Wehrle', () => {
    const html = readDistHtml('/dojo');
    const dif = html.match(/Diplômé d’Instructeur Fédéral \(DIF\)/g) ?? [];
    expect(dif).toHaveLength(2);
    const pascal = html.slice(html.indexOf('Pascal Wehrle'), html.indexOf('Grégory Cenci'));
    expect(pascal).toContain('(DIF)');
  });
});

describe('page le dojo : histoire', () => {
  it('présente le Kyokushin Jutsu Eskrima et son fondateur Alain Setrouk', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Karaté Kyokushinkai');
    expect(html).toContain('Kali');
    expect(html).toContain('Alain Setrouk');
    expect(html).toContain('9<sup>e</sup> Dan');
    expect(html).toContain('Champion du monde de Karaté en 1972');
    expect(html).not.toContain('Contenu à venir');
  });
});

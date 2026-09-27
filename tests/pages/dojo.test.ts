import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page le dojo', () => {
  it('présente les deux styles pratiqués', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Kyokushin');
    expect(html).toContain('Jutsu Eskrima');
    expect(html).not.toContain('Jujutsu Eskrima');
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
    expect(html).toContain('Ellen Mogica');
    expect(html).toContain('Laurent');
    expect(html).not.toContain('présentation du/des sensei');
  });
});

describe('page le dojo : diplômes', () => {
  it('indique le DIF pour Gérard Calenge, Pascal Wehrle et Ellen Mogica', () => {
    const html = readDistHtml('/dojo');
    const dif = html.match(/Diplômé d’Instructeur Fédéral \(DIF\)/g) ?? [];
    expect(dif).toHaveLength(3);
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

describe('page le dojo : carrousel photos', () => {
  it('affiche les 11 photos du dojo avec un texte alternatif', () => {
    const html = readDistHtml('/dojo');
    const carrousel = html.match(/<section[^>]*class="carrousel"[\s\S]*?<\/section>/)?.[0] ?? '';
    const images = carrousel.match(/<img[^>]*>/g) ?? [];
    expect(images).toHaveLength(11);
    for (const img of images) {
      expect(img).toMatch(/src="\/images\/dojo\/\d+\.jpeg"/);
      expect(img).toMatch(/alt="[^"]+"/);
    }
  });

  it('est une région nommée avec des boutons précédent / suivant', () => {
    const html = readDistHtml('/dojo');
    expect(html).toMatch(/<section[^>]*class="carrousel"[^>]*aria-label="Photos du dojo"/);
    expect(html).toMatch(/<button[^>]*aria-label="Photo précédente"/);
    expect(html).toMatch(/<button[^>]*aria-label="Photo suivante"/);
  });
});

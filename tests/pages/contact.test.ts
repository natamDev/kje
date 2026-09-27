import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page contact', () => {
  it('affiche un lien mailto pour contacter le dojo', () => {
    const html = readDistHtml('/contact');
    expect(html).toMatch(/href="mailto:[^"]+"/);
  });
});

describe('page contact : adresse', () => {
  it('affiche l’adresse des cours à Aubagne', () => {
    const html = readDistHtml('/contact');
    expect(html).toContain('7 boulevard Amiral Ganteaume');
    expect(html).toContain('13400 Aubagne');
    expect(html).not.toContain('Adresse à compléter');
  });
});

describe('page contact : coordonnées', () => {
  it('affiche l’email et le téléphone du club', () => {
    const html = readDistHtml('/contact');
    expect(html).toContain('href="mailto:kje.aubagne@gmail.com"');
    expect(html).toContain('href="tel:+33621482029"');
    expect(html).toContain('06 21 48 20 29');
  });
});

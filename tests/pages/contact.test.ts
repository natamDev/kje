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
    expect(html).toContain('206 chemin du Merlançon');
    expect(html).toContain('Quartier des Vaux Nord');
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

describe('page contact : carte', () => {
  it('intègre une carte Google Maps du dojo et un lien d’itinéraire', () => {
    const html = readDistHtml('/contact');
    expect(html).toMatch(/<iframe[^>]*src="https:\/\/www\.google\.com\/maps\?q=[^"]*Merlan[^"]*&(amp;)?output=embed"/);
    expect(html).toMatch(/<iframe[^>]*title="[^"]+"/);
    expect(html).toMatch(/<iframe[^>]*loading="lazy"/);
    expect(html).toMatch(/href="https:\/\/www\.google\.com\/maps\/dir\/\?api=1&(amp;)?destination=[^"]+"/);
  });
});

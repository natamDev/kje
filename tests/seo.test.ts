import { describe, expect, it } from 'vitest';
import { readDistHtml } from './helpers/dist';

describe('meta description', () => {
  it('affiche une description spécifique sur la page d’accueil', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<meta name="description" content="[^"]*Kyokushin[^"]*"/);
  });

  it('affiche une description différente sur la page contact', () => {
    const home = readDistHtml('/');
    const contact = readDistHtml('/contact');
    const homeDescription = home.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const contactDescription = contact.match(/<meta name="description" content="([^"]*)"/)?.[1];
    expect(contactDescription).toBeTruthy();
    expect(contactDescription).not.toBe(homeDescription);
  });
});

describe('open graph', () => {
  it('affiche les balises og de base sur la page d’accueil', () => {
    const html = readDistHtml('/');
    expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
    expect(html).toMatch(/<meta property="og:description" content="[^"]+"/);
    expect(html).toContain('<meta property="og:type" content="website"');
    expect(html).toMatch(/<meta property="og:url" content="https?:\/\/[^"]+"/);
  });
});

describe('données structurées', () => {
  it('inclut un script JSON-LD LocalBusiness sur la page d’accueil', () => {
    const html = readDistHtml('/');
    const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    expect(match).toBeTruthy();
    const data = JSON.parse(match![1]);
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.name).toContain('Kyokushin');
  });
});

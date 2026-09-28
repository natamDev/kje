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
  const jsonLd = (route: string) => {
    const match = readDistHtml(route).match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    expect(match).toBeTruthy();
    return JSON.parse(match![1]);
  };
  const club = (route: string) =>
    jsonLd(route)['@graph'].find((n: { '@id': string }) => n['@id'].endsWith('#club'));

  it('décrit le club comme un lieu de pratique sportive', () => {
    const data = club('/');
    expect(data['@type']).toEqual(['SportsActivityLocation', 'SportsClub']);
    expect(data.name).toContain('Kyokushin');
    expect(data.url).toBe('https://kyokushin-jutsu-eskrima-aubagne.fr/');
    expect(data.logo).toBe('https://kyokushin-jutsu-eskrima-aubagne.fr/logo.png');
  });

  it("inclut l'adresse d'Aubagne et le nom légal de l'association", () => {
    const data = club('/');
    expect(data.legalName).toBe('Kyokushin Jutsu Escrima Aubagnais');
    expect(data.address).toMatchObject({
      streetAddress: '206 chemin du Merlançon, Quartier des Vaux Nord',
      postalCode: '13400',
      addressLocality: 'Aubagne',
      addressCountry: 'FR',
    });
    expect(data.foundingDate).toBe('1999-09-16');
  });

  it('indique les coordonnées GPS et la fiche Google du dojo', () => {
    const data = club('/');
    expect(data.geo).toMatchObject({ '@type': 'GeoCoordinates', latitude: 43.284228, longitude: 5.579767 });
    expect(data.sameAs).toContain('https://www.google.com/search?kgmid=/g/11thg9l5zr');
  });

  it('reprend les horaires des cours du planning (mardi et jeudi, 18:00-20:30)', () => {
    const horaires = club('/').openingHoursSpecification;
    expect(horaires).toEqual([
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/Tuesday', opens: '18:00', closes: '20:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/Thursday', opens: '18:00', closes: '20:30' },
    ]);
  });

  it('balise chaque actualité comme un article daté', () => {
    const graph = jsonLd('/actualites/2026-09-16-remise-des-ceintures')['@graph'];
    const article = graph.find((n: { '@type': string }) => n['@type'] === 'NewsArticle');
    expect(article).toMatchObject({
      headline: 'Remise des ceintures et des diplômes de passage de grade',
      datePublished: '2026-09-16',
      image: 'https://kyokushin-jutsu-eskrima-aubagne.fr/images/actualite/20260916/remise-ceintures-1.jpg',
      publisher: { '@id': 'https://kyokushin-jutsu-eskrima-aubagne.fr/#club' },
    });
    expect(readDistHtml('/actualites/2026-09-16-remise-des-ceintures')).toContain('<meta property="og:type" content="article"');
  });
});

describe('titres et descriptions', () => {
  const pages = ['/', '/dojo', '/planning', '/tarifs', '/contact', '/actualites'];
  const titre = (html: string) => html.match(/<title>([^<]*)<\/title>/)![1];
  const description = (html: string) => html.match(/<meta name="description" content="([^"]*)"/)![1];

  it('met « karaté » et « Aubagne » dans chaque titre et chaque description', () => {
    for (const page of pages) {
      const html = readDistHtml(page);
      expect(titre(html), page).toMatch(/karaté|Kyokushin/i);
      expect(titre(html), page).toContain('Aubagne');
      expect(description(html), page).toMatch(/karaté/i);
      expect(description(html), page).toMatch(/Aubagne/);
    }
  });

  it('garde des descriptions de 110 à 160 caractères', () => {
    for (const page of pages) {
      const longueur = description(readDistHtml(page)).replace(/&#39;|&amp;/g, 'x').length;
      expect(longueur, page).toBeGreaterThanOrEqual(110);
      expect(longueur, page).toBeLessThanOrEqual(160);
    }
  });

  it('annonce le karaté à Aubagne au-dessus du titre de l’accueil', () => {
    expect(readDistHtml('/')).toMatch(/<p class="surtitre">Karaté Kyokushin · Aubagne · depuis 1999<\/p>/);
  });
});

describe('balises de partage', () => {
  it('précise la langue, le nom du site et le format de carte', () => {
    const html = readDistHtml('/');
    expect(html).toContain('<meta property="og:locale" content="fr_FR"');
    expect(html).toContain('<meta property="og:site_name" content="Kyokushin Jutsu Escrima Aubagne"');
    expect(html).toContain('<meta name="twitter:card" content="summary"');
  });
});

describe('image de partage', () => {
  it('utilise logo.png, qui existe, pour og:image', () => {
    const html = readDistHtml('/');
    expect(html).toContain('<meta property="og:image" content="https://kyokushin-jutsu-eskrima-aubagne.fr/logo.png"');
  });
});

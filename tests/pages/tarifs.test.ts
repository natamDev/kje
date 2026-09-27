import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page tarifs', () => {
  it('affiche la saison et les cotisations mensuelles par âge', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('2026-2027');
    expect(html).toContain('Moins de 10 ans');
    expect(html).toContain('35 €');
    expect(html).toContain('Moins de 18 ans');
    expect(html).toContain('40 €');
    expect(html).toContain('Plus de 18 ans');
    expect(html).toContain('45 €');
    expect(html).toContain('par mois');
  });

  it('mentionne le cours d’essai gratuit', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('Cours d’essai');
    expect(html).toContain('Gratuit');
  });

  it('affiche la licence, l’inscription et l’équipement', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('Licence');
    expect(html).toContain('Inscription');
    expect(html).toContain('Tee-shirt Kyokushin Jutsu Eskrima');
    expect(html).toContain('Bâton mousse');
    expect(html).toContain('Bas de kimono');
  });

  it('précise les conditions : certificat médical et paiement en 2 fois', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('Certificat médical obligatoire');
    expect(html).toContain('3 fois');
  });
});

describe('page tarifs : licence FFK', () => {
  it('renvoie vers l’espace licencié de la FFK', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toMatch(/<a[^>]*href="https:\/\/www\.ffkarate\.fr\/espace-licencies\/"[^>]*>[\s\S]*?espace licencié FFK/);
  });
});

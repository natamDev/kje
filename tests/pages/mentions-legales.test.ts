import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page mentions légales', () => {
  it("affiche l'identité légale de l'association", () => {
    const html = readDistHtml('/mentions-legales');
    expect(html).toContain('Kyokushin Jutsu Escrima Aubagnais');
    expect(html).toContain('Association déclarée');
    expect(html).toContain('538 112 566');
    expect(html).toContain('7 boulevard Amiral Ganteaume');
    const main = html.match(/<main>([\s\S]*)<\/main>/)![1];
    expect(main).not.toContain('Merlançon');
    expect(html).toContain('13400 Aubagne');
    expect(html).toContain('href="https://annuaire-entreprises.data.gouv.fr/entreprise/kyokushin-jutsu-escrima-aubagnais-538112566"');
  });
});

describe('page mentions légales : publication et hébergement', () => {
  it('indique le directeur de la publication et l’hébergeur GitHub', () => {
    const html = readDistHtml('/mentions-legales');
    expect(html).toContain('Gérard Calenge');
    expect(html).toContain('GitHub, Inc.');
    expect(html).toContain('88 Colin P. Kelly Jr. Street');
    expect(html).not.toContain('À COMPLÉTER');
  });
});

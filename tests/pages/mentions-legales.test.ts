import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page mentions légales', () => {
  it("affiche l'identité légale de l'association", () => {
    const html = readDistHtml('/mentions-legales');
    expect(html).toContain('Kyokushin Jutsu Escrima Aubagnais');
    expect(html).toContain('Association déclarée');
    expect(html).toContain('538 112 566');
    expect(html).toContain('7 boulevard Amiral Ganteaume');
    expect(html).toContain('13400 Aubagne');
    expect(html).toContain('href="https://annuaire-entreprises.data.gouv.fr/entreprise/kyokushin-jutsu-escrima-aubagnais-538112566"');
  });
});

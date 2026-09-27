import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('actualités', () => {
  it('liste les actualités, la plus récente en premier, avec un lien vers le détail', () => {
    const html = readDistHtml('/actualites');
    const remise = html.indexOf('Remise des ceintures');
    const forum = html.indexOf('Forum des associations sportives');
    expect(remise).toBeGreaterThan(-1);
    expect(forum).toBeGreaterThan(remise);
    expect(html).toContain('href="/actualites/2026-09-16-remise-des-ceintures"');
  });

  it('affiche une vignette pour chaque actualité', () => {
    const html = readDistHtml('/actualites');
    expect(html).toMatch(/<img[^>]*src="\/images\/actualite\/20260916\/remise-ceintures-1\.jpg"/);
    expect(html).toMatch(/<img[^>]*src="\/images\/actualite\/20260905\/forum-1\.jpg"/);
  });

  it('affiche le détail du forum avec ses photos', () => {
    const html = readDistHtml('/actualites/2026-09-05-forum-des-associations');
    expect(html).toContain('Forum des associations sportives');
    expect(html).toContain('5 septembre 2026');
    expect(html).toMatch(/<img[^>]*src="\/images\/actualite\/20260905\/forum-2\.jpg"/);
  });

  it('affiche le détail de la remise des ceintures avec photos et vidéo', () => {
    const html = readDistHtml('/actualites/2026-09-16-remise-des-ceintures');
    expect(html).toContain('16 septembre 2026');
    expect(html).toMatch(/<img[^>]*src="\/images\/actualite\/20260916\/remise-ceintures-2\.jpg"/);
    expect(html).toMatch(/<video[^>]*controls[^>]*>[\s\S]*<source src="\/images\/actualite\/20260916\/remise-ceintures\.mp4" type="video\/mp4"/);
  });

  it('ne contient plus les actualités d’exemple', () => {
    const html = readDistHtml('/actualites');
    expect(html).not.toContain('Stage de Kyokushin');
    expect(html).not.toContain('Journée portes ouvertes');
  });
});

import { describe, expect, it } from 'vitest';
import { actualiteSchema, resultatSchema, galerieSchema } from '../src/content/schemas';

describe('actualiteSchema', () => {
  it('accepte une actualité valide', () => {
    const result = actualiteSchema.safeParse({
      title: 'Stage de Kyokushin',
      date: '2026-02-20',
    });
    expect(result.success).toBe(true);
  });

  it('rejette une actualité sans titre', () => {
    const result = actualiteSchema.safeParse({ date: '2026-02-20' });
    expect(result.success).toBe(false);
  });
});

describe('resultatSchema', () => {
  it('accepte un résultat valide', () => {
    const result = resultatSchema.safeParse({
      date: '2026-03-01',
      competition: 'Championnat régional',
      eleves: ['Jean Dupont'],
      resultat: '1ère place -70kg',
    });
    expect(result.success).toBe(true);
  });

  it('rejette un résultat sans élève', () => {
    const result = resultatSchema.safeParse({
      date: '2026-03-01',
      competition: 'Championnat régional',
      eleves: [],
      resultat: '1ère place -70kg',
    });
    expect(result.success).toBe(false);
  });
});

describe('galerieSchema', () => {
  it('accepte une entrée de galerie valide', () => {
    const result = galerieSchema.safeParse({
      title: 'Portes ouvertes 2026',
      date: '2026-01-15',
      medias: ['/images/galerie/placeholder.svg'],
    });
    expect(result.success).toBe(true);
  });

  it('rejette une entrée sans média', () => {
    const result = galerieSchema.safeParse({
      title: 'Portes ouvertes 2026',
      date: '2026-01-15',
      medias: [],
    });
    expect(result.success).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { actualiteSchema } from '../src/content/schemas';

describe('actualiteSchema', () => {
  it('accepte une actualité valide', () => {
    const result = actualiteSchema.safeParse({
      title: 'Stage de Kyokushin',
      date: '2026-02-20',
    });
    expect(result.success).toBe(true);
  });

  it('accepte des photos et une vidéo', () => {
    const result = actualiteSchema.safeParse({
      title: 'Remise des ceintures',
      date: '2026-09-16',
      coverImage: '/images/a.jpg',
      medias: ['/images/a.jpg', '/images/b.jpg'],
      video: '/images/c.mp4',
    });
    expect(result.success).toBe(true);
  });

  it('rejette une actualité sans titre', () => {
    const result = actualiteSchema.safeParse({ date: '2026-02-20' });
    expect(result.success).toBe(false);
  });
});

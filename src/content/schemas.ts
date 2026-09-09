import { z } from 'astro:content';

export const actualiteSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  coverImage: z.string().optional(),
});

export const resultatSchema = z.object({
  date: z.coerce.date(),
  competition: z.string(),
  eleves: z.array(z.string()).min(1),
  resultat: z.string(),
});

export const galerieSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  medias: z.array(z.string()).min(1),
  description: z.string().optional(),
});

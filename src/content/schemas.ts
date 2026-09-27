import { z } from 'astro:content';

export const actualiteSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  coverImage: z.string().optional(),
  medias: z.array(z.string()).optional(),
  video: z.string().optional(),
});

import { defineCollection } from 'astro:content';
import { actualiteSchema, resultatSchema, galerieSchema } from './schemas';

const actualites = defineCollection({ type: 'content', schema: actualiteSchema });
const resultats = defineCollection({ type: 'content', schema: resultatSchema });
const galerie = defineCollection({ type: 'content', schema: galerieSchema });

export const collections = { actualites, resultats, galerie };

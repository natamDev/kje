import { defineCollection } from 'astro:content';
import { actualiteSchema } from './schemas';

const actualites = defineCollection({ type: 'content', schema: actualiteSchema });

export const collections = { actualites };

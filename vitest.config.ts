import { getViteConfig } from 'astro/config';

// getViteConfig() charge le plugin Vite d'Astro dans Vitest, ce qui permet
// aux tests d'importer des modules virtuels comme 'astro:content'.
export default getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});

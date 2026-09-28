import { defineConfig } from 'astro/config';

// Site servi par GitHub Pages sur le domaine définitif (voir public/CNAME).
const SITE_URL = process.env.SITE_URL ?? 'https://kyokushin-jutsu-eskrima-aubagne.fr';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  // dojo.html plutôt que dojo/index.html : l'hébergeur sert /dojo sans redirection vers /dojo/.
  build: { format: 'file' },
  trailingSlash: 'never',
});

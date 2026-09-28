import { defineConfig } from 'astro/config';

// Adresse provisoire GitHub Pages (https://natamdev.github.io/kje).
// Une fois le DNS en place : SITE_URL = 'https://kyokushin-jutsu-eskrima-aubagne.fr' et BASE_PATH = '/'.
const SITE_URL = process.env.SITE_URL ?? 'https://natamdev.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/kje';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  // dojo.html plutôt que dojo/index.html : l'hébergeur sert /dojo sans redirection vers /dojo/.
  build: { format: 'file' },
  trailingSlash: 'never',
});

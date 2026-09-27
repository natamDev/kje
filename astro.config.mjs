import { defineConfig } from 'astro/config';

export default defineConfig({
  // Adresse Netlify provisoire : à remplacer par le nom de domaine définitif.
  site: 'https://tranquil-mooncake-d1bdc5.netlify.app',
  // dojo.html plutôt que dojo/index.html : Netlify sert /dojo sans redirection vers /dojo/.
  build: { format: 'file' },
  trailingSlash: 'never',
});

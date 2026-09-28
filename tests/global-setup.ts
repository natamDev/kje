import { execSync } from 'node:child_process';

// Les tests vérifient le site servi à la racine du domaine définitif ;
// le build par défaut vise GitHub Pages (base /kje), cf. astro.config.mjs.
export function setup(): void {
  // Vitest a déjà chargé la config Astro par défaut et exporté BASE_URL=/kje :
  // on le retire pour que le build de test reparte de BASE_PATH.
  const { BASE_URL: _baseUrl, ...env } = process.env;
  execSync('npm run build', {
    stdio: 'inherit',
    env: { ...env, SITE_URL: 'https://kyokushin-jutsu-eskrima-aubagne.fr', BASE_PATH: '/' },
  });
}

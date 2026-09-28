# Site vitrine — Kyokushin Jutsu Escrima Aubagne

Site statique construit avec [Astro](https://astro.build). Voir le design
complet dans `docs/superpowers/specs/2026-09-09-site-vitrine-dojo-design.md`.

## Développement local

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:4321.

## Build

```bash
npm run build
npm run preview   # pour prévisualiser le build localement
```

## Tests

```bash
npm test
```

Les tests couvrent les schémas de contenu, les fonctions de données
(planning, tarifs) et un check de contenu sur le HTML généré par le build
pour chaque page. Il n'y a pas de tests unitaires exhaustifs page par page :
la vérification principale reste le build réussi et une revue visuelle
manuelle (voir le spec).

## Déploiement (GitHub Pages)

Le code source est sur la branche `dev` ; la branche `master` contient
uniquement le site construit (contenu de `dist/`), servi par GitHub Pages.

1. Sur `dev` : `npm run build`
2. Remplacer le contenu de `master` par celui de `dist/` (fichier `.nojekyll` compris,
   sinon GitHub ignore le dossier `_astro`), commiter et pousser.
3. Adresse : https://kyokushin-jutsu-eskrima-aubagne.fr (`public/CNAME`, domaine
   déclaré dans Settings → Pages du dépôt). `astro.config.mjs` : `site` = cette
   adresse, `base` = `/`.

Les liens internes passent par `url()` (`src/lib/url.ts`), qui ajoute le `base` :
ne pas écrire de chemin `/...` en dur dans les pages.

En cas de changement d'hébergeur, mettre aussi à jour `hebergeur` dans
`src/data/club.ts` (affiché dans les mentions légales).

## Contenu à fournir avant mise en ligne

- Nom de famille et grade d'Hélène (`src/pages/dojo.astro`, liste `instructeurs`)

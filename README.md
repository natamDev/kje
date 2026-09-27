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

## Déploiement (Netlify)

1. Connecter ce dépôt Git à un nouveau site Netlify.
2. Build command : `npm run build`
3. Publish directory : `dist`
4. Adresse actuelle : https://tranquil-mooncake-d1bdc5.netlify.app. Une fois le nom de domaine définitif choisi, le configurer dans
   Netlify et mettre à jour `site` dans `astro.config.mjs`.

En cas de changement d'hébergeur, mettre aussi à jour `hebergeur` dans
`src/data/club.ts` (affiché dans les mentions légales).

## Contenu à fournir avant mise en ligne

- Nom de famille et grade d'Hélène (`src/pages/dojo.astro`, liste `instructeurs`)
- Nom de domaine définitif

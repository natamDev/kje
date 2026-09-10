# Site vitrine — Dojo Kyokushin + Jujutsu Eskrima

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

## Déploiement (Cloudflare Pages)

1. Connecter ce dépôt Git à un nouveau projet Cloudflare Pages.
2. Build command : `npm run build`
3. Output directory : `dist`
4. Une fois le nom de domaine définitif choisi, le configurer dans
   Cloudflare Pages et mettre à jour `site` dans `astro.config.mjs`.

## Contenu à fournir avant mise en ligne

- Logo du club (à intégrer dans `public/` et le `Header`)
- Photos de la galerie (remplacer `public/images/galerie/placeholder.svg`)
- Textes définitifs : histoire du dojo, présentation des sensei
  (`src/pages/dojo.astro`), coordonnées de contact
  (`src/pages/contact.astro`)
- Nom de domaine définitif

# Site vitrine du dojo — Design

Date : 2026-09-09
Statut : approuvé par l'utilisateur, prêt pour plan d'implémentation

## Contexte

Le club pratique le Kyokushin et le Jujutsu Eskrima. Il n'existe aujourd'hui
aucun site. Le nom de domaine historique (`kyokushin-jutsu-eskrima.fr`) a été
perdu (non-renouvelé, racheté par un tiers) — le choix du nouveau nom de
domaine est reporté, hors scope de ce document.

Le projet global a été découpé en trois sous-projets indépendants :

1. **Site vitrine public** (ce document) — présentation, planning, actus,
   galerie, résultats, tarifs, contact. Pas d'authentification.
2. **Espace membres** (futur, hors scope) — nécessitera un système d'auth.
3. **Gestion administrative / paiements** (futur, hors scope) — inscriptions
   en ligne, cotisations, réservations.

Ce document ne couvre que le sous-projet 1.

## Objectif

Un site de présentation publique du dojo, sans compte utilisateur, éditable
par une seule personne (technique) via des fichiers versionnés dans Git.
Priorités : visibilité/recrutement de nouveaux élèves, information pratique
pour les élèves actuels, référencement local.

## Hors scope (explicite)

- Compte utilisateur / espace membre connecté
- Inscription ou paiement en ligne
- Réservation de créneaux
- Interface d'administration (CMS) pour un éditeur non-technique — pourra être
  ajoutée plus tard comme sous-projet séparé si le besoin apparaît
- Choix définitif du nom de domaine

## Stack technique

- **Générateur** : [Astro](https://astro.build) — génération de site statique,
  système de composants pour le layout commun (header/footer/nav), et
  "content collections" pour le contenu structuré (Markdown + frontmatter).
- **Contenu** : Markdown avec frontmatter typé (schémas Zod via Astro Content
  Collections) pour les actualités, résultats et galerie ; fichiers de
  données simples (JSON/YAML) pour le planning et les tarifs.
- **Hébergement** : Cloudflare Pages (ou Netlify en repli) — build statique,
  déploiement à chaque push Git, gratuit à cette échelle.
- **Style** : CSS simple (ou un framework utilitaire léger type Tailwind, à
  trancher en phase d'implémentation) intégrant le logo et les couleurs du
  club (asset logo à fournir par l'utilisateur).
- **Pas de base de données, pas de backend applicatif.**

## Plan du site (sitemap)

| Page | Type de contenu | Détail |
|---|---|---|
| Accueil (`/`) | statique | Hero avec logo/nom du club, accroche Kyokushin + Jujutsu Eskrima, horaires/lieu résumés, aperçu des 2-3 dernières actus, CTA vers Contact/essai gratuit |
| Le dojo (`/dojo`) | statique | Histoire du club, présentation des styles pratiqués, présentation du/des sensei |
| Planning (`/planning`) | données simples | Grille horaire des cours ; un seul fichier de données édité à la main (change rarement) |
| Actualités (`/actualites`, `/actualites/[slug]`) | collection | Liste + page de détail ; chaque actu = un fichier Markdown (titre, date, image de couverture, texte) |
| Galerie (`/galerie`) | collection | Photos/vidéos groupées par événement ; chaque entrée = un dossier/fichier Markdown avec liste de médias associés |
| Résultats (`/resultats`) | collection | Résultats de compétitions ; chaque entrée = un fichier Markdown (date, nom de la compétition, élève(s), résultat) |
| Tarifs (`/tarifs`) | statique | Grille de prix, page à contenu simple |
| Contact (`/contact`) | statique | Coordonnées (adresse, téléphone, email) ; formulaire de contact optionnel ou simple lien `mailto:` (à trancher en implémentation selon la complexité acceptable sans backend) |

## Modèle de contenu

- **Collections Astro** (`src/content/`) :
  - `actualites` : `title`, `date`, `coverImage`, `body` (Markdown)
  - `resultats` : `date`, `competition`, `eleves` (liste), `resultat`, `body`
    optionnel
  - `galerie` : `title`, `date`, `medias` (liste d'images/vidéos), `description`
    optionnelle
- **Données statiques** (`src/data/`) :
  - `planning.json` (ou `.yaml`) : créneaux (jour, heure, cours, niveau)
  - `tarifs.json` : grille tarifaire

Ajouter du contenu = copier un fichier existant dans le bon dossier et
modifier le frontmatter — pas d'interface d'administration nécessaire pour
l'instant, l'utilisateur édite directement les fichiers.

## Navigation

Header commun sur toutes les pages : Accueil / Le dojo / Planning /
Actualités / Galerie / Résultats / Tarifs / Contact. Footer avec coordonnées
et éventuels liens réseaux sociaux.

## Assets à fournir par l'utilisateur (avant/pendant implémentation)

- Logo du club (fichier image)
- Photos pour la galerie (au moins un jeu de départ)
- Textes définitifs (présentation du dojo, tarifs, coordonnées)
- Nom de domaine définitif (peut être choisi après le déploiement initial)

## Vérification / tests

Site statique sans logique métier complexe : la vérification se fait par
build réussi (`astro build` sans erreur) et revue visuelle manuelle des
pages générées, plutôt que par des tests automatisés unitaires. Si un
formulaire de contact avec logique (validation, envoi) est ajouté, prévoir
des tests ciblés sur cette partie uniquement.

## Prochaines étapes

Passer par la skill `writing-plans` pour découper l'implémentation (mise en
place du projet Astro, layout commun, puis une itération par page/section).

# Site vitrine du dojo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site vitrine public du dojo (présentation, planning, actualités, galerie, résultats, tarifs, contact), sans authentification, éditable via des fichiers versionnés dans Git.

**Architecture:** Site Astro statique. Le contenu qui évolue régulièrement (actualités, résultats, galerie) vit dans des "content collections" Markdown avec schéma Zod. Le contenu qui change rarement (planning, tarifs) vit dans des fichiers de données TypeScript. Un layout commun (`BaseLayout` + `Header` + `Footer`) fournit la navigation partagée entre les huit pages.

**Tech Stack:** Astro 5.x (génération statique), TypeScript, Vitest pour les tests, hébergement cible Cloudflare Pages (ou Netlify en repli). Pas de base de données, pas de backend applicatif, pas d'authentification.

**Spec:** `docs/superpowers/specs/2026-09-09-site-vitrine-dojo-design.md`

## Global Constraints

- Pas d'authentification ni de compte utilisateur (hors scope explicite du spec).
- Pas de backend applicatif ni de base de données — site 100% statique.
- Un seul éditeur, technique, pas d'interface de CMS pour l'instant.
- Contenu en français.
- Nom de domaine définitif non tranché — utiliser un placeholder (`https://example.com`) dans la config Astro en attendant.
- Vérification par build (`astro build`) réussi + tests ciblés sur la logique réelle (schémas de contenu, fonctions de données), plutôt que des tests unitaires exhaustifs page par page (conforme au spec).
- Formulaire de contact hors scope pour l'instant — un simple lien `mailto:` suffit, cohérent avec "pas de backend applicatif".

---

## Task 1: Scaffolding du projet Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `src/pages/index.astro`

**Interfaces:**
- Produces: projet Astro buildable (`npm run build` → `dist/index.html`), config Vitest utilisable pour importer `astro:content` dans les tests des tâches suivantes (via `getViteConfig`).

- [ ] **Step 1: Créer `package.json`**

```json
{
  "name": "dojo-site",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.0.0"
  },
  "devDependencies": {
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Créer `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  // À remplacer par le nom de domaine définitif une fois choisi.
  site: 'https://example.com',
});
```

- [ ] **Step 3: Créer `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: Créer `vitest.config.ts`**

```ts
import { getViteConfig } from 'astro/config';

// getViteConfig() charge le plugin Vite d'Astro dans Vitest, ce qui permet
// aux tests d'importer des modules virtuels comme 'astro:content'.
export default getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Créer `.gitignore`**

```
node_modules/
dist/
.astro/
.env
```

- [ ] **Step 6: Créer `src/pages/index.astro` (placeholder, sera remplacé en Task 5)**

```astro
---
---
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Dojo Kyokushin + Jujutsu Eskrima</title>
  </head>
  <body>
    <h1>Site en construction</h1>
  </body>
</html>
```

- [ ] **Step 7: Installer les dépendances**

Run: `npm install`
Expected: installation réussie, `node_modules/` créé, `package-lock.json` généré.

- [ ] **Step 8: Vérifier que le projet build**

Run: `npm run build`
Expected: build réussi, `dist/index.html` généré contenant "Site en construction".

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore src/pages/index.astro
git commit -m "chore: scaffolding du projet Astro"
```

---

## Task 2: Content collections (actualités, résultats, galerie)

**Files:**
- Create: `src/content/schemas.ts`
- Create: `src/content/config.ts`
- Create: `src/content/actualites/2026-01-15-portes-ouvertes.md`
- Create: `src/content/actualites/2026-02-20-stage-kyokushin.md`
- Create: `src/content/resultats/2026-03-01-championnat-regional.md`
- Create: `src/content/galerie/2026-01-15-portes-ouvertes.md`
- Create: `public/images/galerie/placeholder.svg`
- Test: `tests/content.schema.test.ts`

**Interfaces:**
- Consumes: rien (première tâche de contenu)
- Produces: `actualiteSchema`, `resultatSchema`, `galerieSchema` (exports Zod de `src/content/schemas.ts`) ; collections Astro `actualites`, `resultats`, `galerie` interrogeables via `getCollection('actualites' | 'resultats' | 'galerie')`, chaque entrée exposant `.id` et `.data` conforme aux schémas ci-dessus.

- [ ] **Step 1: Écrire le test qui échoue pour `actualiteSchema`**

Créer `tests/content.schema.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { actualiteSchema, resultatSchema, galerieSchema } from '../src/content/schemas';

describe('actualiteSchema', () => {
  it('accepte une actualité valide', () => {
    const result = actualiteSchema.safeParse({
      title: 'Stage de Kyokushin',
      date: '2026-02-20',
    });
    expect(result.success).toBe(true);
  });

  it('rejette une actualité sans titre', () => {
    const result = actualiteSchema.safeParse({ date: '2026-02-20' });
    expect(result.success).toBe(false);
  });
});

describe('resultatSchema', () => {
  it('accepte un résultat valide', () => {
    const result = resultatSchema.safeParse({
      date: '2026-03-01',
      competition: 'Championnat régional',
      eleves: ['Jean Dupont'],
      resultat: '1ère place -70kg',
    });
    expect(result.success).toBe(true);
  });

  it('rejette un résultat sans élève', () => {
    const result = resultatSchema.safeParse({
      date: '2026-03-01',
      competition: 'Championnat régional',
      eleves: [],
      resultat: '1ère place -70kg',
    });
    expect(result.success).toBe(false);
  });
});

describe('galerieSchema', () => {
  it('accepte une entrée de galerie valide', () => {
    const result = galerieSchema.safeParse({
      title: 'Portes ouvertes 2026',
      date: '2026-01-15',
      medias: ['/images/galerie/placeholder.svg'],
    });
    expect(result.success).toBe(true);
  });

  it('rejette une entrée sans média', () => {
    const result = galerieSchema.safeParse({
      title: 'Portes ouvertes 2026',
      date: '2026-01-15',
      medias: [],
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- content.schema`
Expected: FAIL — `Cannot find module '../src/content/schemas'`

- [ ] **Step 3: Implémenter `src/content/schemas.ts`**

```ts
import { z } from 'astro:content';

export const actualiteSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  coverImage: z.string().optional(),
});

export const resultatSchema = z.object({
  date: z.coerce.date(),
  competition: z.string(),
  eleves: z.array(z.string()).min(1),
  resultat: z.string(),
});

export const galerieSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  medias: z.array(z.string()).min(1),
  description: z.string().optional(),
});
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- content.schema`
Expected: PASS — 6 tests passent

- [ ] **Step 5: Créer `src/content/config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { actualiteSchema, resultatSchema, galerieSchema } from './schemas';

const actualites = defineCollection({ type: 'content', schema: actualiteSchema });
const resultats = defineCollection({ type: 'content', schema: resultatSchema });
const galerie = defineCollection({ type: 'content', schema: galerieSchema });

export const collections = { actualites, resultats, galerie };
```

- [ ] **Step 6: Créer les fixtures de contenu**

`src/content/actualites/2026-01-15-portes-ouvertes.md` :

```markdown
---
title: "Journée portes ouvertes"
date: 2026-01-15
---

Le dojo a ouvert ses portes au public pour une journée de démonstration
de Kyokushin et de Jujutsu Eskrima.
```

`src/content/actualites/2026-02-20-stage-kyokushin.md` :

```markdown
---
title: "Stage de Kyokushin"
date: 2026-02-20
---

Un stage de Kyokushin animé par un intervenant extérieur aura lieu ce
mois-ci, ouvert à tous les niveaux.
```

`src/content/resultats/2026-03-01-championnat-regional.md` :

```markdown
---
date: 2026-03-01
competition: "Championnat régional"
eleves: ["Jean Dupont"]
resultat: "1ère place -70kg"
---

Belle performance de notre élève lors du championnat régional.
```

`src/content/galerie/2026-01-15-portes-ouvertes.md` :

```markdown
---
title: "Portes ouvertes 2026"
date: 2026-01-15
medias: ["/images/galerie/placeholder.svg"]
---
```

- [ ] **Step 7: Créer l'image placeholder de galerie**

Créer `public/images/galerie/placeholder.svg` :

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <rect width="400" height="300" fill="#ddd" />
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="20">
    Photo à venir
  </text>
</svg>
```

- [ ] **Step 8: Vérifier que le build reconnaît les collections sans erreur de schéma**

Run: `npm run build`
Expected: build réussi, aucune erreur de validation de schéma dans les logs.

- [ ] **Step 9: Commit**

```bash
git add src/content public/images/galerie
git commit -m "feat: content collections actualites/resultats/galerie avec schemas et fixtures"
```

---

## Task 3: Données planning et tarifs

**Files:**
- Create: `src/data/planning.ts`
- Create: `src/data/tarifs.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Consumes: rien
- Produces: `Creneau` (interface), `creneaux: Creneau[]`, `groupByJour(items: Creneau[]): Record<string, Creneau[]>` depuis `src/data/planning.ts` ; `Tarif` (interface), `tarifs: Tarif[]`, `formatPrix(centimes: number): string` depuis `src/data/tarifs.ts`.

- [ ] **Step 1: Écrire les tests qui échouent**

Créer `tests/data.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { groupByJour, type Creneau } from '../src/data/planning';
import { formatPrix } from '../src/data/tarifs';

describe('groupByJour', () => {
  it('regroupe les créneaux par jour dans l’ordre de la semaine', () => {
    const creneaux: Creneau[] = [
      { jour: 'Samedi', heureDebut: '10:00', heureFin: '11:30', cours: 'Kyokushin', niveau: 'Enfants' },
      { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:30', cours: 'Kyokushin', niveau: 'Tous niveaux' },
    ];
    const grouped = groupByJour(creneaux);
    expect(Object.keys(grouped)).toEqual(['Lundi', 'Samedi']);
  });

  it('trie les créneaux d’un même jour par heure de début', () => {
    const creneaux: Creneau[] = [
      { jour: 'Lundi', heureDebut: '19:00', heureFin: '20:00', cours: 'B', niveau: 'X' },
      { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:00', cours: 'A', niveau: 'X' },
    ];
    const grouped = groupByJour(creneaux);
    expect(grouped['Lundi'].map((c) => c.cours)).toEqual(['A', 'B']);
  });

  it('omet les jours sans créneau', () => {
    expect(groupByJour([])).toEqual({});
  });
});

describe('formatPrix', () => {
  it('formate un prix en euros sans décimales', () => {
    expect(formatPrix(35000)).toBe('350 €');
  });

  it('affiche "Gratuit" pour un prix à zéro', () => {
    expect(formatPrix(0)).toBe('Gratuit');
  });
});
```

- [ ] **Step 2: Lancer les tests et vérifier qu'ils échouent**

Run: `npm test -- data.test`
Expected: FAIL — modules `../src/data/planning` et `../src/data/tarifs` introuvables

- [ ] **Step 3: Implémenter `src/data/planning.ts`**

```ts
export interface Creneau {
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  heureDebut: string;
  heureFin: string;
  cours: string;
  niveau: string;
}

export const creneaux: Creneau[] = [
  { jour: 'Lundi', heureDebut: '18:00', heureFin: '19:30', cours: 'Kyokushin', niveau: 'Tous niveaux' },
  { jour: 'Mercredi', heureDebut: '19:00', heureFin: '20:30', cours: 'Jujutsu Eskrima', niveau: 'Adultes' },
  { jour: 'Samedi', heureDebut: '10:00', heureFin: '11:30', cours: 'Kyokushin', niveau: 'Enfants' },
];

const ORDRE_JOURS: Creneau['jour'][] = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
];

export function groupByJour(items: Creneau[]): Record<string, Creneau[]> {
  const grouped: Record<string, Creneau[]> = {};
  for (const jour of ORDRE_JOURS) {
    const forDay = items
      .filter((c) => c.jour === jour)
      .sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));
    if (forDay.length > 0) grouped[jour] = forDay;
  }
  return grouped;
}
```

- [ ] **Step 4: Implémenter `src/data/tarifs.ts`**

```ts
export interface Tarif {
  label: string;
  prixCentimes: number;
  periode: 'an' | 'trimestre' | 'mois';
}

export const tarifs: Tarif[] = [
  { label: 'Adulte', prixCentimes: 35000, periode: 'an' },
  { label: 'Enfant (-16 ans)', prixCentimes: 25000, periode: 'an' },
  { label: 'Cours d’essai', prixCentimes: 0, periode: 'mois' },
];

export function formatPrix(centimes: number): string {
  if (centimes === 0) return 'Gratuit';
  return `${(centimes / 100).toFixed(0)} €`;
}
```

- [ ] **Step 5: Lancer les tests et vérifier qu'ils passent**

Run: `npm test -- data.test`
Expected: PASS — 5 tests passent

- [ ] **Step 6: Commit**

```bash
git add src/data tests/data.test.ts
git commit -m "feat: donnees planning et tarifs avec regroupement/formatage testes"
```

---

## Task 4: Layout commun et navigation

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `tests/helpers/dist.ts`
- Modify: `src/pages/index.astro`
- Test: `tests/layout.test.ts`

**Interfaces:**
- Consumes: rien
- Produces: `BaseLayout` (Props `{ title: string }`, slot par défaut) utilisé par toutes les pages des tâches suivantes ; `readDistHtml(routePath: string): string` (helper de test) réutilisé par toutes les tâches de page suivantes.

- [ ] **Step 1: Écrire le helper de test `tests/helpers/dist.ts`**

```ts
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function readDistHtml(routePath: string): string {
  const normalized = routePath.replace(/^\/+|\/+$/g, '');
  const filePath = normalized === ''
    ? path.join('dist', 'index.html')
    : path.join('dist', normalized, 'index.html');
  return readFileSync(filePath, 'utf-8');
}
```

- [ ] **Step 2: Écrire le test qui échoue pour la navigation**

Créer `tests/layout.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from './helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('navigation commune', () => {
  it('affiche un lien vers chaque section principale sur la page d’accueil', () => {
    const html = readDistHtml('/');
    const attendus: Array<[string, string]> = [
      ['/', 'Accueil'],
      ['/dojo', 'Le dojo'],
      ['/planning', 'Planning'],
      ['/actualites', 'Actualités'],
      ['/galerie', 'Galerie'],
      ['/resultats', 'Résultats'],
      ['/tarifs', 'Tarifs'],
      ['/contact', 'Contact'],
    ];
    for (const [href, label] of attendus) {
      expect(html).toContain(`href="${href}"`);
      expect(html).toContain(label);
    }
  });
});
```

- [ ] **Step 3: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- layout.test`
Expected: FAIL — la page d'accueil actuelle (placeholder) ne contient aucun lien de navigation

- [ ] **Step 4: Implémenter `src/components/Header.astro`**

```astro
---
const links = [
  { href: '/', label: 'Accueil' },
  { href: '/dojo', label: 'Le dojo' },
  { href: '/planning', label: 'Planning' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/resultats', label: 'Résultats' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' },
];
---
<header>
  <nav>
    <ul>
      {links.map((link) => (
        <li><a href={link.href}>{link.label}</a></li>
      ))}
    </ul>
  </nav>
</header>
```

- [ ] **Step 5: Implémenter `src/components/Footer.astro`**

```astro
---
const currentYear = new Date().getFullYear();
---
<footer>
  <p>Dojo Kyokushin + Jujutsu Eskrima — {currentYear}</p>
</footer>
```

- [ ] **Step 6: Implémenter `src/layouts/BaseLayout.astro`**

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

export interface Props {
  title: string;
}
const { title } = Astro.props;
---
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} — Dojo Kyokushin + Jujutsu Eskrima</title>
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 7: Modifier `src/pages/index.astro` pour utiliser le layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Accueil">
  <h1>Site en construction</h1>
</BaseLayout>
```

- [ ] **Step 8: Lancer le test et vérifier qu'il passe**

Run: `npm test -- layout.test`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/layouts src/components src/pages/index.astro tests/helpers tests/layout.test.ts
git commit -m "feat: layout commun avec header/footer et navigation testee"
```

---

## Task 5: Page d'accueil

**Files:**
- Modify: `src/pages/index.astro`
- Test: `tests/pages/home.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `getCollection('actualites')` (Task 2), `creneaux`/`groupByJour` (Task 3), `readDistHtml` (Task 4)
- Produces: page `/` complète

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/home.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page d’accueil', () => {
  it('affiche le CTA vers la page contact', () => {
    const html = readDistHtml('/');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('Essai gratuit');
  });

  it('affiche un résumé des horaires avec un lien vers le planning complet', () => {
    const html = readDistHtml('/');
    expect(html).toContain('Lundi');
    expect(html).toContain('href="/planning"');
  });

  it('affiche les dernières actualités', () => {
    const html = readDistHtml('/');
    expect(html).toContain('Stage de Kyokushin');
    expect(html).toContain('Journée portes ouvertes');
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- home.test`
Expected: FAIL — la page d'accueil actuelle ne contient ni CTA, ni horaires, ni actualités

- [ ] **Step 3: Implémenter la page d'accueil**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { creneaux, groupByJour } from '../data/planning';

const dernieresActus = (await getCollection('actualites'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const planningParJour = groupByJour(creneaux);
---
<BaseLayout title="Accueil">
  <section class="hero">
    <h1>Dojo Kyokushin + Jujutsu Eskrima</h1>
    <p>Arts martiaux traditionnels japonais et philippins, pour adultes et enfants.</p>
    <a class="cta" href="/contact">Essai gratuit</a>
  </section>

  <section class="horaires-resume">
    <h2>Horaires</h2>
    <ul>
      {Object.entries(planningParJour).map(([jour, creneauxDuJour]) => (
        <li>
          <strong>{jour}</strong> :
          {creneauxDuJour.map((c) => `${c.cours} ${c.heureDebut}-${c.heureFin}`).join(', ')}
        </li>
      ))}
    </ul>
    <a href="/planning">Voir le planning complet</a>
  </section>

  <section class="dernieres-actus">
    <h2>Actualités récentes</h2>
    <ul>
      {dernieresActus.map((actu) => (
        <li>
          <a href={`/actualites/${actu.id}`}>{actu.data.title}</a>
        </li>
      ))}
    </ul>
    <a href="/actualites">Voir toutes les actualités</a>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- home.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro tests/pages/home.test.ts
git commit -m "feat: page d'accueil avec CTA, horaires et dernieres actus"
```

---

## Task 6: Page "Le dojo"

**Files:**
- Create: `src/pages/dojo.astro`
- Test: `tests/pages/dojo.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `readDistHtml` (Task 4)
- Produces: page `/dojo`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/dojo.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page le dojo', () => {
  it('présente les deux styles pratiqués', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Kyokushin');
    expect(html).toContain('Jujutsu Eskrima');
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- dojo.test`
Expected: FAIL — `dist/dojo/index.html` n'existe pas encore

- [ ] **Step 3: Implémenter `src/pages/dojo.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Le dojo">
  <h1>Le dojo</h1>

  <section>
    <h2>Notre histoire</h2>
    <p>Contenu à venir — histoire de la fondation du dojo.</p>
  </section>

  <section>
    <h2>Nos styles</h2>
    <p>
      Le Kyokushin est un style de karaté full-contact fondé par Mas Oyama,
      reconnu pour la rigueur de son entraînement.
    </p>
    <p>
      Le Jujutsu Eskrima combine les techniques de close-combat du Jujutsu
      japonais avec l’art martial philippin de l’Eskrima (bâton, lame,
      défense rapprochée).
    </p>
  </section>

  <section>
    <h2>Nos professeurs</h2>
    <p>Contenu à venir — présentation du/des sensei.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- dojo.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/dojo.astro tests/pages/dojo.test.ts
git commit -m "feat: page presentation du dojo"
```

---

## Task 7: Page Planning

**Files:**
- Create: `src/pages/planning.astro`
- Test: `tests/pages/planning.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `creneaux`/`groupByJour` (Task 3), `readDistHtml` (Task 4)
- Produces: page `/planning`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/planning.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page planning', () => {
  it('affiche les créneaux groupés par jour avec leurs horaires', () => {
    const html = readDistHtml('/planning');
    expect(html).toContain('Lundi');
    expect(html).toContain('18:00');
    expect(html).toContain('Kyokushin');
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- planning.test`
Expected: FAIL — `dist/planning/index.html` n'existe pas encore

- [ ] **Step 3: Implémenter `src/pages/planning.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { creneaux, groupByJour } from '../data/planning';

const planningParJour = groupByJour(creneaux);
---
<BaseLayout title="Planning">
  <h1>Planning des cours</h1>
  {Object.entries(planningParJour).map(([jour, creneauxDuJour]) => (
    <section>
      <h2>{jour}</h2>
      <ul>
        {creneauxDuJour.map((c) => (
          <li>{c.heureDebut}–{c.heureFin} · {c.cours} ({c.niveau})</li>
        ))}
      </ul>
    </section>
  ))}
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- planning.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/planning.astro tests/pages/planning.test.ts
git commit -m "feat: page planning groupee par jour"
```

---

## Task 8: Pages Actualités (liste + détail)

**Files:**
- Create: `src/pages/actualites/index.astro`
- Create: `src/pages/actualites/[slug].astro`
- Test: `tests/pages/actualites.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `getCollection`/`render` de `astro:content` (Task 2), `readDistHtml` (Task 4)
- Produces: pages `/actualites` et `/actualites/[id]`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/actualites.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('actualités', () => {
  it('liste les actualités avec un lien vers le détail', () => {
    const html = readDistHtml('/actualites');
    expect(html).toContain('Stage de Kyokushin');
    expect(html).toMatch(/href="\/actualites\/[^"]+"/);
  });

  it('affiche le détail d’une actualité', () => {
    const html = readDistHtml('/actualites/2026-02-20-stage-kyokushin');
    expect(html).toContain('Stage de Kyokushin');
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- actualites.test`
Expected: FAIL — les pages `/actualites` et `/actualites/2026-02-20-stage-kyokushin` n'existent pas encore

- [ ] **Step 3: Implémenter `src/pages/actualites/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const actus = (await getCollection('actualites'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Actualités">
  <h1>Actualités</h1>
  <ul>
    {actus.map((actu) => (
      <li>
        <a href={`/actualites/${actu.id}`}>{actu.data.title}</a>
        — {actu.data.date.toLocaleDateString('fr-FR')}
      </li>
    ))}
  </ul>
</BaseLayout>
```

- [ ] **Step 4: Implémenter `src/pages/actualites/[slug].astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const actus = await getCollection('actualites');
  return actus.map((actu) => ({
    params: { slug: actu.id },
    props: { actu },
  }));
}

const { actu } = Astro.props;
const { Content } = await render(actu);
---
<BaseLayout title={actu.data.title}>
  <h1>{actu.data.title}</h1>
  <p>{actu.data.date.toLocaleDateString('fr-FR')}</p>
  <Content />
</BaseLayout>
```

- [ ] **Step 5: Lancer le test et vérifier qu'il passe**

Run: `npm test -- actualites.test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/actualites tests/pages/actualites.test.ts
git commit -m "feat: pages actualites liste et detail"
```

---

## Task 9: Page Résultats

**Files:**
- Create: `src/pages/resultats.astro`
- Test: `tests/pages/resultats.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `getCollection('resultats')` (Task 2), `readDistHtml` (Task 4)
- Produces: page `/resultats`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/resultats.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page résultats', () => {
  it('affiche les résultats de compétition avec élève et compétition', () => {
    const html = readDistHtml('/resultats');
    expect(html).toContain('Championnat régional');
    expect(html).toContain('Jean Dupont');
    expect(html).toContain('1ère place -70kg');
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- resultats.test`
Expected: FAIL — `dist/resultats/index.html` n'existe pas encore

- [ ] **Step 3: Implémenter `src/pages/resultats.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const resultats = (await getCollection('resultats'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Résultats">
  <h1>Résultats de compétitions</h1>
  <ul>
    {resultats.map((r) => (
      <li>
        <strong>{r.data.competition}</strong> ({r.data.date.toLocaleDateString('fr-FR')}) —
        {r.data.eleves.join(', ')} : {r.data.resultat}
      </li>
    ))}
  </ul>
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- resultats.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/resultats.astro tests/pages/resultats.test.ts
git commit -m "feat: page resultats de competition"
```

---

## Task 10: Page Galerie

**Files:**
- Create: `src/pages/galerie.astro`
- Test: `tests/pages/galerie.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `getCollection('galerie')` (Task 2), `readDistHtml` (Task 4)
- Produces: page `/galerie`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/galerie.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page galerie', () => {
  it('affiche les entrées de galerie avec leurs médias', () => {
    const html = readDistHtml('/galerie');
    expect(html).toContain('Portes ouvertes 2026');
    expect(html).toMatch(/<img[^>]+src="\/images\/galerie\/placeholder\.svg"/);
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- galerie.test`
Expected: FAIL — `dist/galerie/index.html` n'existe pas encore

- [ ] **Step 3: Implémenter `src/pages/galerie.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const entrees = (await getCollection('galerie'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Galerie">
  <h1>Galerie</h1>
  {entrees.map((entree) => (
    <section>
      <h2>{entree.data.title}</h2>
      <div class="medias">
        {entree.data.medias.map((src) => (
          <img src={src} alt={entree.data.title} loading="lazy" />
        ))}
      </div>
    </section>
  ))}
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- galerie.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/galerie.astro tests/pages/galerie.test.ts
git commit -m "feat: page galerie"
```

---

## Task 11: Page Tarifs

**Files:**
- Create: `src/pages/tarifs.astro`
- Test: `tests/pages/tarifs.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `tarifs`/`formatPrix` (Task 3), `readDistHtml` (Task 4)
- Produces: page `/tarifs`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/tarifs.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page tarifs', () => {
  it('affiche les tarifs formatés en euros', () => {
    const html = readDistHtml('/tarifs');
    expect(html).toContain('350 €');
    expect(html).toContain('Gratuit');
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- tarifs.test`
Expected: FAIL — `dist/tarifs/index.html` n'existe pas encore

- [ ] **Step 3: Implémenter `src/pages/tarifs.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { tarifs, formatPrix } from '../data/tarifs';
---
<BaseLayout title="Tarifs">
  <h1>Tarifs</h1>
  <table>
    <thead>
      <tr><th>Formule</th><th>Prix</th><th>Période</th></tr>
    </thead>
    <tbody>
      {tarifs.map((t) => (
        <tr>
          <td>{t.label}</td>
          <td>{formatPrix(t.prixCentimes)}</td>
          <td>{t.periode}</td>
        </tr>
      ))}
    </tbody>
  </table>
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- tarifs.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/tarifs.astro tests/pages/tarifs.test.ts
git commit -m "feat: page tarifs"
```

---

## Task 12: Page Contact

**Files:**
- Create: `src/pages/contact.astro`
- Test: `tests/pages/contact.test.ts`

**Interfaces:**
- Consumes: `BaseLayout` (Task 4), `readDistHtml` (Task 4)
- Produces: page `/contact`

- [ ] **Step 1: Écrire le test qui échoue**

Créer `tests/pages/contact.test.ts` :

```ts
import { execSync } from 'node:child_process';
import { beforeAll, describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

beforeAll(() => {
  execSync('npm run build', { stdio: 'inherit' });
}, 60_000);

describe('page contact', () => {
  it('affiche un lien mailto pour contacter le dojo', () => {
    const html = readDistHtml('/contact');
    expect(html).toMatch(/href="mailto:[^"]+"/);
  });
});
```

- [ ] **Step 2: Lancer le test et vérifier qu'il échoue**

Run: `npm test -- contact.test`
Expected: FAIL — `dist/contact/index.html` n'existe pas encore

- [ ] **Step 3: Implémenter `src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

// À remplacer par les coordonnées définitives du dojo.
const email = 'contact@example.fr';
const telephone = '00 00 00 00 00';
const adresse = 'Adresse à compléter';
---
<BaseLayout title="Contact">
  <h1>Contact</h1>
  <p>{adresse}</p>
  <p>Téléphone : {telephone}</p>
  <p>
    Email : <a href={`mailto:${email}`}>{email}</a>
  </p>
  <p>
    Envie d’essayer un cours ? Écrivez-nous par email, nous vous
    répondrons avec les modalités du cours d’essai gratuit.
  </p>
</BaseLayout>
```

- [ ] **Step 4: Lancer le test et vérifier qu'il passe**

Run: `npm test -- contact.test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro tests/pages/contact.test.ts
git commit -m "feat: page contact avec lien mailto"
```

---

## Task 13: README et instructions de déploiement

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: rien
- Produces: documentation du projet

- [ ] **Step 1: Écrire `README.md`**

```markdown
# Site vitrine — Dojo Kyokushin + Jujutsu Eskrima

Site statique construit avec [Astro](https://astro.build). Voir le design
complet dans `docs/superpowers/specs/2026-09-09-site-vitrine-dojo-design.md`.

## Développement local

\`\`\`bash
npm install
npm run dev
\`\`\`

Le site est servi sur http://localhost:4321.

## Build

\`\`\`bash
npm run build
npm run preview   # pour prévisualiser le build localement
\`\`\`

## Tests

\`\`\`bash
npm test
\`\`\`

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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: readme avec instructions dev/build/deploiement"
```

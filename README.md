# CV interactif — Alexandre Plana

Ce dépôt contient mon CV interactif, présenté dans une interface inspirée de GitHub. Il rassemble mon parcours professionnel, mes compétences, mes formations et une sélection de projets personnels dans une version bilingue français–anglais.

[Consulter le CV en ligne](https://alexandre-plana.github.io/resume/)

## Fonctionnalités

- parcours professionnel organisé par expériences et missions détaillées ;
- compétences techniques regroupées par domaine ;
- formations et certifications ;
- sélection de projets personnels ;
- affichage bilingue en français et en anglais ;
- mise en page adaptée aux écrans mobiles et aux ordinateurs ;
- version optimisée pour l'impression ;
- export au format Word disponible en environnement de développement ;
- QR code vers la version en ligne.

## Technologies

- React 18
- TypeScript 6
- Vite 8
- CSS Modules
- Zustand
- TanStack Query 5
- `docx` pour la génération du document Word

## Prérequis

- Node.js 20.19 ou version ultérieure, ou Node.js 22.12 ou version ultérieure
- npm 10 ou version ultérieure

## Installation

```bash
git clone https://github.com/alexandre-plana/resume.git
cd resume
npm install
```

## Développement

```bash
npm run dev
```

L'application est alors accessible à l'adresse [http://localhost:5173/resume/](http://localhost:5173/resume/).

## Vérification et compilation

```bash
npm run lint
npm run build
```

Pour prévisualiser la version compilée :

```bash
npm run preview
```

## Organisation du projet

```text
src/
├── api/           # Configuration, services et données locales
├── components/    # Composants React et feuilles de style associées
├── hooks/         # Hooks d'accès aux données
├── locales/       # Traductions françaises et anglaises
├── store/         # État global géré avec Zustand
├── styles/        # Styles globaux, variables et animations
├── types/         # Types TypeScript partagés
├── utils/         # Génération du CV au format Word
└── App.tsx        # Composition principale de l'application
```

## Données

Le CV utilise par défaut les données locales définies dans `src/api/`. Le choix entre ces données et une API distante est configuré dans `src/api/config.ts` :

```typescript
export const USE_MOCK = true
```

L'URL de l'API peut être fournie avec la variable d'environnement `VITE_API_URL` lorsque `USE_MOCK` est désactivé.

## Déploiement

La version publique est hébergée avec GitHub Pages. Le chemin de base `/resume/` est défini dans `vite.config.ts`.

## Assistance par IA

Des outils d'assistance par IA ont été utilisés pour certaines phases de développement, de revue et de rédaction. Les choix techniques et le contenu publié restent vérifiés et maintenus par l'auteur du dépôt.

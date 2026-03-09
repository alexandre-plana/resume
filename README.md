# CV Interactif - Alexandre Plana

Un CV interactif avec design GitHub-themed, construit avec React 18, TypeScript, Vite et CSS Modules.

## Stack Technique

- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Component scoped styling
- **Zustand** - State management
- **TanStack Query v5** - Data fetching & caching

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le serveur démarrera sur `http://localhost:5173`

## Build

```bash
npm run build
```

## Architecture

### Mode Mock-First

Par défaut, l'application utilise des données mockées. Pour basculer vers une API réelle, modifiez `src/api/config.ts` :

```typescript
export const USE_MOCK = false // Change to true for mock data
```

### Structure

```
src/
├── api/           # Services API & mock data
├── components/    # React components
├── hooks/         # Custom hooks
├── store/         # Zustand state management
├── styles/        # Global styles & variables
├── types/         # TypeScript types
└── App.tsx        # Main app component
```

## Fonctionnalités

- ✅ Profil et bio personnalisés
- ✅ Experiences professionnelles avec missions
- ✅ Compétences technologiques avec badges colorés
- ✅ Formation et diplômes
- ✅ Graphique de contributions
- ✅ Feed d'activité récente
- ✅ Design responsive
- ✅ Animations fluides

## Configuration

Créez un fichier `.env` à la racine :

```
VITE_API_URL=http://localhost:3000/api
```

## Licence

MIT

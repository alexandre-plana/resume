# Rapport tâche 5 — Centraliser les fenêtres modales et leurs animations

## Résultat

Le comportement des deux fenêtres modales est maintenant fourni par `Dialog`. Les contenus mission et projet sont isolés dans `MissionDialog` et `ProjectDialog`, et le calcul d’animation est partagé par `getPopoutAnimation`.

## Preuves TDD

- RED : `npm test -- src/components/Dialog.test.tsx src/utils/popoutAnimation.test.ts` a échoué lors de l’ajout des tests, car les imports `./Dialog` et `./popoutAnimation` ne résolvaient aucun module.
- GREEN : le même ciblé passe avec 10 tests (focus initial/restauration, Escape, boucle Tab, clic intérieur/overlay, verrouillage du scroll, fallback et bornes de l’animation).
- La suite complète (`npm test`) compte 30 tests verts et un échec dans le fichier non suivi `src/components/ProjectGallery.test.tsx`, qui attend une fonctionnalité galerie hors périmètre et n’a pas été modifié.

## Fichiers

- Ajout : `src/components/Dialog.tsx`, `Dialog.module.css`, `Dialog.test.tsx`, `MissionDialog.tsx`, `ProjectDialog.tsx`, `src/utils/popoutAnimation.ts` et son test.
- Modification : `src/App.tsx`, `src/components/tabs/PersonalProjectsTab.tsx`, `src/App.module.css`.
- Le dialogue capture l’élément actif, focalise la cible initiale ou le premier contrôle, gère zéro/un/plusieurs contrôles, Escape, le clic overlay strict, le verrouillage/restauration de `body.style.overflow`, puis restitue le focus si l’ouverture est encore connectée.
- Les deux calculs d’animation utilisent une lecture unique de la largeur/hauteur de viewport et bornent `fromScale` à `0.42..0.98`.
- Les écouteurs Escape et overlays locaux ont été supprimés de `App` et `PersonalProjectsTab`; l’assertion `relatedPersonalProject!` a disparu et les styles inline d’en-tête/badge ont été nommés.

## Commandes

- `npm test -- src/components/Dialog.test.tsx src/utils/popoutAnimation.test.ts` — OK, 2 fichiers / 10 tests.
- `npm run lint` — OK.
- `npm run build` — OK; Vite signale seulement le warning préexistant de chunk > 500 kB.
- `npm test` — 8 fichiers / 30 tests OK, 1 test hors tâche en échec (`ProjectGallery.test.tsx`).
- `git diff --check` — OK.
- Recherche statique : un seul `addEventListener('keydown'` et un seul `role="dialog"`, dans `Dialog.tsx`; aucune occurrence dans `App.tsx` ou `PersonalProjectsTab.tsx`.

## Auto-revue et préoccupations

- Les classes d’animation visuelles existantes (`missionModal`, variables `--mission-from-*`, règles d’impression) sont conservées; l’overlay partagé porte les règles communes dans `Dialog.module.css`.
- `src/components/ProjectGallery.test.tsx` et `public/` étaient déjà hors périmètre/non suivis dans l’espace partagé et ne sont pas inclus dans le commit.
- L’échec de la suite complète doit être traité par la tâche qui introduit la galerie; il ne provient pas de cette extraction.

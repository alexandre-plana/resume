# Rapport tâche 6 — panneaux à états discriminés et impression

## Preuve TDD

- RED : `npm test -- src/types/asyncViewState.test.ts src/components/TabPanels.test.tsx` a échoué avant implémentation, les deux modules importés n’existaient pas.
- GREEN : le même ciblage est passé avec 5 tests après implémentation.
- Suite finale : `npm test` — 12 fichiers, 42 tests réussis, dont les 4 tests `ProjectGallery`.

## Implémentation

- Ajout de `AsyncViewState<T>` (`loading | error | ready`) et de `matchAsyncViewState` avec vérification exhaustive.
- Ajout de `TabPanels` et de trois variantes explicites : Overview toujours monté, un seul panneau secondaire actif monté.
- Les trois tabs reçoivent désormais un `state` discriminé; `App` convertit les résultats des queries à la frontière de rendu.
- Les IDs et relations ARIA `tab-*`/`panel-*` sont conservés. Le panneau Overview contient toujours expériences et QR code.
- Ajout des classes `.tabPanel`, `.tabPanelActive`, `.overviewPanel`; l’impression masque les panneaux secondaires et force Overview visible. `.formationsSection` n’est plus un mécanisme d’impression global.
- `Toolbar.handlePrint` reste un appel direct à `window.print()` sans mutation d’onglet.
- Adaptation de l’appel de test de la galerie au nouveau contrat `state`; le comportement des galeries reste couvert et vert.

## Vérifications

- `npm run lint` — 0 erreur, 0 avertissement.
- `npm run build` — TypeScript et Vite réussis; avertissement Vite existant sur le chunk volumineux uniquement.
- Revue DOM ciblée : Overview présent pour `formations` et `personal`; au plus un panneau secondaire monté.

## Auto-revue

- Aucun `any`/`ts-ignore` ajouté.
- Aucun changement de hash, Dialog, galerie ou focus hors migration nécessaire du contrat de tab.
- Le commit contient uniquement la composition discriminée, l’impression et les tests associés.

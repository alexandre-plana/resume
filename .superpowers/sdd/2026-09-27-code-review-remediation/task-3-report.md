# Rapport tâche 3 — Validation Zod et annulation des requêtes

## RED → GREEN

- RED : `npm test -- src/api/services/fetchJson.test.ts` a échoué comme attendu avant l’implémentation, avec `Failed to resolve import "./fetchJson"`.
- GREEN : après l’ajout de Zod, du client HTTP et des services, la même commande a produit `1 passed`, `4 tests passed`.
- Le test couvre le rejet d’un payload invalide, la conservation du statut HTTP, la transmission du signal AbortController et la propagation inchangée d’un `AbortError`.

## Fichiers

- `package.json`, `package-lock.json` : ajout de Zod en dépendance de production (`zod@4.6.5`).
- `src/api/schemas.ts` : schémas Zod du profil, expériences/missions discriminées, compétences, formations, projets personnels et réponse du contact.
- `src/api/services/fetchJson.ts` : client HTTP générique, erreur HTTP avec statut, validation `safeParse`, erreur JSON contrôlée et préservation des erreurs d’annulation.
- `src/api/services/fetchJson.test.ts` : tests du contrat HTTP.
- `src/api/services/apiServices.ts` : cinq GET dédupliqués via `fetchJson`, avec `signal?: AbortSignal`; la réponse du contact est également validée.
- `src/api/mock/mockServices.ts` : signatures alignées avec `signal?: AbortSignal`.
- `src/hooks/useApi.ts` : propagation de `{ signal }` aux cinq services; les `queryFn` retournent uniquement les données distantes et la localisation reste dans les `useMemo`.

## Vérifications

- `npm test` : 4 fichiers, 9 tests passés.
- `npm run lint` : succès, aucune erreur.
- `npx tsc --noEmit --pretty false` et `npx tsc --noEmit -p tsconfig.node.json --pretty false` : succès.
- `npm run build` : succès; sortie Vite générée.
- Recherche `fetch|response.ok|response.json` dans `src/api/services/apiServices.ts` : aucune gestion directe restante.
- `npm ls zod --depth=0` : `zod@4.6.5`.
- `git diff --check` : succès.

## Auto-revue

- Le cache React Query reste indépendant de la langue; aucun `language` n’a été réintroduit dans les clés.
- Les réponses distantes sont validées avant d’atteindre les composants.
- Les variantes de mission restent contraintes par `type`, avec `parentMissionId` obligatoire uniquement pour `projet`.
- Aucun `any`, `ts-ignore` ou désactivation ESLint n’a été ajouté.
- Le POST contact reste temporairement présent pour la tâche 8, mais passe déjà par le même client et un schéma Zod.

## Préoccupations

- Vite signale encore un chunk initial supérieur à 500 kB (`663.43 kB`); le découpage de l’export Word relève de la tâche 7.
- `npm install zod` signale les 5 vulnérabilités déjà reportées par npm (3 moderate, 1 high, 1 critical); aucune correction hors périmètre n’a été appliquée.

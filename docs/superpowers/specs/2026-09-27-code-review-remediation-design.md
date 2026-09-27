# Remédiation de la code review — conception

## Objectif

Le CV doit conserver son apparence et ses contenus tout en corrigeant les défauts fonctionnels constatés : impression incomplète selon l’onglet, navigation clavier impossible, modales sans gestion du focus, langue du document incorrecte, fragments d’URL fragiles, localisation par index et export Word inclus dans le bundle initial.

La correction doit aussi traiter les dettes qui rendent ces défauts difficiles à prévenir : absence de tests, responsabilités concentrées dans `App.tsx`, comportements de dialogue dupliqués, transport et localisation mélangés dans `useApi.ts`, réponses distantes non validées, types métier trop permissifs, parseurs de tags divergents, états de chargement représentés par plusieurs booléens indépendants, état global et composants inutilisés, artefacts TypeScript suivis par Git.

## Découpage retenu

1. Installer Vitest et Testing Library, puis empêcher la compilation de modifier des artefacts suivis.
2. Donner une identité stable aux compétences et formations, typer explicitement leurs variantes métier et séparer le cache réseau de la localisation.
3. Valider les réponses distantes avec Zod et propager les signaux d’annulation de TanStack Query.
4. Corriger la navigation ARIA, la langue du document et le traitement des fragments.
5. Remplacer les deux implémentations de modale par un composant `Dialog` accessible et deux composants de contenu dédiés.
6. Composer les panneaux autour d’un état de données discriminé, garder Aperçu monté pour l’impression et ne monter que le panneau secondaire actif.
7. Charger l’export Word à la demande et partager le tokenizer de marqueurs techniques.
8. Supprimer le formulaire de contact, les toasts et le graphe de contributions inutilisés.
9. Corriger les libellés français et les clés React encore fondées sur des index.
10. Exécuter une recette automatisée et manuelle documentée.

## Choix structurants

La vue imprimable n’effectue aucun changement d’onglet avant `window.print()`. Le panneau Aperçu reste présent dans le DOM; Formations et Projets personnels ne sont montés que lorsqu’ils sont actifs. Les classes d’écran n’affichent que l’onglet choisi, tandis que `@media print` masque le panneau secondaire et affiche explicitement Aperçu. Cette solution évite à la fois le rendu permanent de contenu caché et les courses entre React, `requestAnimationFrame` et l’ouverture du dialogue d’impression.

Les modales restent des composants React fondés sur `role="dialog"`, car leur animation et leur contenu existent déjà. Un composant partagé prend en charge le focus initial, le piège de focus, Échap, le clic sur l’overlay, le blocage du défilement et la restitution du focus.

Les données traduisibles utilisent des identifiants métier. La position d’un élément dans une réponse distante n’a aucune valeur d’identité. Le type d’une formation est une donnée métier (`training` ou `degree`), pas une information à déduire de son libellé traduit. Les missions principales et projets rattachés forment une union discriminée qui rend `parentMissionId` obligatoire uniquement pour un projet. Les réponses de l’API sont validées à la frontière réseau; le reste de l’application peut ensuite travailler avec ces types stricts.

La langue ne fait pas partie de l’identité des données distantes. React Query conserve un cache unique par ressource; la traduction est une transformation locale pure appliquée après la requête. Un changement français–anglais ne doit provoquer aucun nouvel appel HTTP.

Les composants d’onglet ne reçoivent plus trois propriétés indépendantes `data`, `isLoading` et `isError`. Une union discriminée `AsyncViewState<T>` représente exclusivement `loading`, `error` ou `ready`, ce qui interdit les combinaisons impossibles au moment de la compilation.

Le formulaire de contact n’est pas achevé et n’est accessible depuis aucune interface. Il est supprimé plutôt que conservé comme branche morte. Sa réintroduction devra faire l’objet d’une fonctionnalité complète avec transport, états d’envoi, retours utilisateur et protection contre les abus.

## Critères d’acceptation

- Les trois onglets sont accessibles et activables au clavier selon le motif ARIA Tabs.
- Une modale capture le focus, ferme sur Échap et rend le focus à sa carte d’origine.
- `<html lang>` vaut `fr` ou `en` selon la langue affichée.
- Un fragment mal formé ne provoque aucune exception; un fragment valide sélectionne le projet attendu.
- L’aperçu avant impression contient les expériences et le QR code depuis les trois onglets.
- Une réponse API invalide produit une erreur contrôlée avant d’atteindre les composants.
- Réordonner les compétences ou formations ne change pas l’association des traductions.
- Changer de langue ne relance aucune requête distante déjà mise en cache.
- Le filtrage Formation/Diplôme repose sur `Formation.kind`, jamais sur une chaîne traduite.
- Un projet rattaché ne peut pas être construit sans `parentMissionId`, et une mission principale ne peut pas recevoir ce champ.
- Un panneau ne peut pas recevoir simultanément des états chargement et erreur.
- Le chunk initial de production ne contient aucun marqueur du format Word OOXML.
- `npm test`, `npm run lint`, `npm run build` et `npm run check:bundle` réussissent.
- Une compilation ne modifie aucun fichier suivi par Git.

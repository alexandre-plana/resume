# Living Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Execution inline, authorized by the user's complete implementation brief.

**Goal:** Transformer le CV en portfolio interactif bilingue, en conservant le parcours et le CV classique.
**Architecture:** Nouveau Portfolio utilisant les hooks existants. Démonstrations indépendantes, scène WebGL différée, ancien App conservé pour le CV.
**Tech Stack:** React, TypeScript, Motion, Three.js, CSS, SVG, Vite.
**Spec:** docs/superpowers/specs/2026-10-17-living-portfolio-design.md

## Global Constraints
- Données professionnelles et traductions existantes conservées.
- Toutes les démonstrations identifiées comme simulations.
- GitHub Pages `/resume/`, aucun backend requis.
- Clavier, tactile et mouvement réduit ; accès immédiat au CV.

## Review Focus
- Changement de langue pendant une interaction et une fiche ouverte.
- Pipeline interrompu / relancé et scénario sans finding.
- Retour au CV classique et impression de tout le parcours.
- Absence de WebGL et arrêt des animations hors écran.
- Petite largeur et focus après fermeture des fiches.

### Task 1: Simulations
**Files:** src/portfolio/Labs.tsx, simulation.ts, simulation.test.ts, Labs.test.tsx, OrbitScene.tsx.
**Interfaces:** Labs reçoit `language: 'fr' | 'en'` et `paused: boolean`. Fonctions pures `vesselPosition(index, time)` et `workflowSteps(withFinding)`.
- [ ] Écrire et exécuter les tests des positions reproductibles et du workflow (finding bloque acceptation avant correction).
- [ ] Réaliser les quatre démonstrations et leurs contrôles accessibles.
- [ ] Vérifier les sélections, le rejeu, la réinitialisation et le scénario sans finding.

### Task 2: Portfolio
**Files:** src/portfolio/Portfolio.tsx, portfolio.css, Portfolio.test.tsx, src/main.tsx, src/components/Toolbar.tsx, index.html.
**Interfaces:** Portfolio utilise les hooks existants ; App demeure le CV classique ; `?view=cv` sélectionne le CV.
- [ ] Tester le changement de langue, l’accès au CV et l’affichage des données.
- [ ] Construire identité, navigation, hero, laboratoires, méthode, parcours complet, compétences, formations et contact.
- [ ] Préserver fiches et médias, importer le CV et Three.js à la demande.
- [ ] Rendre le téléchargement Word disponible en production.

### Task 3: Vérification
**Files:** docs/verification/living-portfolio.md.
- [ ] Exécuter `npm test`, `npm run lint`, `npm run check:bundle`.
- [ ] Examiner le rendu et manipuler chaque laboratoire dans le navigateur.
- [ ] Corriger les défauts relevés et noter les limites de vérification.

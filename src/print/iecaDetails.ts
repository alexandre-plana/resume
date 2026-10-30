import type { Language } from '../locales'

export interface DetailBlock {
  title: string
  text: string
}

export interface IecaDetails {
  intro: string
  modules: DetailBlock[]
  foundation: DetailBlock[]
  quality: string
  qualityStack: string[]
  ipSprint: string
  ipSprintStack: string[]
}

// Drawn from the IECA source archives (alexandre-plana/archives-ieca) and the IP Sprint repositories.
// Repository-wide figures (test files, CI) describe the modules, not a personal count.
export const IECA_DETAILS: Record<Language, IecaDetails> = {
  fr: {
    intro:
      'IECA réunit une quinzaine d’applications Vue 3 chargées par single-spa dans un shell commun, et des micro-services Go bâtis sur EdgeX. Chaque micro-frontend suit le même socle : Pinia, Vue Router, services d’accès aux données typés, formulaires validés avec vee-validate et yup, styles Tailwind isolés par préfixe.',
    modules: [
      {
        title: 'Connectivité',
        text: 'Connecteurs OT/IT et leurs interfaces, groupes d’acquisition (période, démarrage/arrêt, état), variables et actions, grille d’édition et import de variables avec rapport d’erreurs.',
      },
      {
        title: 'Calculs',
        text: 'Variables calculées construites pas à pas : propriétés, formule, puis fenêtre temporelle glissante ou fixe avec agrégation, ou déclenchement sur changement.',
      },
      {
        title: 'Conditions',
        text: 'Éditeur de règles Si/Alors : choix du type d’action, niveau de qualité des données et indicateur de sévérité.',
      },
      {
        title: 'Alertes & scripting',
        text: 'Tableau et détail des alertes avec leur état et leur activité ; scripts JavaScript édités dans Monaco, suivi des exécutions et regroupement des journaux multilignes.',
      },
    ],
    foundation: [
      {
        title: 'Table configurable',
        text: 'Composant générique typé : colonnes déclaratives (chemin de propriété, largeur, ordre de tri métier), cellules intégrées ou personnalisées, tri ascendant/descendant/neutre, sélection multiple, actions, squelettes de chargement et état vide.',
      },
      {
        title: 'Sélecteur de propriétés',
        text: 'Recherche, filtres par source et par type de donnée, tri, limite de sélection, mode source/destination et prise en compte des licences et des droits d’écriture.',
      },
      {
        title: 'Socle de routage',
        text: 'Routes filtrées selon les droits d’écriture, gardes de navigation et fil d’Ariane déclaré dans les métadonnées des routes.',
      },
      {
        title: 'Librairie partagée',
        text: '@ieca/ieca-web-utils, publiée sur un registre npm interne : composants globaux, stores Pinia communs, intercepteurs axios, gestion d’erreurs et mocks partagés pour les tests.',
      },
    ],
    quality:
      'Les modules de connectivité, de calcul, de conditions, d’alertes, de scripting et la librairie partagée totalisent près de 300 fichiers de tests Jest (Vue Test Utils, @pinia/testing, axios-mock-adapter). Chaque dépôt passe par une CI GitHub Actions avec analyse SonarQube et Coverity, puis est livré en image Docker nginx ; un serveur de mocks permet de développer chaque micro-frontend isolément.',
    qualityStack: ['Jest', 'Vue Test Utils', 'SonarQube', 'Coverity', 'GitHub Actions', 'Docker', 'pnpm'],
    ipSprint:
      'Prototypes d’application mobile réalisés pendant un IP Sprint en 2024 : version mobile de la gestion des données d’IECA, avec Capacitor pour Android et iOS puis Quasar, et expérimentation d’un shell mobile capable de charger des micro-frontends single-spa.',
    ipSprintStack: ['Vue 3', 'Capacitor', 'Quasar', 'Android', 'iOS', 'single-spa'],
  },
  en: {
    intro:
      'IECA brings together some fifteen Vue 3 applications loaded by single-spa into a common shell, alongside Go microservices built on EdgeX. Every micro-frontend shares the same foundation: Pinia, Vue Router, typed data-access services, forms validated with vee-validate and yup, and Tailwind styles isolated by prefix.',
    modules: [
      {
        title: 'Connectivity',
        text: 'OT/IT connectors and their interfaces, acquisition groups (period, start/stop, status), variables and actions, an editable grid and variable import with an error report.',
      },
      {
        title: 'Computations',
        text: 'Computed variables built step by step: properties, formula, then a sliding or tumbling time window with aggregation, or an on-change trigger.',
      },
      {
        title: 'Conditions',
        text: 'If/Then rule editor: action type selection, data quality level and severity indicator.',
      },
      {
        title: 'Alerts & scripting',
        text: 'Alert table and detail view with state and activity; JavaScript scripts edited in Monaco, execution tracking and grouping of multi-line logs.',
      },
    ],
    foundation: [
      {
        title: 'Configurable table',
        text: 'Generic typed component: declarative columns (property path, width, business sort order), built-in or custom cells, ascending/descending/neutral sorting, multi-selection, actions, loading skeletons and empty state.',
      },
      {
        title: 'Property selector',
        text: 'Search, filters by source and data type, sorting, selection limit, source/destination mode and license and write-permission checks.',
      },
      {
        title: 'Routing foundation',
        text: 'Routes filtered by write permissions, navigation guards and breadcrumbs declared in route metadata.',
      },
      {
        title: 'Shared library',
        text: '@ieca/ieca-web-utils, published to an internal npm registry: global components, common Pinia stores, axios interceptors, error handling and shared test mocks.',
      },
    ],
    quality:
      'The connectivity, computation, condition, alert and scripting modules and the shared library add up to nearly 300 Jest test files (Vue Test Utils, @pinia/testing, axios-mock-adapter). Every repository runs through GitHub Actions CI with SonarQube and Coverity analysis and ships as an nginx Docker image; a mock server lets each micro-frontend be developed in isolation.',
    qualityStack: ['Jest', 'Vue Test Utils', 'SonarQube', 'Coverity', 'GitHub Actions', 'Docker', 'pnpm'],
    ipSprint:
      'Mobile application prototypes built during a 2024 IP Sprint: a mobile version of IECA data management, using Capacitor for Android and iOS and then Quasar, and an experimental mobile shell able to load single-spa micro-frontends.',
    ipSprintStack: ['Vue 3', 'Capacitor', 'Quasar', 'Android', 'iOS', 'single-spa'],
  },
}

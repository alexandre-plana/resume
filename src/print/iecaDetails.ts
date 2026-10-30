import type { Language } from '../locales'

export interface DetailBlock {
  repo: string
  title: string
  text: string
  tags?: string[]
}

export interface IecaDetails {
  intro: string
  modules: DetailBlock[]
  foundation: DetailBlock[]
  other: DetailBlock[]
}

// Drawn from the IECA source archives (alexandre-plana/archives-ieca) and the IP Sprint repositories.
// Repository-wide figures (test files, CI) describe the modules, not a personal count.
// Texts keep #tech tags, rendered inline like on the online resume.
export const IECA_DETAILS: Record<Language, IecaDetails> = {
  fr: {
    intro:
      'IECA réunit une quinzaine d’applications #vue3 chargées par #single-spa dans un shell commun, et des micro-services #go bâtis sur EdgeX. Chaque micro-frontend suit le même socle : #pinia, Vue Router, services d’accès aux données typés en #typescript, formulaires validés avec vee-validate et yup, styles #tailwind isolés par préfixe.',
    modules: [
      {
        repo: 'ieca-connectivity-ui',
        title: 'Connectivité',
        text: 'Connecteurs OT/IT et leurs interfaces, groupes d’acquisition (période, démarrage/arrêt, état), variables et actions, grille d’édition et import de variables avec rapport d’erreurs.',
      },
      {
        repo: 'ieca-computation-ui',
        title: 'Calculs',
        text: 'Variables calculées construites pas à pas : propriétés, formule, puis fenêtre temporelle glissante ou fixe avec agrégation, ou déclenchement sur changement.',
      },
      {
        repo: 'ieca-condition-ui',
        title: 'Conditions',
        text: 'Éditeur de règles Si/Alors : choix du type d’action, niveau de qualité des données et indicateur de sévérité.',
      },
      {
        repo: 'ieca-alert-manager-ui',
        title: 'Alertes',
        text: 'Tableau et détail des alertes avec leur état et leur activité, en-tête et dialogues de confirmation.',
      },
      {
        repo: 'ieca-scripting-ui',
        title: 'Scripting',
        text: 'Scripts JavaScript édités dans Monaco, suivi des exécutions, regroupement des journaux multilignes, gardes de navigation et fil d’Ariane.',
      },
    ],
    foundation: [
      {
        repo: 'ieca-web-utils · MainTable',
        title: 'Table configurable',
        text: 'Composant générique typé : colonnes déclaratives (chemin de propriété, largeur, ordre de tri métier), cellules intégrées ou personnalisées, tri ascendant/descendant/neutre, sélection multiple, actions, squelettes de chargement et état vide.',
      },
      {
        repo: 'ieca-web-utils · PropertiesPicker',
        title: 'Sélecteur de propriétés',
        text: 'Recherche, filtres par source et par type de donnée, tri, limite de sélection, mode source/destination et prise en compte des licences et des droits d’écriture.',
      },
      {
        repo: 'ieca-vue3-ui-template',
        title: 'Socle de routage',
        text: 'Routes filtrées selon les droits d’écriture, gardes de navigation et fil d’Ariane déclaré dans les métadonnées des routes.',
      },
      {
        repo: '@ieca/ieca-web-utils',
        title: 'Librairie partagée',
        text: 'Publiée sur un registre #npm interne : composants globaux, stores #pinia communs, intercepteurs axios, gestion d’erreurs et mocks partagés pour les tests.',
      },
    ],
    other: [
      {
        repo: '.github/workflows',
        title: 'Qualité & industrialisation',
        text: 'Les modules de connectivité, de calcul, de conditions, d’alertes, de scripting et la librairie partagée totalisent près de 300 fichiers de tests #jest. Chaque dépôt passe par une CI GitHub Actions avec analyse #sonarqube et Coverity, puis est livré en image #docker nginx.',
        tags: ['jest', 'vue test utils', 'sonarqube', 'docker'],
      },
      {
        repo: 'alexandre-plana/ip-sprint-*',
        title: 'IP Sprint — prototypes mobiles (2024)',
        text: 'Version mobile de la gestion des données d’IECA, avec Capacitor pour #android et iOS puis Quasar, et expérimentation d’un shell mobile capable de charger des micro-frontends #single-spa.',
        tags: ['vue3', 'capacitor', 'quasar', 'mobile'],
      },
    ],
  },
  en: {
    intro:
      'IECA brings together some fifteen #vue3 applications loaded by #single-spa into a common shell, alongside #go microservices built on EdgeX. Every micro-frontend shares the same foundation: #pinia, Vue Router, typed #typescript data-access services, forms validated with vee-validate and yup, and #tailwind styles isolated by prefix.',
    modules: [
      {
        repo: 'ieca-connectivity-ui',
        title: 'Connectivity',
        text: 'OT/IT connectors and their interfaces, acquisition groups (period, start/stop, status), variables and actions, an editable grid and variable import with an error report.',
      },
      {
        repo: 'ieca-computation-ui',
        title: 'Computations',
        text: 'Computed variables built step by step: properties, formula, then a sliding or tumbling time window with aggregation, or an on-change trigger.',
      },
      {
        repo: 'ieca-condition-ui',
        title: 'Conditions',
        text: 'If/Then rule editor: action type selection, data quality level and severity indicator.',
      },
      {
        repo: 'ieca-alert-manager-ui',
        title: 'Alerts',
        text: 'Alert table and detail view with state and activity, header and confirmation dialogs.',
      },
      {
        repo: 'ieca-scripting-ui',
        title: 'Scripting',
        text: 'JavaScript scripts edited in Monaco, execution tracking, grouping of multi-line logs, navigation guards and breadcrumbs.',
      },
    ],
    foundation: [
      {
        repo: 'ieca-web-utils · MainTable',
        title: 'Configurable table',
        text: 'Generic typed component: declarative columns (property path, width, business sort order), built-in or custom cells, ascending/descending/neutral sorting, multi-selection, actions, loading skeletons and empty state.',
      },
      {
        repo: 'ieca-web-utils · PropertiesPicker',
        title: 'Property selector',
        text: 'Search, filters by source and data type, sorting, selection limit, source/destination mode and license and write-permission checks.',
      },
      {
        repo: 'ieca-vue3-ui-template',
        title: 'Routing foundation',
        text: 'Routes filtered by write permissions, navigation guards and breadcrumbs declared in route metadata.',
      },
      {
        repo: '@ieca/ieca-web-utils',
        title: 'Shared library',
        text: 'Published to an internal #npm registry: global components, common #pinia stores, axios interceptors, error handling and shared test mocks.',
      },
    ],
    other: [
      {
        repo: '.github/workflows',
        title: 'Quality & delivery',
        text: 'The connectivity, computation, condition, alert and scripting modules and the shared library add up to nearly 300 #jest test files. Every repository runs through GitHub Actions CI with #sonarqube and Coverity analysis and ships as an nginx #docker image.',
        tags: ['jest', 'vue test utils', 'sonarqube', 'docker'],
      },
      {
        repo: 'alexandre-plana/ip-sprint-*',
        title: 'IP Sprint — mobile prototypes (2024)',
        text: 'A mobile version of IECA data management, using Capacitor for #android and iOS and then Quasar, and an experimental mobile shell able to load #single-spa micro-frontends.',
        tags: ['vue3', 'capacitor', 'quasar', 'mobile'],
      },
    ],
  },
}

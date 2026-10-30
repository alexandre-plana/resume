import type { Language } from '../locales'

export interface DetailBlock {
  repo: string
  title: string
  text: string
  tags?: string[]
}

export interface DetailGroup {
  title: string
  blocks: DetailBlock[]
}

export interface IecaDetails {
  intro: string
  groups: DetailGroup[]
}

// Drawn from the IECA source archives (alexandre-plana/archives-ieca, one row per front-end repository)
// and the IP Sprint work. Every micro-frontend is Vue 3, so each row's chips start with it.
export const IECA_DETAILS: Record<Language, IecaDetails> = {
  fr: {
    intro:
      'Tous en #vue3 et #typescript, chargés comme applications #single-spa, avec #pinia, Vue Router et le design system Quartz de Schneider Electric. Les applications récentes partagent la même architecture : composants container/présentation, mappers typés entre API et modèle, un store par domaine et des formulaires validés avec vee-validate et yup ou zod.',
    groups: [
      {
        title: 'Socle partagé',
        blocks: [
          {
            repo: '@ieca/ieca-web-utils',
            title: 'Bibliothèque partagée',
            text: 'Table configurable, sélecteur de propriétés, assistant en étapes, en-tête avec fil d’Ariane, dialogues ; stores communs, client HTTP, typages et utilitaires de test.',
            tags: ['vue3', 'typescript', 'tailwind', 'npm'],
          },
          {
            repo: 'ieca-vue3-ui-template',
            title: 'Gabarit de micro-frontend',
            text: 'Point de départ des nouvelles applications : routeur filtré selon les droits, stores communs, configuration single-spa et tests.',
            tags: ['vue3', 'single-spa'],
          },
        ],
      },
      {
        title: 'Données & connectivité',
        blocks: [
          {
            repo: 'ieca-connectivity-ui',
            title: 'Connectivité OT/IT',
            text: 'L’application la plus volumineuse : connecteurs OPC UA et Modbus configurés par formulaires générés, grille d’édition des variables, import CSV, interfaces et groupes IT.',
            tags: ['vue3', 'ag-grid', 'monaco', 'tailwind'],
          },
          {
            repo: 'ieca-data-management-ui',
            title: 'Gestion des données',
            text: 'Arbre du modèle de données filtrable, propriétés et leurs affectations, import, historique exportable et écriture de valeurs.',
            tags: ['vue3', 'monaco', 'tailwind'],
          },
          {
            repo: 'ieca-datamodel-ui',
            title: 'Modèle de données',
            text: 'Éditeur arborescent du modèle : niveaux, association de propriétés et import ; réécriture de l’ancienne application vers la nouvelle API.',
            tags: ['vue3', 'tailwind'],
          },
        ],
      },
      {
        title: 'Traitements & supervision',
        blocks: [
          {
            repo: 'ieca-computation-ui',
            title: 'Calculs',
            text: 'Variables calculées créées en étapes : propriétés, formule validée côté serveur avec catalogue de fonctions, fenêtre temporelle glissante ou fixe.',
            tags: ['vue3', 'typescript'],
          },
          {
            repo: 'ieca-condition-ui',
            title: 'Conditions',
            text: 'Règles Si/Alors en étapes : propriétés et niveau de qualité, formule validée, puis action (application, commande ou script).',
            tags: ['vue3', 'typescript'],
          },
          {
            repo: 'ieca-scripting-ui',
            title: 'Scripting',
            text: 'Scripts édités dans Monaco avec suggestions, lancés ou annulés ; exécutions et journaux analysés ; navigation protégée selon les droits.',
            tags: ['vue3', 'monaco'],
          },
          {
            repo: 'ieca-alert-manager-ui',
            title: 'Alertes',
            text: 'Liste et historique des alertes, acquittement et clôture, suppression groupée et export CSV.',
            tags: ['vue3', 'typescript'],
          },
        ],
      },
      {
        title: 'Administration de la plateforme',
        blocks: [
          {
            repo: 'ieca-platform-configuration-ui',
            title: 'Configuration',
            text: 'Certificat du serveur, occupation disque, export et import de la configuration, paramètres des applications par formulaires générés.',
            tags: ['vue3', 'tailwind'],
          },
          {
            repo: 'ieca-mail-ui',
            title: 'Messagerie SMTP',
            text: 'Configuration du serveur SMTP avec vérification du certificat et envoi d’un message de test.',
            tags: ['vue3', 'typescript'],
          },
          {
            repo: 'ieca-overview-ui',
            title: 'Vue d’ensemble',
            text: 'Applications Edge installées, avec leur éditeur et leur licence.',
            tags: ['vue3', 'tailwind'],
          },
        ],
      },
      {
        title: 'Prototypes',
        blocks: [
          {
            repo: 'schneider-electric/ieca-ip-sprint',
            title: 'IP Sprint · données sur mobile · 2024',
            text: 'Gestion des données d’IECA sur mobile, avec Capacitor puis Quasar pour Android et iOS.',
            tags: ['vue3', 'capacitor', 'mobile'],
          },
          {
            repo: 'schneider-electric/ieca-ip-sprint',
            title: 'IP Sprint · notifications d’astreinte',
            text: 'Alertes d’IECA relayées vers une application mobile dédiée, sous forme de notifications push pour les opérateurs d’astreinte.',
            tags: ['mobile'],
          },
        ],
      },
    ],
  },
  en: {
    intro:
      'All in #vue3 and #typescript, loaded as #single-spa applications, with #pinia, Vue Router and Schneider Electric’s Quartz design system. The newer applications share one architecture: container/presentational components, typed API-to-model mappers, one store per domain and forms validated with vee-validate and yup or zod.',
    groups: [
      {
        title: 'Shared foundation',
        blocks: [
          {
            repo: '@ieca/ieca-web-utils',
            title: 'Shared library',
            text: 'Configurable table, property selector, step wizard, breadcrumb header, dialogs; common stores, HTTP client, typings and test utilities.',
            tags: ['vue3', 'typescript', 'tailwind', 'npm'],
          },
          {
            repo: 'ieca-vue3-ui-template',
            title: 'Micro-frontend template',
            text: 'Starting point for new applications: rights-aware router, common stores, single-spa setup and tests.',
            tags: ['vue3', 'single-spa'],
          },
        ],
      },
      {
        title: 'Data & connectivity',
        blocks: [
          {
            repo: 'ieca-connectivity-ui',
            title: 'OT/IT connectivity',
            text: 'The largest application: OPC UA and Modbus connectors configured through generated forms, a variable-editing grid, CSV import, IT interfaces and groups.',
            tags: ['vue3', 'ag-grid', 'monaco', 'tailwind'],
          },
          {
            repo: 'ieca-data-management-ui',
            title: 'Data management',
            text: 'Filterable data-model tree, properties and their assignments, import, exportable history and value writes.',
            tags: ['vue3', 'monaco', 'tailwind'],
          },
          {
            repo: 'ieca-datamodel-ui',
            title: 'Data model',
            text: 'Tree editor for the model: levels, property mapping and import; a rewrite of the former application for the new API.',
            tags: ['vue3', 'tailwind'],
          },
        ],
      },
      {
        title: 'Processing & monitoring',
        blocks: [
          {
            repo: 'ieca-computation-ui',
            title: 'Computations',
            text: 'Computed variables created step by step: properties, server-validated formula with a function catalog, sliding or tumbling time window.',
            tags: ['vue3', 'typescript'],
          },
          {
            repo: 'ieca-condition-ui',
            title: 'Conditions',
            text: 'If/Then rules step by step: properties and quality level, validated formula, then an action (application, command or script).',
            tags: ['vue3', 'typescript'],
          },
          {
            repo: 'ieca-scripting-ui',
            title: 'Scripting',
            text: 'Scripts edited in Monaco with suggestions, run or cancelled; executions and parsed logs; rights-aware navigation.',
            tags: ['vue3', 'monaco'],
          },
          {
            repo: 'ieca-alert-manager-ui',
            title: 'Alerts',
            text: 'Alert list and history, acknowledgement and closing, bulk deletion and CSV export.',
            tags: ['vue3', 'typescript'],
          },
        ],
      },
      {
        title: 'Platform administration',
        blocks: [
          {
            repo: 'ieca-platform-configuration-ui',
            title: 'Configuration',
            text: 'Server certificate, disk usage, configuration export and import, application settings through generated forms.',
            tags: ['vue3', 'tailwind'],
          },
          {
            repo: 'ieca-mail-ui',
            title: 'SMTP mail',
            text: 'SMTP server configuration with certificate checks and a test message.',
            tags: ['vue3', 'typescript'],
          },
          {
            repo: 'ieca-overview-ui',
            title: 'Overview',
            text: 'Installed Edge applications with their provider and license.',
            tags: ['vue3', 'tailwind'],
          },
        ],
      },
      {
        title: 'Prototypes',
        blocks: [
          {
            repo: 'schneider-electric/ieca-ip-sprint',
            title: 'IP Sprint · data on mobile · 2024',
            text: 'IECA data management on mobile, with Capacitor then Quasar for Android and iOS.',
            tags: ['vue3', 'capacitor', 'mobile'],
          },
          {
            repo: 'schneider-electric/ieca-ip-sprint',
            title: 'IP Sprint · on-call notifications',
            text: 'IECA alerts relayed to a dedicated mobile app as push notifications for on-call operators.',
            tags: ['mobile'],
          },
        ],
      },
    ],
  },
}

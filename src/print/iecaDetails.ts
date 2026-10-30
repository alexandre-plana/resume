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

// Drawn from the IECA source archives (alexandre-plana/archives-ieca, one card per front-end repository)
// and the IP Sprint repositories.
// Texts keep #tech tags, rendered inline like on the online resume.
export const IECA_DETAILS: Record<Language, IecaDetails> = {
  fr: {
    intro:
      'J’ai travaillé sur chacun des micro-frontends ci-dessous, tous développés en #vue3 et #typescript et chargés comme applications #single-spa, avec #pinia, Vue Router et le design system Quartz de Schneider Electric. Les applications récentes partagent la même architecture : composants container/présentation, mappers DTO → modèle typés, un store par domaine et des formulaires validés avec vee-validate et yup ou zod.',
    groups: [
      {
        title: 'Socle partagé',
        blocks: [
          {
            repo: '@ieca/ieca-web-utils',
            title: 'Librairie partagée',
            text: 'Composants MainTable, PropertiesPicker, Stepper, RoutableHeader avec fil d’Ariane, dialogues d’import et de confirmation, zone de dépôt ; stores communs (dialogues, notifications, droits, registre d’applications) ; client HTTP avec intercepteurs ; paquets de typages et d’utilitaires de test.',
            tags: ['vue3', 'typescript', 'tailwind', 'axios', 'npm'],
          },
          {
            repo: 'ieca-vue3-ui-template',
            title: 'Gabarit de micro-frontend',
            text: 'Point de départ des nouvelles applications : routeur filtré selon les droits d’écriture, stores de dialogues, notifications et droits, configuration #single-spa et #jest.',
            tags: ['vue3', 'single-spa', 'jest'],
          },
        ],
      },
      {
        title: 'Données & connectivité',
        blocks: [
          {
            repo: 'ieca-connectivity-ui',
            title: 'Connectivité OT/IT',
            text: 'La plus grosse application (96 composants) : connecteurs OPC UA et Modbus créés, dupliqués et configurés par formulaires générés, variables éditées dans une grille ag-grid aux cellules dynamiques, import CSV, actions, et parcours interfaces → groupes → propriétés côté IT.',
            tags: ['vue3', 'ag-grid', 'monaco', 'yup', 'tailwind'],
          },
          {
            repo: 'ieca-data-management-ui',
            title: 'Gestion des données',
            text: 'Arbre du modèle de données filtrable (filtre conservé en session), propriétés et leurs affectations (variable, calcul, source), ajout de propriétés et de niveaux, import, historique exportable et écriture de valeurs.',
            tags: ['vue3', 'monaco', 'yup', 'tailwind'],
          },
          {
            repo: 'ieca-datamodel-ui',
            title: 'Modèle de données',
            text: 'Éditeur arborescent du modèle de données : création et suppression de niveaux, association de propriétés via PropertiesPicker, import. Réécriture de l’ancienne application (actifs et équipements) vers la nouvelle API.',
            tags: ['vue3', 'pinia', 'tailwind'],
          },
        ],
      },
      {
        title: 'Traitements & supervision',
        blocks: [
          {
            repo: 'ieca-computation-ui',
            title: 'Calculs',
            text: 'Variables calculées lancées ou arrêtées depuis la liste ; assistant en étapes : propriétés, formule validée côté serveur avec catalogue de fonctions, puis fenêtre temporelle glissante ou fixe, avec aperçus.',
            tags: ['vue3', 'typescript', 'pinia'],
          },
          {
            repo: 'ieca-condition-ui',
            title: 'Conditions',
            text: 'Règles Si/Alors construites en étapes : propriétés et niveau de qualité, formule validée côté serveur, puis action (application, commande ou script) ; transformation de JSON Schema pour les paramètres.',
            tags: ['vue3', 'typescript', 'json schema'],
          },
          {
            repo: 'ieca-scripting-ui',
            title: 'Scripting',
            text: 'Scripts créés par formulaire généré et édités dans Monaco avec suggestions, activés, lancés ou annulés ; exécutions et journaux analysés ; gardes de navigation pour les droits et l’édition.',
            tags: ['vue3', 'monaco', 'cron', 'yup'],
          },
          {
            repo: 'ieca-alert-manager-ui',
            title: 'Alertes',
            text: 'Liste des alertes et historique d’activité, acquittement et clôture, suppression groupée par JSON Patch et export CSV.',
            tags: ['vue3', 'typescript', 'floating-vue'],
          },
        ],
      },
      {
        title: 'Administration de la plateforme',
        blocks: [
          {
            repo: 'ieca-platform-configuration-ui',
            title: 'Configuration de la plateforme',
            text: 'Certificat et clé du serveur, occupation disque de la base, export et import de la configuration avec rapport d’erreurs, paramètres des applications par formulaires générés.',
            tags: ['vue3', 'monaco', 'yup', 'tailwind'],
          },
          {
            repo: 'ieca-mail-ui',
            title: 'Messagerie SMTP',
            text: 'Configuration du serveur SMTP (hôte, sécurité, identifiants, certificat vérifié avec node-forge) et envoi d’un message de test avec état de connexion.',
            tags: ['vue3', 'typescript', 'node-forge'],
          },
          {
            repo: 'ieca-overview-ui',
            title: 'Vue d’ensemble',
            text: 'Page « Applications » : cartes des applications Edge installées avec leur éditeur et leur licence.',
            tags: ['vue3', 'tailwind'],
          },
        ],
      },
      {
        title: 'Prototypes',
        blocks: [
          {
            repo: 'alexandre-plana/ip-sprint-*',
            title: 'IP Sprint — données sur mobile (2024)',
            text: 'Version mobile de la gestion des données d’IECA, avec Capacitor pour #android et iOS puis Quasar, et expérimentation d’un shell mobile capable de charger des micro-frontends #single-spa.',
            tags: ['vue3', 'capacitor', 'quasar', 'mobile'],
          },
          {
            repo: 'ip-sprint · notifications',
            title: 'IP Sprint — notifications d’astreinte',
            text: 'Prototype qui fait sortir les alertes d’IECA de la plateforme : elles alimentent un flux dédié au mobile et deviennent des notifications push, reçues sur une application mobile conçue pour l’occasion, par exemple par un opérateur d’astreinte.',
            tags: ['mobile', 'notifications push'],
          },
        ],
      },
    ],
  },
  en: {
    intro:
      'I worked on each of the micro-frontends below, all built with #vue3 and #typescript and loaded as #single-spa applications, with #pinia, Vue Router and Schneider Electric’s Quartz design system. The newer applications share one architecture: container/presentational components, typed DTO-to-model mappers, one store per domain and forms validated with vee-validate and yup or zod.',
    groups: [
      {
        title: 'Shared foundation',
        blocks: [
          {
            repo: '@ieca/ieca-web-utils',
            title: 'Shared library',
            text: 'MainTable, PropertiesPicker, Stepper, RoutableHeader with breadcrumbs, import and confirmation dialogs, drop zone; common stores (dialogs, notifications, rights, application registry); HTTP client with interceptors; typings and test-utility packages.',
            tags: ['vue3', 'typescript', 'tailwind', 'axios', 'npm'],
          },
          {
            repo: 'ieca-vue3-ui-template',
            title: 'Micro-frontend template',
            text: 'Starting point for new applications: router filtered by write permissions, dialog, notification and rights stores, #single-spa and #jest setup.',
            tags: ['vue3', 'single-spa', 'jest'],
          },
        ],
      },
      {
        title: 'Data & connectivity',
        blocks: [
          {
            repo: 'ieca-connectivity-ui',
            title: 'OT/IT connectivity',
            text: 'The largest application (96 components): OPC UA and Modbus connectors created, duplicated and configured through generated forms, variables edited in an ag-grid with dynamic cells, CSV import, actions, and interfaces → groups → properties on the IT side.',
            tags: ['vue3', 'ag-grid', 'monaco', 'yup', 'tailwind'],
          },
          {
            repo: 'ieca-data-management-ui',
            title: 'Data management',
            text: 'Filterable data-model tree (filter kept in session), properties and their assignments (variable, computation, source), adding properties and levels, import, exportable history and value writes.',
            tags: ['vue3', 'monaco', 'yup', 'tailwind'],
          },
          {
            repo: 'ieca-datamodel-ui',
            title: 'Data model',
            text: 'Tree editor for the data model: creating and deleting levels, mapping properties through PropertiesPicker, import. A rewrite of the former assets-and-devices application for the new API.',
            tags: ['vue3', 'pinia', 'tailwind'],
          },
        ],
      },
      {
        title: 'Processing & monitoring',
        blocks: [
          {
            repo: 'ieca-computation-ui',
            title: 'Computations',
            text: 'Computed variables started or stopped from the list; step-by-step wizard: properties, formula validated server-side with a function catalog, then a sliding or tumbling time window, with previews.',
            tags: ['vue3', 'typescript', 'pinia'],
          },
          {
            repo: 'ieca-condition-ui',
            title: 'Conditions',
            text: 'If/Then rules built step by step: properties and quality level, formula validated server-side, then an action (application, command or script); JSON Schema transformation for parameters.',
            tags: ['vue3', 'typescript', 'json schema'],
          },
          {
            repo: 'ieca-scripting-ui',
            title: 'Scripting',
            text: 'Scripts created through a generated form and edited in Monaco with suggestions, enabled, run or cancelled; executions and parsed logs; navigation guards for rights and editing.',
            tags: ['vue3', 'monaco', 'cron', 'yup'],
          },
          {
            repo: 'ieca-alert-manager-ui',
            title: 'Alerts',
            text: 'Alert list and activity history, acknowledgement and closing, bulk deletion through JSON Patch and CSV export.',
            tags: ['vue3', 'typescript', 'floating-vue'],
          },
        ],
      },
      {
        title: 'Platform administration',
        blocks: [
          {
            repo: 'ieca-platform-configuration-ui',
            title: 'Platform configuration',
            text: 'Server certificate and key, database disk usage, configuration export and import with an error report, application settings through generated forms.',
            tags: ['vue3', 'monaco', 'yup', 'tailwind'],
          },
          {
            repo: 'ieca-mail-ui',
            title: 'SMTP mail',
            text: 'SMTP server configuration (host, security, credentials, certificate checked with node-forge) and a test message with connection status.',
            tags: ['vue3', 'typescript', 'node-forge'],
          },
          {
            repo: 'ieca-overview-ui',
            title: 'Overview',
            text: '“Applications” page: cards for the installed Edge applications with their provider and license.',
            tags: ['vue3', 'tailwind'],
          },
        ],
      },
      {
        title: 'Prototypes',
        blocks: [
          {
            repo: 'alexandre-plana/ip-sprint-*',
            title: 'IP Sprint — data on mobile (2024)',
            text: 'A mobile version of IECA data management, using Capacitor for #android and iOS and then Quasar, and an experimental mobile shell able to load #single-spa micro-frontends.',
            tags: ['vue3', 'capacitor', 'quasar', 'mobile'],
          },
          {
            repo: 'ip-sprint · notifications',
            title: 'IP Sprint — on-call notifications',
            text: 'A prototype that takes IECA alerts beyond the platform: they feed a mobile-oriented stream and become push notifications on a dedicated mobile app, for example for an on-call operator.',
            tags: ['mobile', 'push notifications'],
          },
        ],
      },
    ],
  },
}

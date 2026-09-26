import { Language } from '../locales'

export interface LocalizedMockData {
  profile: {
    title: string
    subtitle: string
    bio: string
    company: string
    langs: { label: string; level: string }[]
    interests: string[]
    uiuxHighlight: {
      label: string
      desc: string
      tools: string[]
    }
  }
  experiences: {
    [key: string]: {
      company: string
      employer: string
      missions: {
        [key: string]: {
          badge: string
          context: string
          desc: string
          cardSummary?: string
          tasks?: string[]
          retrospective?: string
          metrics: { label: string }[]
        }
      }
    }
  }
  skills: {
    [key: number]: {
      cat: string
    }
  }
  formation: {
    [key: number]: {
      label: string
      title: string
      sub: string
      meta: string
    }
  }
  personalProjects: {
    [key: number]: {
      kind?: string
      role?: string
      desc?: string
      details?: string
      highlights?: string[]
      period?: string
      status?: string
    }
  }
}

export const mockDataLocales: Record<Language, LocalizedMockData> = {
  fr: {
    profile: {
      title: 'Développeur full-stack, expertise front-end',
      subtitle: 'Applications industrielles · UI/UX · Multiplateforme',
      bio: 'Développeur spécialisé dans les applications industrielles, j’ai construit une expertise front-end et UI/UX que j’étends aujourd’hui au développement full-stack. Sur Xistar, j’interviens de l’interface opérateur aux services qui intègrent et diffusent les données opérationnelles. J’aborde le développement en reliant usages métier, architecture et contraintes techniques, avec une attention portée à la cohérence du produit, de la maquette au code livré.',
      company: 'Consultant R&D · Datacorp / X-PERT',
      langs: [
        { label: 'Français', level: 'Natif' },
        { label: 'Anglais', level: 'Technique' },
      ],
      interests: ['🎮 Jeux', '🚵 VTT', '🥾 Rando', '🍳 Cuisine'],
      uiuxHighlight: {
        label: '🎨 Culture UI/UX',
        desc: 'Pratique du design sur l\'ensemble du parcours — de la maquette Figma au composant en production.',
        tools: ['Figma', 'Adobe XD', 'Design System', 'Prototypage'],
      },
    },
    experiences: {
      '1': {
        company: 'Datacorp',
        employer: 'Consultant R&D — Schneider Electric',
        missions: {
          '11': {
            badge: 'Développeur front-end',
            context: 'Industrial Automation Edge (IECA)',
            desc: 'Au sein d’une équipe #scrum pluridisciplinaire, j’ai développé des applications Edge organisées en #microfrontend avec #vue3, #typescript et #single-spa. Mon périmètre couvrait principalement les interfaces et leur architecture, avec quelques extensions de fonctionnalités back-end. J’intervenais à la fois sur les domaines fonctionnels de la plateforme, les composants partagés, les tests et le suivi de la qualité du code.',
            cardSummary: 'Développeur front-end sur IECA, la plateforme IIoT Edge de Schneider Electric, avec des interventions ponctuelles côté back-end. J’ai contribué à plusieurs domaines fonctionnels — connecteurs, calculs, conditions, alertes et scripting — ainsi qu’au socle partagé de l’architecture #microfrontend fondée sur #vue3 #typescript et #single-spa.',
            tasks: [
              'Participer au développement des fonctionnalités liées aux connecteurs, aux calculs, aux conditions, aux alertes et au scripting.',
              'Concevoir en #vue3 et #typescript des composants partagés, dont une table configurable, un socle de routage et un sélecteur de propriétés.',
              'Étendre ponctuellement les fonctionnalités back-end nécessaires aux évolutions prises en charge côté front-end.',
              'Développer avec #jest les tests unitaires des composants, des stores #pinia et des fonctions utilitaires, puis suivre les performances et la qualité du code avec #sonarqube.',
              'Concevoir, lors d’un IP Sprint, un prototype d’application #mobile destiné à transmettre les alertes aux opérateurs d’astreinte en dehors de la plateforme IECA.',
            ],
            metrics: [],
               
          },
          '12': {
            badge: 'Développeur C# / Unity',
            context: 'Augmented Operator Advisor (AOA) — Application AR industrielle',
            desc: 'Pendant six ans, j’ai développé en #csharp et #unity les interfaces et l’architecture front-end d’une application #ar destinée aux opérateurs industriels. Le périmètre couvrait les versions #android, #ios et #windows, leur personnalisation pour les clients #oem, le fonctionnement #offline et la préparation des applications pour les différentes plateformes de distribution. J’ai également contribué au serveur de projets en #python et à la communication #http avec l’application.',
            cardSummary: 'Développeur en #csharp et #unity sur Augmented Operator Advisor, une application industrielle #ar multiplateforme pour #android, #ios et #windows. Mon travail a porté sur l’architecture front-end et les interfaces opérateur, le fonctionnement #offline et la compatibilité des projets entre versions. J’ai également participé au développement du serveur de projets en #python et à ses échanges #http avec l’application.',
            tasks: [
              'Concevoir en #csharp et #unity l’architecture front-end et une interface adaptée à #android, #ios et #windows, en modes portrait et paysage.',
              'Développer le fonctionnement #offline et la synchronisation #http, puis contribuer aux évolutions du serveur de projets en #python et à la gestion des erreurs réseau.',
              'Assurer la rétrocompatibilité des projets par la lecture des anciens formats et leur migration à la volée.',
              'Mettre en place un système de styles externalisé pour produire des versions personnalisées aux couleurs des clients #oem.',
              'Créer sous #unity un outil de tests unitaires intégré aux étapes précédant et suivant les builds.',
            ],
            metrics: [
            ],
               
          },
        },
      },
      '2': {
        company: 'Oreka Ingénierie',
        employer: 'Développeur C# / Unity 3D',
        missions: {
          '21': {
            badge: 'Développeur C# / Unity 3D',
            context: 'Projets XR industriels — EDF · RTE · AREVA · DCNS · SUEZ',
            desc: 'Pendant quatre ans, j’ai participé à la conception fonctionnelle et au développement d’applications interactives pour l’industrie, le nucléaire et la défense. À partir des besoins clients et des procédures métier, je contribuais à définir les parcours, les scénarios, les interactions et les maquettes fonctionnelles des serious games #seriousgame et des simulateurs. J’assurais ensuite leur réalisation en #csharp sous #unity, l’intégration des modèles issus de #solidworks et #3dsmax, l’optimisation CPU/GPU et la préparation des livraisons.',
            cardSummary: 'Développeur C# / Unity 3D chez Oreka Ingénierie sur des serious games #seriousgame, des simulateurs et des outils de visualisation pour EDF, RTE, AREVA, DCNS et SUEZ. J’intervenais dès la conception fonctionnelle pour traduire les besoins et les procédures métier en scénarios interactifs, puis sur leur réalisation en #csharp sous #unity, l’intégration de modèles issus de la #cao et la livraison des applications.',
            tasks: [
              'Participer à la conception fonctionnelle : analyser les besoins clients, étudier leur faisabilité technique et formaliser les parcours, les interactions et les maquettes.',
              'Concevoir des serious games #seriousgame et des simulateurs à partir des procédures métier, puis structurer les scénarios à l’aide de graphes d’états, de conditions et de déclencheurs.',
              'Développer en #csharp sous #unity les interfaces et les systèmes interactifs 2D/3D, dont les interactions propres aux dispositifs #vr et #ar.',
              'Intégrer et optimiser des modèles issus de la #cao avec #solidworks et #3dsmax : maillages, niveaux de détail, lightmaps, matériaux et shaders.',
              'Optimiser les performances CPU/GPU avec les outils de profiling de #unity, puis préparer les builds, corriger les anomalies et accompagner les démonstrations client.',
            ],
            metrics: [
            ],
               
          },
            '22': {
              badge: 'Conception fonctionnelle & UX/UI',
              context: 'Outil de prévention des TMS (Troubles Musculo-Squelettiques)',
              desc: 'Simulhom est un simulateur ergonomique 3D conçu pour analyser les postures de travail et visualiser les risques de TMS. J’ai participé à la conception fonctionnelle du produit avec des ergonomes, puis conçu les parcours et l’interface #uiux afin de rendre les indicateurs posturaux lisibles et exploitables. J’ai également contribué au développement de l’application en #csharp sous #unity et à l’intégration des retours visuels dans la scène 3D.',
              tasks: [
                'Participer à la conception fonctionnelle du produit avec des ergonomes, en formalisant les usages et les scénarios d’analyse.',
                'Concevoir les parcours, l’interface #uiux et les retours visuels associés aux risques posturaux.',
                'Développer en #csharp sous #unity les interactions et les composants du simulateur 3D.',
                'Intégrer l’analyse posturale et restituer les indicateurs de risque au fil de la simulation.',
              ],
              metrics: [],
              cardSummary: 'Conception fonctionnelle et UX/UI de Simulhom, un simulateur ergonomique 3D destiné à prévenir les troubles musculosquelettiques en milieu industriel. En collaboration avec des ergonomes, j’ai traduit les méthodes d’analyse posturale en parcours, visualisations et retours compréhensibles pour l’utilisateur, puis participé à leur réalisation en #csharp sous #unity.',
            },
            '23': {
              badge: 'Conception UX/UI',
              context: 'Dosicase — Simulateur de radioactivité pour chantiers école',
              desc: 'Dosicase met la simulation au service de la formation pratique en radioprotection. J’ai conçu l’expérience et l’interface #uiux pour présenter les situations et les risques radiologiques de manière pédagogique, puis contribué à leur intégration dans le simulateur en #csharp sous #unity. Le travail portait autant sur l’organisation des informations que sur les interactions nécessaires à l’apprentissage en chantier-école.',
              tasks: [
                'Structurer le parcours pédagogique à partir des objectifs de formation en radioprotection.',
                'Concevoir l’interface #uiux et organiser les informations liées aux situations et aux risques radiologiques.',
                'Définir les interactions du simulateur nécessaires à l’apprentissage pratique en chantier-école.',
                'Participer à l’intégration de l’expérience dans l’application en #csharp sous #unity.',
              ],
              metrics: [],
              cardSummary: 'Conception UX/UI de Dosicase, un simulateur destiné à la formation en radioprotection sur chantier-école. J’ai structuré les parcours et conçu les interfaces pour rendre les risques radiologiques et les scénarios de formation compréhensibles pour les apprenants, puis participé à leur intégration dans l’application en #csharp sous #unity.',
            },
            '24': {
              badge: 'Développeur C# / Simulation 3D',
              context: 'EMEM (Enceinte Mobile d\'Évacuation de Matériel) — Nuclear Safety',
              desc: 'L’application représentait le fonctionnement de l’enceinte mobile et les opérations liées à l’évacuation de matériel en contexte nucléaire. Mon travail portait sur le développement #csharp de la simulation sous #unity, la visualisation des flux et la gestion des matériaux radioactifs. J’ai également développé les interfaces opérateur en #wpf pour piloter et suivre la simulation.',
              tasks: [
                'Développer en #csharp sous #unity la simulation 3D interactive de l’enceinte mobile.',
                'Représenter en 3D les flux associés aux opérations d’évacuation de matériel.',
                'Implémenter la gestion et la représentation des matériaux radioactifs dans la simulation.',
                'Concevoir en #wpf les interfaces de contrôle destinées aux opérateurs.',
              ],
              metrics: [],
              cardSummary: 'Développement d’une simulation 3D interactive de l’EMEM, une enceinte mobile destinée à l’évacuation de matériel en environnement nucléaire. J’ai contribué à la représentation des flux et des matériaux radioactifs ainsi qu’à la conception des interfaces de contrôle pour les opérateurs, en #csharp avec #unity et #wpf.',
            },
            '25': {
              badge: 'Développeur C# / Serious game',
              context: 'Aeroball — Serious Game pour poste de contrôle nucléaire',
              desc: 'Le projet reproduisait en simulation le déroulement des procédures associées au poste de contrôle Aeroball. Mon travail portait sur la transformation des procédures opérationnelles en séquences de formation interactives, le développement en #csharp sous #unity et la modélisation 3D de l’environnement. Le serious game #seriousgame permettait aux opérateurs de s’entraîner à l’utilisation du poste de contrôle dans un cadre simulé.',
              tasks: [
                'Analyser les procédures opérationnelles du poste de contrôle Aeroball et les traduire en scénarios de formation.',
                'Concevoir les séquences et les interactions du serious game #seriousgame.',
                'Développer en #csharp sous #unity la simulation 3D et le déroulement des scénarios.',
                'Modéliser l’environnement de formation et l’intégrer dans l’application.',
              ],
              metrics: [],
              cardSummary: 'Développement d’un serious game #seriousgame destiné à former les opérateurs à l’utilisation du poste de contrôle Aeroball en environnement nucléaire. J’ai participé à la traduction des procédures opérationnelles en scénarios interactifs, puis à leur réalisation sous #unity en #csharp et à la modélisation 3D de l’environnement de formation.',
            },
            '26': {
              badge: 'Développeur C# / Simulation de formation',
              context: 'Formation en Radioprotection — Nuclear Safety Training',
              desc: 'Le module proposait des scénarios d’accident simulés pour former aux procédures de radioprotection et de sécurité nucléaire. Mon travail portait sur la structuration des séquences de formation, la modélisation du déroulement des scénarios et la gestion des équipes de secours. J’ai ensuite développé et intégré ces mécanismes en #csharp sous #unity dans un environnement 3D.',
              tasks: [
                'Traduire les procédures de sécurité nucléaire en séquences de formation interactives.',
                'Concevoir les scénarios d’accident simulés et leur déroulement.',
                'Implémenter la gestion des équipes de secours au sein de la simulation.',
                'Développer en #csharp sous #unity le module de formation et son environnement 3D.',
              ],
              metrics: [],
              cardSummary: 'Développement d’un module de formation interactive 3D consacré à la radioprotection et aux procédures de sécurité nucléaire. J’ai participé à la conception et à la réalisation de scénarios d’accident simulés, incluant la gestion des équipes de secours, puis à leur intégration en #csharp sous #unity.',
            },
            '27': {
              badge: 'Développeur C# / Serious game',
              context: 'Maintenance Générateurs de Vapeurs — Serious Game pour arrêts de tranche',
              desc: 'Le serious game #seriousgame reproduisait les procédures de maintenance des générateurs de vapeur réalisées pendant les arrêts de tranche. Mon travail portait sur la structuration des séquences d’intervention, leur représentation dans un environnement 3D et le développement des interactions en #csharp sous #unity. L’application était conçue pour préparer les intervenants à ces opérations en environnement nucléaire.',
              tasks: [
                'Analyser les procédures de maintenance des générateurs de vapeur et les traduire en scénarios de formation.',
                'Structurer les séquences et les interactions correspondant aux différentes étapes d’intervention.',
                'Représenter en 3D l’environnement et le déroulement des opérations de maintenance.',
                'Développer en #csharp sous #unity le serious game #seriousgame et ses mécanismes interactifs.',
              ],
              metrics: [],
              cardSummary: 'Développement d’un serious game #seriousgame destiné à préparer les interventions de maintenance des générateurs de vapeur pendant les arrêts de tranche. J’ai participé à la transposition des procédures de maintenance nucléaire en scénarios interactifs, puis à leur réalisation en #csharp sous #unity dans un environnement 3D.',
            },
            '28': {
              badge: 'Développeur C# / Simulation médicale 3D',
              context: 'Radioprotection pour la Chirurgie Interventionnelle',
              desc: 'L’application simulait des situations de chirurgie interventionnelle pour former les équipes à l’exposition radiologique et aux précautions associées. Mon travail portait sur l’intégration de la #dosimetrie dans la simulation, la visualisation des zones exposées et la restitution des protocoles de #radioprotection destinés aux opérateurs. J’ai développé ces éléments en #csharp sous #unity dans un environnement 3D.',
              tasks: [
                'Traduire les protocoles de #radioprotection en séquences de formation destinées aux équipes chirurgicales.',
                'Intégrer la #dosimetrie et représenter son évolution au cours des scénarios simulés.',
                'Visualiser les zones exposées aux rayonnements dans l’environnement 3D.',
                'Développer en #csharp sous #unity la simulation médicale et ses interactions.',
              ],
              metrics: [],
              cardSummary: 'Développement d’une simulation médicale 3D destinée à former les équipes de chirurgie interventionnelle aux pratiques de radioprotection. J’ai contribué à la représentation de la dosimétrie au cours des scénarios, à la visualisation des zones exposées aux rayonnements et à l’intégration des protocoles opérateur en #csharp sous #unity.',
            },
        },
      },
    },
    skills: {
      0: { cat: 'Langages' },
      1: { cat: 'Front-end & visualisation' },
      2: { cat: 'Services & interopérabilité' },
      3: { cat: 'Qualité & outils' },
    },
    formation: {
      0: {
        label: '📌 Formation',
        title: 'React · TypeScript',
        sub: 'Datacorp · 2026',
        meta: 'Formation approfondie à React et TypeScript, centrée sur les pratiques modernes du développement front-end',
      },
      1: {
        label: '📌 Formation',
        title: 'TypeScript · Docker · Vue.js',
        sub: 'Datacorp · 2023',
        meta: 'Formations professionnelles à TypeScript, Docker et Vue.js, appliquées au développement d’applications web',
      },
      2: {
        label: '📌 Stage',
        title: 'Polymorph',
        sub: 'Stage de fin de licence · 2013',
        meta: 'Design graphique · Communication visuelle',
      },
      3: {
        label: '📌 Diplôme',
        title: 'Licence 3D temps réel',
        sub: '3DI Laval · 2012–2013',
        meta: 'Unity 3D · Réalité virtuelle · 3D temps réel',
      },
      4: {
        label: '📌 Diplôme',
        title: 'BTS Communication visuelle — option Multimédia',
        sub: '3DI Laval · 2010–2012',
        meta: 'Multimédia · Web · Vidéo',
      },
    },
    personalProjects: {},
  },
  en: {
    profile: {
      title: 'Full-stack developer with front-end expertise',
      subtitle: 'Industrial applications · UI/UX · Cross-platform',
      bio: 'I develop industrial applications, drawing on a strong front-end and UI/UX background that I now extend across the full stack. On Xistar, I work from the operator interface through to the services that ingest and distribute operational data. My approach connects user needs, architecture and technical constraints, with close attention to product consistency from the initial design to delivered code.',
      company: 'R&D Consultant · Datacorp / X-PERT',
      langs: [
        { label: 'French', level: 'Native' },
        { label: 'English', level: 'Technical' },
      ],
      interests: ['🎮 Gaming', '🚵 Mountain Biking', '🥾 Hiking', '🍳 Cooking'],
      uiuxHighlight: {
        label: '🎨 UI/UX Culture',
        desc: 'Design practice across the entire journey — from Figma mockup to production component.',
        tools: ['Figma', 'Adobe XD', 'Design System', 'Prototyping'],
      },
    },
    experiences: {
      '3': {
        company: 'Datacorp',
        employer: 'R&D Consultant — X-PERT',
        missions: {
          '31': {
            badge: 'Full-stack developer',
            context: 'Xistar — Maritime Tactical Command Center',
            desc: 'Xistar brings together tactical awareness, mission and drone control, alert management, multi-screen operation and mission replay. Based on operational requirements, I contribute to the functional design of operator workflows, interactions and expected feature behavior. The interface uses #typescript, #react and #dockview; mapping relies on #maplibre and #deckgl to display NATO #app-6d symbology, an #mgrs grid and bathymetry. #go services ingest partner feeds through #ais, #nmea, #cot and #mavlink, transmit commands and publish information through #mqtt and #api-rest. Deployment profiles and communication between instances allow the product to adapt to defense, port and demonstration environments.',
            cardSummary: 'Full-stack developer on Xistar, a browser-based maritime tactical command center. I help design operator workflows and implement them with #typescript and #react, while also developing services in #go. The product combines tactical mapping with #maplibre and #deckgl using NATO #app-6d symbology, interoperability through #mqtt and #api-rest, multi-screen control and mission replay.',
            tasks: [
              'Contribute to Xistar’s functional design based on operational requirements: define operator workflows, interactions and expected feature behavior.',
              'Build the #typescript and #react operator workspace around #dockview panels, then integrate #maplibre and #deckgl mapping with NATO #app-6d symbology.',
              'Develop the alert system and its escalation mechanisms through a dedicated #api and email notifications.',
              'Implement interoperability in the #go services: ingest #ais, #nmea, #cot and #mavlink partner feeds, transmit commands and publish data through #mqtt and #api-rest.',
              'Develop the multi-screen application and centralized control from a master workstation, then implement mission replay for analysis, situation reports and debriefings.',
            ],
            metrics: [],
          },
          '32': {
            badge: 'TypeScript developer / Simulation',
            context: 'Drone & naval fleet simulator',
            desc: 'The simulator generates position, state and detection data for drones and ships, then sends it to Xistar through #mqtt. I developed it in #typescript on #nodejs to provide controllable data streams for demonstrations and feature development. It replaces static datasets with simulated entities whose state changes during execution.',
            cardSummary: 'Developed a drone and naval fleet simulator that supplies Xistar with data streams representative of operating conditions. Built in #typescript on #nodejs, it generates positions, states and detections and publishes them through #mqtt for demonstrations and feature development without relying on static mock data.',
            tasks: [
              'Model drones, ships and the states required by simulation scenarios.',
              'Generate position, state and detection streams during execution.',
              'Publish simulator data to Xistar through #mqtt.',
              'Develop the tool in #typescript on #nodejs for demonstrations and feature development.',
            ],
            metrics: [],
          },
          '33': {
            badge: 'TypeScript developer / Mobile application',
            context: 'Mobile app — alerts & orders',
            desc: 'The mobile application extends Xistar into the field: it receives BAM/CAM alerts and lets operators act without returning to the main workstation. I developed the interface in #typescript with #react and implemented the #socketio exchanges required for alert escalation and return orders.',
            cardSummary: 'Developed a mobile application that lets operators receive BAM/CAM alerts and issue commands from the field. Built in #typescript with #react, it supports alert escalation and return orders and communicates with Xistar through #socketio.',
            tasks: [
              'Design mobile workflows for receiving alerts and issuing commands.',
              'Display BAM/CAM alerts and the information needed to process them.',
              'Implement alert escalation and return orders.',
              'Build the interface in #typescript with #react and integrate communication through #socketio.',
            ],
            metrics: [],
          },
          '34': {
            badge: 'TypeScript developer / Multi-screen emulator',
            context: 'Screen wall emulator',
            desc: 'The emulator reproduces a physical screen-wall configuration: screen groups, a mission board and remote view dispatch. I developed it in #typescript with #react and #vite to work on centralized display control and prepare demonstrations without occupying an equipped control room.',
            cardSummary: 'Developed a screen-wall emulator for designing and demonstrating Xistar multi-view workflows without an equipped control room. Built in #typescript with #react and #vite, it reproduces screen groups, a mission board and remote view dispatch from the master workstation.',
            tasks: [
              'Model screen groups and their display configurations.',
              'Reproduce the mission board used for multi-view operations.',
              'Implement remote view dispatch from the master workstation to emulated screens.',
              'Develop the tool in #typescript with #react and #vite for development and demonstrations.',
            ],
            metrics: [],
          },
          '35': {
            badge: 'AI workflow design & development',
            context: 'AI agent execution workflow',
            desc: 'I designed an AI-agent-assisted development workflow using the #bmad method as its foundation. My personal project Iasit also helped me become familiar with agent coordination, execution tracking and improvement loops, and that experience informed the project’s design. Each project has its own #docker image for running agents in an isolated environment, while runs are dispatched to a dedicated machine through #gitlab-ci. A tool built with #react and #typescript uses agent hooks to track progress as execution unfolds. Session reports feed a self-improvement loop for both the agents and the workflow.',
            cardSummary: 'Designed an AI-agent-assisted development workflow based on the #bmad method. My personal project Iasit helped me become familiar with agent coordination, execution tracking and improvement loops. Each project has a dedicated #docker image, runs are dispatched through #gitlab-ci, and a #react and #typescript tool reports their progress.',
            tasks: [
              'Structure an AI-agent-assisted development workflow based on #bmad principles.',
              'Isolate agent execution in #docker containers built from a project-specific image.',
              'Use #gitlab-ci to trigger runs and dispatch them to a dedicated machine.',
              'Build a #react and #typescript monitoring tool that uses agent hooks to show progress as execution unfolds.',
              'Analyze session reports and automatically feed the lessons identified back into the agents and workflow.',
            ],
            metrics: [],
          },
        },
      },
      '1': {
        company: 'Schneider Electric',
        employer: 'R&D Consultant — Datacorp',
        missions: {
          '11': {
            badge: 'Front-end developer',
            context: 'Industrial Automation Edge (IECA)',
            desc: 'Within a multidisciplinary #scrum team, I developed Edge applications organized as #microfrontend modules with #vue3, #typescript and #single-spa. My work focused primarily on interfaces and front-end architecture, with occasional back-end feature extensions. I contributed to the platform’s functional areas, shared components, tests and code-quality monitoring.',
            cardSummary: 'Front-end developer on IECA, Schneider Electric’s IIoT Edge platform, with occasional back-end contributions. I worked across several functional areas—connectors, computations, conditions, alerts and scripting—as well as the shared foundation of a #microfrontend architecture built with #vue3, #typescript and #single-spa.',
            tasks: [
              'Contribute to features for connectors, computations, conditions, alerts and scripting.',
              'Build shared components in #vue3 and #typescript, including a configurable table, a routing foundation and a property selector.',
              'Extend back-end features where required by the front-end work.',
              'Write unit tests for components, #pinia stores and utility functions with #jest, then monitor performance and code quality with #sonarqube.',
              'Design an IP Sprint prototype for a #mobile application that sends alerts to on-call operators outside the IECA platform.',
            ],
            metrics: [],
          },
          '12': {
            badge: 'C# / Unity Developer',
            context: 'Augmented Operator Advisor (AOA) — Industrial AR Application',
            desc: 'For six years, I developed the interfaces and front-end architecture of an industrial #ar application in #csharp and #unity. The scope covered #android, #ios and #windows versions, customization for #oem clients, #offline operation and preparation for each distribution platform. I also contributed to the project server in #python and its #http communication with the application.',
            cardSummary: 'Developer in #csharp and #unity on Augmented Operator Advisor, a cross-platform industrial #ar application for #android, #ios and #windows. My work covered front-end architecture and operator interfaces, #offline operation and project compatibility across versions. I also contributed to the project server in #python and its #http exchanges with the application.',
            tasks: [
              'Design the front-end architecture and an interface adapted to #android, #ios and #windows in portrait and landscape modes using #csharp and #unity.',
              'Develop #offline operation and #http synchronization, then contribute to the #python project server and network-error handling.',
              'Maintain backward compatibility by reading legacy project formats and migrating them during loading.',
              'Implement an externalized style system for producing custom-branded versions for #oem clients.',
              'Create a unit-testing tool in #unity integrated into the stages before and after builds.',
            ],
            metrics: [],
          },
        },
      },
      '2': {
        company: 'Oreka Engineering',
        employer: 'C# / Unity 3D Developer',
        missions: {
          '21': {
            badge: 'C# / Unity 3D Developer',
            context: 'Industrial XR Projects — EDF · RTE · AREVA · DCNS · SUEZ',
            desc: 'For four years, I contributed to the functional design and development of interactive applications for industry, nuclear operations and defense. Starting from client requirements and operational procedures, I helped define workflows, scenarios, interactions and functional mockups for #seriousgame training applications and simulators. I then implemented them in #csharp with #unity, integrated models from #solidworks and #3dsmax, optimized CPU/GPU performance and prepared releases.',
            cardSummary: 'C# / Unity 3D developer at Oreka Engineering on #seriousgame training applications, simulators and visualization tools for EDF, RTE, AREVA, DCNS and SUEZ. I contributed from the functional-design stage, translating requirements and operational procedures into interactive scenarios, then implemented them in #csharp with #unity, integrated #cad models and delivered the applications.',
            tasks: [
              'Contribute to functional design by analyzing client requirements, assessing technical feasibility and formalizing workflows, interactions and mockups.',
              'Design #seriousgame training applications and simulators from operational procedures, then structure scenarios using state graphs, conditions and triggers.',
              'Develop 2D/3D interfaces and interactive systems in #csharp with #unity, including interactions for #vr and #ar devices.',
              'Integrate and optimize #cad models from #solidworks and #3dsmax: meshes, levels of detail, lightmaps, materials and shaders.',
              'Optimize CPU/GPU performance with #unity profiling tools, then prepare builds, fix defects and support client demonstrations.',
            ],
            metrics: [],
          },
          '22': {
            badge: 'Functional design & UX/UI',
            context: 'Musculoskeletal disorder prevention tool',
            desc: 'Simulhom is a 3D ergonomics simulator designed to analyze working postures and visualize musculoskeletal risks. I contributed to the product’s functional design with ergonomists, then designed the workflows and #uiux interface to make postural indicators clear and actionable. I also helped develop the application in #csharp with #unity and integrate visual feedback into the 3D scene.',
            cardSummary: 'Functional and UX/UI design for Simulhom, a 3D ergonomics simulator for preventing work-related musculoskeletal disorders. Working with ergonomists, I translated postural-analysis methods into understandable workflows, visualizations and feedback, then contributed to their implementation in #csharp with #unity.',
            tasks: [
              'Contribute to functional design with ergonomists by formalizing use cases and analysis scenarios.',
              'Design workflows, the #uiux interface and visual feedback associated with postural risks.',
              'Develop interactions and 3D simulator components in #csharp with #unity.',
              'Integrate postural analysis and present risk indicators throughout the simulation.',
            ],
            metrics: [],
          },
          '23': {
            badge: 'UX/UI design',
            context: 'Dosicase — Radiation-safety training simulator',
            desc: 'Dosicase uses simulation to support practical radiation-safety training. I designed the experience and #uiux interface to present situations and radiological risks clearly to learners, then contributed to their integration into the simulator in #csharp with #unity. The work covered both information architecture and the interactions required for hands-on training.',
            cardSummary: 'UX/UI design for Dosicase, a simulator used for hands-on radiation-safety training. I structured the learning workflows and designed interfaces that make radiological risks and training scenarios understandable, then contributed to their integration into the application in #csharp with #unity.',
            tasks: [
              'Structure the learning journey from radiation-safety training objectives.',
              'Design the #uiux interface and organize information about situations and radiological risks.',
              'Define the simulator interactions required for hands-on training.',
              'Contribute to integrating the experience into the application in #csharp with #unity.',
            ],
            metrics: [],
          },
          '24': {
            badge: 'C# developer / 3D simulation',
            context: 'EMEM mobile equipment evacuation enclosure — Nuclear safety',
            desc: 'The application represented the operation of a mobile enclosure and the procedures for evacuating equipment in a nuclear environment. I worked on the #csharp simulation in #unity, visualized material flows and implemented radioactive-material management. I also developed #wpf operator interfaces for controlling and monitoring the simulation.',
            cardSummary: 'Developed an interactive 3D simulation of EMEM, a mobile enclosure for evacuating equipment in a nuclear environment. I contributed to representing flows and radioactive materials and designed operator control interfaces using #csharp, #unity and #wpf.',
            tasks: [
              'Develop the interactive 3D enclosure simulation in #csharp with #unity.',
              'Represent the flows associated with equipment-evacuation operations in 3D.',
              'Implement radioactive-material management and visualization in the simulation.',
              'Design operator control interfaces in #wpf.',
            ],
            metrics: [],
          },
          '25': {
            badge: 'C# developer / Serious game',
            context: 'Aeroball — Training application for nuclear control-station operators',
            desc: 'The project reproduced the procedures associated with the Aeroball control station in a simulation. I translated operational procedures into interactive training sequences, developed the application in #csharp with #unity and modeled the 3D training environment. The #seriousgame let operators practice using the control station in a simulated setting.',
            cardSummary: 'Developed a #seriousgame to train operators on the Aeroball control station in a nuclear environment. I helped translate operational procedures into interactive scenarios, then implemented them in #csharp with #unity and modeled the 3D training environment.',
            tasks: [
              'Analyze Aeroball control-station procedures and translate them into training scenarios.',
              'Design the sequences and interactions of the #seriousgame.',
              'Develop the 3D simulation and scenario flow in #csharp with #unity.',
              'Model the training environment and integrate it into the application.',
            ],
            metrics: [],
          },
          '26': {
            badge: 'C# developer / Training simulation',
            context: 'Radiation protection — Nuclear safety training',
            desc: 'The module used simulated accident scenarios to teach radiation-protection and nuclear-safety procedures. I structured the training sequences, modeled the scenario flow and implemented emergency-team management. I then developed and integrated these mechanisms in #csharp with #unity in a 3D environment.',
            cardSummary: 'Developed an interactive 3D training module covering radiation protection and nuclear-safety procedures. I contributed to the design and implementation of simulated accident scenarios, including emergency-team management, then integrated them in #csharp with #unity.',
            tasks: [
              'Translate nuclear-safety procedures into interactive training sequences.',
              'Design simulated accident scenarios and their progression.',
              'Implement emergency-team management within the simulation.',
              'Develop the training module and its 3D environment in #csharp with #unity.',
            ],
            metrics: [],
          },
          '27': {
            badge: 'C# developer / Serious game',
            context: 'Steam-generator maintenance — Training for nuclear outages',
            desc: 'The #seriousgame reproduced steam-generator maintenance procedures performed during nuclear outages. I structured the intervention sequences, represented them in a 3D environment and developed the interactions in #csharp with #unity. The application prepared personnel for these operations in a nuclear environment.',
            cardSummary: 'Developed a #seriousgame to prepare personnel for steam-generator maintenance during nuclear outages. I helped translate maintenance procedures into interactive scenarios, then implemented them in #csharp with #unity in a 3D environment.',
            tasks: [
              'Analyze steam-generator maintenance procedures and translate them into training scenarios.',
              'Structure the sequences and interactions for each intervention stage.',
              'Represent the maintenance environment and operations in 3D.',
              'Develop the #seriousgame and its interactive mechanisms in #csharp with #unity.',
            ],
            metrics: [],
          },
          '28': {
            badge: 'C# developer / 3D medical simulation',
            context: 'Radiation protection for interventional surgery',
            desc: 'The application simulated interventional-surgery situations to train teams on radiation exposure and the associated precautions. I integrated #dosimetry into the simulation, visualized exposed areas and represented the #radioprotection protocols used by operators. I developed these elements in #csharp with #unity in a 3D environment.',
            cardSummary: 'Developed a 3D medical simulation for training interventional-surgery teams in radiation-protection practices. I contributed to representing dosimetry throughout the scenarios, visualizing radiation-exposed areas and integrating operator protocols in #csharp with #unity.',
            tasks: [
              'Translate #radioprotection protocols into training sequences for surgical teams.',
              'Integrate #dosimetry and represent how it changes throughout simulated scenarios.',
              'Visualize radiation-exposed areas in the 3D environment.',
              'Develop the medical simulation and its interactions in #csharp with #unity.',
            ],
            metrics: [],
          },
        },
      },
    },
    skills: {
      0: { cat: 'Languages' },
      1: { cat: 'Front-end & visualization' },
      2: { cat: 'Services & interoperability' },
      3: { cat: 'Quality & tools' },
    },
    formation: {
      0: {
        label: '📌 Training',
        title: 'React · TypeScript',
        sub: 'Datacorp · 2026',
        meta: 'Advanced React and TypeScript training focused on modern front-end development practices',
      },
      1: {
        label: '📌 Training',
        title: 'TypeScript · Docker · Vue.js',
        sub: 'Datacorp · 2023',
        meta: 'Professional training in TypeScript, Docker and Vue.js applied to web application development',
      },
      2: {
        label: '📌 Internship',
        title: 'Polymorph',
        sub: 'Final-year internship · 2013',
        meta: 'Graphic design · Visual communication',
      },
      3: {
        label: '📌 Degree',
        title: 'Bachelor’s degree in real-time 3D',
        sub: '3DI Laval · 2012–2013',
        meta: 'Unity 3D · Virtual reality · Real-time 3D',
      },
      4: {
        label: '📌 Degree',
        title: 'BTS in Visual Communication — Multimedia option',
        sub: '3DI Laval · 2010–2012',
        meta: 'Multimedia · Web · Video',
      },
    },
    personalProjects: {
      4: {
        kind: 'AI-assisted development workflow',
        role: 'Product design & full-stack development',
        desc: 'Iasit is a coordination tool for software development assisted by AI agents. I designed it to structure preparation, execution, verification, correction and acceptance, track bugs as findings, and turn recurring problems into learned rules. Relevant rules are fed back into future prompts to improve subsequent executions. The application combines #react and #typescript with a #nodejs runtime.',
        details: 'The #nodejs runtime manages multiple projects and maintains a reference status for each task. Bugs and discrepancies found during verification are recorded as findings with their severity, evidence, related files and a proposed correction. An open finding triggers the fix and re-verify cycle and blocks acceptance until it is addressed. When a lesson can be reused, the finding is explicitly promoted to a learned rule. The rule retains its origin, scope and status; relevant active rules are then selected and included in future prompts. This loop allows Iasit to reuse lessons from earlier errors and progressively adapt the instructions sent to agents.',
        highlights: [
          'Design reference formats for tasks, executions and findings, then validate their data with #zod',
          'Build the tracking views in #react and #typescript, together with a #sigmajs context graph linking tasks, executions, findings and files',
          'Build a multi-project #nodejs runtime that generates run, verify, fix and next instructions for individual tasks or batches and exposes their lifecycle through #api-rest and #mcp',
          'Manage bugs through a traceable verify → finding → fix → re-verify loop, with evidence, severity, related files and blocked acceptance while discrepancies remain open',
          'Promote reusable lessons to learned rules, preserve their provenance and feed relevant active rules back into future prompts',
        ],
        status: 'in service',
      },
      6: {
        kind: '3D educational sandbox',
        role: 'Product design & 3D front-end development',
        desc: 'Vorrery is a 3D educational sandbox designed for learning through experimentation, observation and hands-on manipulation. Users build their own systems, adjust parameters and immediately see the consequences of their choices. The product combines free exploration, guided experiments and child-friendly journeys in a #react #typescript interface rendered with #threejs and #react-three-fiber.',
        details: 'Vorrery puts experimentation at the center of the experience. Users can create a scene, change its parameters, compare scenarios, undo their actions and start again under the same conditions. Generation remains visible step by step so that each choice can be connected to the resulting transformation instead of showing only a finished scene. Several levels of guidance coexist: a free sandbox, a laboratory with manipulation and visualization tools, guided scenarios and a space designed for children. The latter uses short instructions, audio narration and an observation notebook, with no scores, failure states or imposed progression.',
        highlights: [
          'Design a sandbox where users can create, modify and replay experiments from controlled parameters',
          'Make procedural generation visible as a sequence of steps that connects each transformation to its result',
          'Offer several exploration modes: free manipulation, guided experiments, predefined configurations and child-friendly journeys',
          'Design an educational experience based on observation and experimentation, with audio narration, sonification and an observation notebook instead of artificial rewards',
          'Build the interface with #react and #typescript, render it with #threejs and #react-three-fiber, and move calculations to #web-workers to keep interactions responsive',
        ],
        status: 'active',
      },
      2: {
        kind: 'Self-hosted application',
        role: 'Product design & architecture',
        desc: 'Design of a private, self-hosted family digital memory for keeping photos, videos and documents on a home server. The product roadmap covers an Android gallery, local administration and remote mobile access, with particular attention to reliable storage and data ownership.',
        details: 'The repository contains Kin’s functional and technical framing. Its roadmap progresses from an executable foundation to an installable family library, then adds search, shared albums and a document vault. Each deliverable defines its intended use, security boundaries and the contracts to preserve before implementation.',
        highlights: [
          'Roadmap structured into 13 functional deliverables, from the technical foundation to family organization',
          'Storage design covering integrity checks, local backup and restore, and state-machine-based synchronization',
          'Definition of an Android gallery, simple files and shareable albums',
          'Authentication model, device pairing, groups, audiences and visibility rules',
          'Local web administration and planned remote mobile access through Cloudflare Tunnel',
        ],
        status: 'design phase',
      },
      7: {
        kind: '3D tactical game prototype',
        role: 'Design & development',
        desc: 'Design and development of a 3D tactical game built around programming an autonomous squad. The player configures ability priorities, runs a deterministic scenario, observes the characters’ decisions and then adjusts the rules. The prototype aims to make every behavior predictable, readable and explainable.',
        details: 'The project separates Godot-authored data, an engine-independent C# simulation and the 3D presentation layer. The prototype already supports moving a command point, controlling a formation, fighting an enemy and configuring a program made of ordered abilities while preserving reproducible execution.',
        highlights: [
          'Fixed-step C# simulation separated from Godot scenes and animations, with deterministic snapshots and events',
          'Squad movement around a command point, configurable formation and synchronized locomotion',
          'Character program built from one passive and four ordered ability slots with a fallback action',
          'Combat split into windup, execution and recovery phases, with targeting and visual feedback',
          'Validation through .NET tests, headless Godot tests and automated Python contracts',
        ],
        status: 'active',
      },
    },
  },
}

export const getMockDataLocale = (lang: Language): LocalizedMockData => mockDataLocales[lang]

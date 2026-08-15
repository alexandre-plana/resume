import { Language } from '../locales'

export interface LocalizedMockData {
  profile: {
    title: string
    subtitle: string
    bio: string
    company: string
    seeking: string
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
  activity: {
    [key: number]: {
      action: string
      repo: string
      detail?: string
      time: string
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
      title: 'Développeur Front End',
      subtitle: 'Industrie · UI/UX · Multi Plateforme',
          bio: 'Développeur Front-End avec 13 ans d’expérience, j’ai évolué dans des secteurs industriels exigeants (énergie, nucléaire, défense, IIoT). J’ai appris à concevoir des interfaces intuitives et fiables, en collaborant avec des équipes pluridisciplinaires et en adaptant les solutions aux besoins métier. Curieux, rigoureux et orienté qualité, je maîtrise les architectures modernes (micro-frontend, Vue, React, TypeScript) et je place l’expérience utilisateur au cœur de chaque projet.',
      company: 'Consultant R&D · Datacorp',
      seeking: 'Poste Front End web dans un contexte industriel · Vue.js ou React · TypeScript · micro-frontend · équipe orientée qualité & UX',
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
            badge: 'Développeur front end',
            context: 'Industrial Automation Edge (IECA)',
            desc: 'Développement d\'applications Edge industrielles en architecture micro-frontend (single-spa) avec Vue 3 + TypeScript. Contribution active à la vie du projet en Scrum, avec un focus constant sur la qualité, la performance et l\'accessibilité.',
            cardSummary: 'Développeur frontend sur la plateforme IIoT Edge de Schneider : conception de composants mutualisés #vue3 #typescript pour plusieurs équipes projet, structuration de l\'architecture #single-spa #microfrontend, industrialisation de la qualité avec #jest et #sonarqube, contribution active au delivery #scrum orienté performance et maintenabilité. Exemples de tâches : création de composants graphiques, intégration d\'un module de gestion des alertes, optimisation du chargement des données, mise en place de tests unitaires, refactoring, amélioration de l\'accessibilité.',
            tasks: [
              'Concevoir et développer des composants front réutilisables par les différentes équipes du projet',
              'Implémenter une architecture micro-frontend',
              'Implémenter les tests unitaires en utilisant Jest',
              'Surveiller les performances et le bon fonctionnement de l\'application, et améliorer la qualité du code via SonarQube',
              'Amélioration continue de l\'architecture et de la scalabilité du projet',
            ],
            retrospective: 'Expérience web très enrichissante dans un environnement industriel exigeant. Cette mission m\'a permis de structurer des pratiques frontend robustes, de monter en compétence sur l\'architecture micro-frontend, et surtout d\'acquérir une rigueur technique et méthodologique indispensable pour des projets à fort enjeu qualité.',
            metrics: [],
               
          },
          '12': {
            badge: 'Développeur C# / Unity',
            context: 'Augmented Operator Advisor (AOA) — Application AR industrielle',
            desc: 'Développement pendant 6 ans d\'une application AR multi-plateforme (Android, iOS, Windows) pour opérateurs industriels Schneider Electric. Conception et implémentation des interfaces opérateur (tableaux de bord, navigation, interactions tactiles et manettes), gestion des états complexes de la couche AR, mise en place du mode offline avec synchronisation automatique, création d\'outils de tests unitaires pour Unity, gestion de la compatibilité multi-version, intégration d\'un système de styles externalisé pour clients OEM, optimisation des performances et fiabilisation continue des versions en production.',
            cardSummary: 'Développeur #csharp sur une application #ar industrielle multi-plateforme : conception d\'interfaces opérateur #mobile et desktop, structuration de l\'architecture front, gestion du mode #offline, de la communication #api avec le serveur de projets, et fiabilisation continue des versions en production.',
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
            desc: 'Pendant quatre années au sein d\'Oreka Ingénierie, j\'ai occupé le poste de développeur C# / Unity 3D sur des projets VR/AR à forte dimension industrielle. Analyse approfondie des besoins clients, participation aux propositions commerciales, modélisation et intégration 3D (optimisation mesh, lightmaps, shaders), conception UI/UX pour environnements immersifs (VR/AR), développement d\'applications interactives haute performance (systèmes d\'état, scénarios métier, interactions contrôleur/manette), optimisation des performances (profiling Unity, pooling, pipelines d\'import), préparation et livraison de versions clients (builds automatisés, debug, support démo). Collaboration avec grands comptes (EDF, Suez, DCNS, RTE, MBDA) sur des contextes sensibles (nucléaire, armement), avec des exigences techniques élevées. Expertise Unity, C#, VR/AR, UI/UX immersif, outils 3D (SolidWorks, 3ds Max), capacité à proposer des solutions techniques adaptées et efficaces.',
            cardSummary: 'Développeur #csharp sur des projets #vr #ar industriels pour grands comptes : analyse approfondie des besoins clients, modélisation et intégration 3D #3dsmax #unity3D, développement d\'interfaces et de systèmes interactifs 2D/3D, conception UI/UX immersif, optimisation #performance, implémentation de scénarios métier, préparation et livraison de versions clients (debug, support démo), contribution à la qualité visuelle et technique, collaboration sur des contextes sensibles (nucléaire, armement).',
            tasks: [
              'Développement d\'interfaces et de systèmes interactifs 2D/3D sous Unity (C#) : architecture des scènes, scripting gameplay, gestion des événements, systèmes d\'interaction VR/AR.',
              'Intégration et traitement de modèles issus de la CAO (SolidWorks) : optimisation mesh, baking, LOD, lightmaps, réglages matériaux/shaders.',
              'Optimisation des performances en environnements industriels : profiling Unity, réduction du coût CPU/GPU, pooling d\'objets, optimisation des assets et des pipelines d\'import.',
              'Développement de modules techniques spécifiques : gestion d\'I/O, logique métier, systèmes d\'état, chargement dynamique de contenu.',
              'Implémentation de scénarios interactifs basés sur les procédures métier : graphes d\'états, logiques conditionnelles, triggers.',
              'Conception d\'interfaces immersives adaptées aux usages VR/AR : ergonomie, spatialisation, interactions contrôleur/manette.',
              'Participation à la définition technique des besoins client : spécifications, faisabilité, choix technologiques, maquettes fonctionnelles.',
              'Contribution à la qualité visuelle et technique : direction artistique, cohérence des assets, refinements UI/UX.',
              'Préparation et livraison de versions internes et clients : automatisation partielle des builds, debug, support des démonstrations.',
            ],
            retrospective: 'Cette expérience m\'a appris à aborder des enjeux techniques exigeants avec méthode, à structurer ma réflexion autour du besoin réel des utilisateurs et des métiers, et à trouver l\'équilibre juste entre performance, ergonomie et faisabilité. Elle a également renforcé ma polyvalence de l\'analyse du besoin client jusqu\'à la réalisation finale tout en développant ma capacité à collaborer efficacement dans des environnements projet variés. Au fil des années, elle m\'a donné des bases solides en communication, en adaptabilité et en travail interdisciplinaire, qui continuent aujourd\'hui d\'orienter ma manière de concevoir, de prioriser et de travailler en équipe.',
            metrics: [
            ],
               
          },
            '22': {
              badge: 'Conception générale & UX/UI',
              context: 'Outil de prévention des TMS (Troubles Musculo-Squelettiques)',
              desc: 'Conception générale du produit en collaboration avec des ergonomes, conception et réalisation UX/UI. Simulateur ergonomique 3D pour la prévention des TMS en milieu industriel. Analyse posturale temps réel, feedback visuel des risques.',
               tasks: ['Conception générale du produit', 'Collaboration avec des ergonomes', 'Conception et réalisation UX/UI', 'Développement Unity 3D'],
              metrics: [],
              cardSummary: 'Conception générale et UX/UI du simulateur ergonomique 3D #vr #csharp #Unity3D pour la prévention des TMS en milieu industriel. Collaboration avec des ergonomes, analyse posturale temps réel, feedback visuel des risques, interface opérateur intuitive.',
            },
            '23': {
              badge: 'Conception & Design UI/UX',
              context: 'Dosicase — Simulateur de radioactivité pour chantiers école',
                desc: 'Outil de simulation de radioactivité destiné aux chantiers école pour la formation en radioprotection. #csharp #unity3D #simulation #ux #ui #radioprotection. Conception de l\'interface utilisateur et design UX pour rendre accessible la compréhension des risques radiologiques. Focus sur la pédagogie et l\'apprentissage pratique.',
              tasks: ['Conception UI/UX', 'Simulation radioprotection', 'Design pédagogique'],
              metrics: [],
                cardSummary: 'Conception et design UX/UI du simulateur Dosicase pour la radioprotection. #csharp #unity3D #simulation #ux #ui #radioprotection',
            },
            '24': {
              badge: 'C# / 3D Developer',
              context: 'EMEM (Enceinte Mobile d\'Évacuation de Matériel) — Nuclear Safety',
                desc: 'Simulation 3D interactive d\'une enceinte mobile nucléaire. #csharp #unity3D #simulation #nuclear #3d #wpf. Visualisation 3D des flux, gestion des matériaux radioactifs, interfaces de contrôle temps réel pour opérateurs.',
              tasks: ['Simulation 3D', 'Gestion matériaux radioactifs', 'Interfaces temps réel'],
              metrics: [],
                cardSummary: 'Simulation 3D interactive d\'une enceinte mobile nucléaire. #csharp #unity3D #simulation #nuclear #3d #wpf',
            },
            '25': {
              badge: 'C# / 3D Developer',
              context: 'Aeroball — Serious Game pour poste de contrôle nucléaire',
                desc: 'Serious game de formation pour l\'utilisation du poste de contrôle Aeroball en milieu nucléaire. #csharp #unity3D #seriousgame #simulation #nuclear #3d. Simulation 3D interactive, développement C# et modélisation 3D pour reproduire fidèlement les procédures opérationnelles.',
              tasks: ['Serious game', 'Simulation 3D', 'Modélisation procédurale'],
              metrics: [],
                cardSummary: 'Serious game de formation Aeroball pour le nucléaire. #csharp #unity3D #seriousgame #simulation #nuclear #3d',
            },
            '26': {
              badge: 'C# / 3D Developer',
              context: 'Formation en Radioprotection — Nuclear Safety Training',
                desc: 'Module de formation interactive 3D sur la radioprotection et les procédures de sécurité nucléaire. #csharp #unity3D #simulation #radioprotection #training #3d. Simulations de scénarios d\'accident, gestion des équipes de secours.',
              tasks: ['Formation radioprotection', 'Simulation scénarios', 'Gestion équipes'],
              metrics: [],
                cardSummary: 'Module de formation interactive 3D sur la radioprotection et la sécurité nucléaire. #csharp #unity3D #simulation #radioprotection #training #3d',
            },
            '27': {
              badge: 'C# / 3D Developer',
              context: 'Maintenance Générateurs de Vapeurs — Serious Game pour arrêts de tranche',
                desc: 'Serious game destiné à préparer les interventions durant les arrêts de tranche pour la maintenance des générateurs de vapeurs. #csharp #unity3D #seriousgame #simulation #maintenance #nuclear #3d. Simulation 3D temps réel, développement C# pour reproduire les procédures complexes de maintenance en environnement nucléaire.',
              tasks: ['Maintenance nucléaire', 'Simulation 3D', 'Développement C#'],
              metrics: [],
                cardSummary: 'Serious game pour la maintenance nucléaire des générateurs de vapeurs. #csharp #unity3D #seriousgame #simulation #maintenance #nuclear #3d',
            },
            '28': {
              badge: 'C# / 3D Developer',
              context: 'Radioprotection pour la Chirurgie Interventionnelle',
                desc: 'Simulation 3D pour la formation des équipes chirurgicales. #csharp #unity3D #simulation #medical #dosimetry #healthcare #3d. Dosimétrie en temps réel, visualisation des zones sensibles aux radiations, protocole de radioprotection opérateur.',
              tasks: ['Simulation médicale', 'Dosimétrie temps réel', 'Radioprotection opérateur'],
              metrics: [],
                cardSummary: 'Simulation 3D pour la formation chirurgicale et la radioprotection. #csharp #unity3D #simulation #medical #dosimetry #healthcare #3d',
            },
        },
      },
    },
    skills: {
      0: { cat: 'Frameworks' },
      1: { cat: 'Outils' },
    },
    formation: {
      0: {
        label: '📌 Formations',
        title: 'React · TypeScript',
        sub: 'Datacorp · 2026',
        meta: 'In-depth training on React and modern front-end best practices',
      },
      1: {
        label: '📌 Formations',
        title: 'TypeScript · Docker · Vue.js',
        sub: 'Datacorp · 2023',
        meta: 'Formations professionnelles sur les technologies web modernes utilisées dans mes missions actuelles',
      },
      2: {
        label: '📌 Formations',
        title: 'Stage Polymorph',
        sub: 'Stage fin de license · 2013',
        meta: '3D temps réel · Réalité virtuelle · Unity 3D',
      },
      3: {
        label: '📌 Diplome',
        title: 'Licence 3D Temps Réel',
        sub: '3DI Laval · 2012–2013',
        meta: '3D temps réel · Réalité virtuelle · Unity 3D',
      },
      4: {
        label: '📌 Diplome',
        title: 'BTS Communication Visuelle opt. Multimédia',
        sub: '3DI Laval · 2010–2012',
        meta: 'Multimédia · Web · Vidéo',
      },
    },
    activity: {},
    personalProjects: {},
  },
  en: {
    profile: {
      title: 'Frontend Engineer',
      subtitle: 'Industrial · UI/UX · Multi-Platform',
        bio: 'Front-End Developer with 13 years of experience in demanding industrial sectors (energy, nuclear, defense, IIoT). I have learned to design intuitive and reliable interfaces, collaborating with multidisciplinary teams and adapting solutions to business needs. Curious, rigorous, and quality-oriented, I master modern architectures (micro-frontend, Vue, React, TypeScript) and put user experience at the heart of every project.',
      company: 'Consultant R&D · Datacorp',
      seeking: 'Frontend role in industrial context · Vue.js or React · TypeScript · micro-frontends · quality & UX-oriented team',
      interests: ['🎮 Gaming', '🚵 Mountain Biking', '🥾 Hiking', '🍳 Cooking'],
      uiuxHighlight: {
        label: '🎨 UI/UX Culture',
        desc: 'Design practice across the entire journey — from Figma mockup to production component.',
        tools: ['Figma', 'Adobe XD', 'Design System', 'Prototyping'],
      },
    },
    experiences: {
      '3': {
        company: 'X-PERT',
        employer: 'R&D Consultant — Datacorp',
        missions: {
          '31': {
            badge: 'Full stack developer',
            context: 'Xistar — Marine Command Center',
            desc: "Development of Xistar, a browser-based maritime tactical command center: a single product covering the full sensor → operator → decision → action → analysis loop. Real-time tactical picture (MapLibre + deck.gl, NATO APP-6D symbology, MGRS grid, bathymetry), mission and drone control with automated chains and a human in the loop, synchronized screen wall with remote view push, and full operation replay. Bridge architecture: adapters isolated at the boundaries (AIS, NMEA, CoT, MAVLink) feeding a canonical model broadcast over MQTT and Socket.io. A single codebase ships three products (defense, port supervision, demo) through a per-profile feature registry with lazy loading and tree-shaking.",
            cardSummary: "Full-stack developer on Xistar, a browser-based maritime tactical command center: real-time tactical picture #maplibre #deckgl with NATO APP-6D symbology, mission and drone control, synchronized screen wall and full operation replay. End-to-end real time #mqtt #socketio, one codebase → three products (defense, port, demo) through a feature registry #treeshaking, tooling-enforced quality #vitest #gitlabci.",
            tasks: [
              'Build the operator interface: tactical picture, mission panels, BAM/CAM alert console with escalation and human-in-the-loop control',
              'Implement the MapLibre + deck.gl map rendering: APP-6D symbology, trails, course vectors, MGRS grid, bathymetry',
              'Design the per-profile feature registry: manifests, lazy loading, tree-shaken builds — three products without a functional fork',
              'Wire end-to-end real time: sensor feeds (AIS, NMEA, CoT, MAVLink) adapted at the boundary and broadcast through MQTT and Socket.io to the UI',
              'Set up synchronized multi-screen replay and the screen wall with remote view push',
              'Industrialize quality: front and back Vitest suites, lint, 5-stage GitLab CI pipeline with tagged deployments and smoke tests',
            ],
            metrics: [],
          },
          '32': {
            badge: 'Full stack developer',
            context: 'Drone & naval fleet simulator',
            desc: "Node.js simulator for drones and naval fleets feeding Xistar with realistic streams (positions, states, detections) for demos and development — in line with the platform's zero-mock-data principle.",
            metrics: [],
          },
          '33': {
            badge: 'Full stack developer',
            context: 'Mobile app — alerts & orders',
            desc: 'Mobile app for receiving BAM/CAM alerts and issuing orders (escalation, return order): the operator stays in the loop from the field.',
            metrics: [],
          },
          '34': {
            badge: 'Full stack developer',
            context: 'Screen wall emulator',
            desc: 'Screen wall emulator to build and demo multi-view operations without a physical room: screen sets, mission board, remote view push. React / Vite stack.',
            metrics: [],
          },
        },
      },
      '1': {
        company: 'Schneider Electric',
        employer: 'R&D Consultant — Datacorp',
        missions: {
          '11': {
            badge: 'Frontend Developer',
            context: 'Industrial Automation Edge (IECA)',
            desc: "Development of industrial Edge applications using a micro-frontend architecture (single-spa) with Vue 3 + TypeScript, as part of a multidisciplinary Scrum team. Major contributions to the shared utility MFE: designed a configurable generic table, a common routing base, a property selector, and cross-team reusable components. Built a mobile alert prototype for on-call operators, presented to product owners and selected for potential client implementation.",
            cardSummary: "Frontend developer on Schneider's IIoT Edge platform: designed shared #vue3 #typescript components for multiple project teams, structured the #single-spa #microfrontend architecture, industrialized quality with #jest and #sonarqube, and contributed to #scrum delivery focused on performance and maintainability. Example tasks: building graphical components, integrating an alert management module, optimizing data loading, implementing unit tests, refactoring, and improving accessibility.",
            tasks: [
              'Design and develop reusable frontend components for different project teams, including a configurable generic table, a shared routing base, and a property selector',
              'Implement unit tests with Jest — component tests, Pinia stores, and utility functions',
              'Monitor application performance and reliability, and improve code quality with SonarQube',
              'Continuously improve the project architecture and scalability',
              'Participate in code reviews and help upskill the team on frontend best practices',
            ],
            retrospective: "This project allowed me to establish robust frontend practices in a demanding industrial environment, and confirmed my ability to quickly ramp up on a new tech stack.",
            metrics: [],
          },
          '12': {
            badge: 'C# / Unity Developer',
            context: 'Augmented Operator Advisor (AOA) — Industrial AR Application',
            desc: "Six years on a flagship project in a high-quality industrial environment. This experience forged my rigor in testing, architecture, and maintainability—skills I now apply to every project.",
            cardSummary: "C# / #unity developer on a cross-platform industrial #ar product: built operator-facing interfaces for mobile and desktop, structured frontend architecture, implemented robust #offline mode, managed #api communication with the project server, and ensured continuous reliability across releases.",
            tasks: [
              'Design and develop a fully responsive interface (iOS, Android, Windows — portrait and landscape modes)',
              'Package, prepare, and deploy apps to various stores (Google Play, App Store, SESU)',
              'Create a dedicated unit testing tool for Unity 3D, integrated into pre- and post-build phases',
              'Implement an externalized style system for delivering custom-branded versions (notably for OEMs)',
              'Design the frontend architecture: modular split, coding conventions, and clear responsibility boundaries',
              'Develop an offline system with automatic data sync when connection is restored',
              'Handle deserialization and backward compatibility between project versions: legacy format reading, seamless on-the-fly migration',
              'Implement the communication layer with the project server: HTTP requests, network error handling, and reconnection logic',
              'Manage the application data lifecycle: local cache invalidation, refresh strategy, and stale data cleanup',
            ],
            retrospective: "Six years on a flagship project in a high-quality industrial environment. This experience forged my rigor in testing, architecture, and maintainability—skills I now apply to every project.",
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
            desc: "C# / Unity 3D developer on high-impact VR/AR projects for major industrial clients (EDF, Suez, DCNS, RTE, MBDA) in sensitive sectors (nuclear, defense). Responsibilities included client needs analysis, commercial proposals, 3D modeling and integration, immersive UI/UX design, high-performance interactive app development, performance optimization, and client delivery.",
            cardSummary: "#csharp on industrial #vr #ar projects for major clients: in-depth needs analysis, 3D modeling and integration #3dsmax #unity3D, development of 2D/3D interactive systems, immersive UI/UX design, performance optimization, business scenario implementation, client delivery (debug, demo support), and collaboration in sensitive environments (nuclear, defense).",
            tasks: [
              'Develop 2D/3D interfaces and interactive systems in Unity (C#): scene architecture, scripting, event management, VR/AR interaction systems',
              'Integrate and process CAD models (SolidWorks): mesh optimization, baking, LOD, lightmaps, material/shader tuning',
              'Optimize performance for industrial environments: Unity profiling, CPU/GPU cost reduction, object pooling, asset optimization',
              'Develop specific technical modules: I/O management, business logic, state systems, dynamic content loading',
              'Implement interactive scenarios based on business procedures: state graphs, conditional logic, triggers',
              'Design immersive interfaces for VR/AR: ergonomics, spatialization, controller/gamepad interactions',
              'Participate in technical definition of client needs: specifications, feasibility, technology choices, functional mockups',
              'Prepare and deliver internal and client builds: partial build automation, debugging, demo support',
            ],
            retrospective: "Four years of diverse industrial projects taught me to understand business needs before writing a single line of code, to work with high technical standards, and to collaborate effectively in multidisciplinary environments.",
            metrics: [
              { label: 'industrial\nprojects' },
              { label: 'enterprise\nclients' },
              { label: 'real-time\nUnity 3D' },
            ],
          },
        },
      },
    },
    skills: {
      0: { cat: 'Frameworks' },
      1: { cat: 'Tools' },
    },
    formation: {
      0: {
        label: '📌 Training',
        title: 'React · TypeScript',
        sub: 'Datacorp · 2026',
        meta: 'In-depth training on React and modern front-end best practices',
      },
      1: {
        label: '📌 Training',
        title: 'TypeScript · Docker · Vue.js',
        sub: 'Datacorp · 2023',
        meta: 'Professional training on modern web technologies used in my current missions',
      },
      2: {
        label: '📌 Training',
        title: 'Polymorph Internship',
        sub: 'End-of-degree internship · 2013',
        meta: 'Graphic design · Visual communication',
      },
      3: {
        label: '📌 Degree',
        title: 'Bachelor in Real-Time 3D',
        sub: '3DI Laval · 2012–2013',
        meta: 'Real-time 3D · Virtual Reality · Unity 3D',
      },
      4: {
        label: '📌 Degree',
        title: 'BTS Visual Communication (Multimedia)',
        sub: '3DI Laval · 2010–2012',
        meta: 'Multimedia · Web · Video',
      },
    },
    activity: {},
    personalProjects: {
      0: {
        kind: 'Educational platform',
        role: 'Full stack developer',
        desc: 'Educational platform for ages 6-11: the water cycle, volcanoes or wildfires explained through voxel dioramas children manipulate block by block. Deterministic zero-dependency simulation engine, triple rendering of a single model — 3D, 2D cross-section, accessible DOM — and an offline mode designed for schools.',
        details: "Voxels aren't an aesthetic choice: they exist to show the inside of things — you cut a volcano open like a cake to see the magma chamber. The architecture is locked by 26 documented decisions, and the tooling-driven backlog counts 95 tasks across 17 batches, checked in CI.",
        highlights: [
          'Deterministic zero-dependency voxel engine — Math.random and imports forbidden, mechanically enforced by lint in CI',
          'Triple rendering of one model: 3D (three.js/TSL, WebGL + WebGPU), 2D cross-section fallback and accessibility DOM tree',
          'Versioned manifest-driven educational content with a CLI validator',
          'xAPI learning tracking minimized by design: no ranking between children, no gesture or camera data',
          'pnpm monorepo in 6 packages: engine, render-3d, render-2d, a11y, player, shell',
        ],
        status: 'active',
      },
      1: {
        kind: 'Self-hosted app',
        role: 'Full stack developer',
        desc: 'Self-hosted family digital memory: photos, videos and documents reliably stored at home, browsable through an Android gallery and a strictly local admin. Design phase completed: vision, architecture decisions and a full 13-milestone roadmap.',
        details: 'A family server designed as a digital memory: memories arrive, are stored reliably and stay browsable by the family — no third-party cloud. Framing is complete: 17 decision documents, 13 feature sheets and a milestone roadmap (L0 → L12) steered through iasit.',
        highlights: [
          'Reliable upload and storage: sync state machine, checksums, local backup/restore',
          'Android gallery + strictly local web admin (documented local-only enforcement)',
          'Device pairing, groups, audiences and memory visibility',
          'Network access planned through Cloudflare Tunnel, Node/TypeScript monorepo with shared packages',
        ],
        status: 'design phase',
      },
      2: {
        kind: 'Scientific simulation',
        role: 'Full stack developer',
        desc: 'Emergent evolution observatory: a population of organisms is born, mutates, recombines and speciates on a hex grid — nothing is scripted, everything emerges. Deterministic headless engine (seeded RNG, state hashing), Web Worker simulation and live tracking of 12 genetic traits.',
        details: "The goal isn't to program evolution but to create the conditions where it emerges: some gene pools grow more frequent, species form, and the observatory makes that data beautiful and manipulable. The project was deliberately rebooted mid-course to refocus its core — the previous version stays archived.",
        highlights: [
          'Full genetics: genome, phenotype, mutation, recombination, automatically classified speciation',
          'Deterministic headless engine: seeded RNG, state hashing, runs without UI for measurement',
          'Deterministic world generation (biomes, hydrology, terrain) with a local library of reloadable terrains',
          '160×90 PixiJS atlas with overlays, pan/zoom camera and 12 average traits tracked live',
          'Offline analysis tooling: benchmarks, speciation probes, endurance runs, data export',
        ],
        status: 'on hold',
      },
      3: {
        kind: 'Dev tooling',
        role: 'Full stack developer',
        desc: 'Steering tool for AI-agent-assisted development: traceable tasks, executions and findings, canonical prompt generation (run / verify / fix) and full batch orchestration. It drives the backlog of my other side projects — 580 commits in two months.',
        details: "Born from AI-agent-assisted development: the tool traces everything that matters (tasks, executions, findings) and generates canonical prompts executed by an external agent — the app itself runs no AI, its scope is deliberately bounded. It's the meta-tool of the batch: kin and vorrery embed its steering data.",
        highlights: [
          'Canonical Task / TaskExecution / VerificationFinding formats, status as the single source of truth',
          'run / verify / fix / next prompts in dual rendering: fullPrompt + compactInstruction',
          'Batch mode: orchestrating a whole task range (run → verify → fix → re-verify) with CLI/runtime parity',
          'Agent registry and documented handoff chain (analyst → … → release-operator)',
          'Sigma.js context graph with focus mode, repo file index, artifact reconciliation',
        ],
        status: 'in service',
      },
      4: {
        kind: 'Real-time simulator',
        role: 'Full stack developer',
        desc: "Physically-based watercolor simulator in the browser: water flows, pigment granulates and darkens as it dries, just like on real paper. Shallow-water fluid solver (SIGGRAPH '97 model) implemented from scratch in WebGL2 shaders, Kubelka-Munk optical rendering and 52 hand-calibrated pigments.",
        details: 'A from-scratch reimplementation of the shallow-water model from Curtis et al. (Computer-Generated Watercolor, SIGGRAPH 1997): water flows along paper slope and grain, pigment is advected, granulates into hollows and darkens at drying edges. Rendering composes layers optically through Kubelka-Munk — no naive RGB blending.',
        highlights: [
          'Fluid solver 100% in WebGL2 shaders: splat, semi-Lagrangian advection, 20× Jacobi, capillarity, edge darkening',
          '52 hand-calibrated pigments (masstone/undertone, granulation, staining), 12 concurrent through dynamic slots',
          'Procedural paper with deterministic seed: height map + absorption map, 3 presets',
          "Pressure-aware brush with pointer/coalesced events, X-ray mode over the solver's internal state",
          'Headless verification with Playwright + SwiftShader and replayable scenarios',
        ],
        status: 'active',
      },
      5: {
        kind: '3D web app',
        role: 'Full stack developer',
        desc: "3D orbital forge: deterministic procedural planets build up layer by layer before the user's eyes, then join a living system model. 32-body gravity lab, black holes with gravitational lensing, Web Worker generation and a fully unit-tested math layer.",
        details: 'The stance: make generation visible. Each planet walks a timeline of layers (orbit, proto-sphere, geology, relief, hydrosphere, climate, biomes, atmosphere, moons…) where every step changes the on-screen scene. Simplified physical constraints (mass, gravity, albedo, pressure) drive the archetype and habitability warnings.',
        highlights: [
          'Deterministic procedural forge with visible layers, generation in Web Workers off the main thread',
          'Gravity lab: 32 bodies, mass/position/velocity gizmos, trajectory predictions, Hill spheres, undo/redo',
          'Compact objects: black holes (Doppler accretion disk, gravitational lensing), pulsars, neutron stars',
          'Kids scene with orbital sonification and audio narration',
          'Fully tested math layer: every *.ts module has its *.test.ts',
        ],
        status: 'active',
      },
    },
  },
}

export const getMockDataLocale = (lang: Language): LocalizedMockData => mockDataLocales[lang]

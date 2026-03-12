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
}

export const mockDataLocales: Record<Language, LocalizedMockData> = {
  fr: {
    profile: {
      title: 'Développeur Front End',
      subtitle: 'Industrie · UI/UX · Multi Plateforme',
          bio: 'Développeur Front-End Senior avec 13 ans d’expérience, j’ai évolué dans des secteurs industriels exigeants (énergie, nucléaire, défense, IIoT). J’ai appris à concevoir des interfaces intuitives et fiables, en collaborant avec des équipes pluridisciplinaires et en adaptant les solutions aux besoins métier. Curieux, rigoureux et orienté qualité, je maîtrise les architectures modernes (micro-frontend, Vue, React, TypeScript) et je place l’expérience utilisateur au cœur de chaque projet.',
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
              { label: 'développement\ncontinu' },
              { label: 'plateformes\nsimultanées' },
              { label: 'temps réel\nterrain' },
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
              { label: 'projets\nindustriels' },
              { label: 'clients grands\ncomptes' },
              { label: 'temps réel\nUnity 3D' },
            ],
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
  },
  en: {
    profile: {
      title: 'Senior Frontend Engineer',
      subtitle: 'Industrial · UI/UX · Multi-Platform',
        bio: 'Senior Front-End Developer with 13 years of experience in demanding industrial sectors (energy, nuclear, defense, IIoT). I have learned to design intuitive and reliable interfaces, collaborating with multidisciplinary teams and adapting solutions to business needs. Curious, rigorous, and quality-oriented, I master modern architectures (micro-frontend, Vue, React, TypeScript) and put user experience at the heart of every project.',
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
      '1': {
        company: 'Schneider Electric',
        employer: 'R&D Consultant — Datacorp',
        missions: {
          '11': {
            badge: 'Frontend Developer',
            context: 'Industrial Automation Edge (IECA)',
            desc: 'Development of industrial Edge applications in a micro-frontend architecture (single-spa) with Vue 3 + TypeScript. Active contribution across the Scrum project lifecycle (refinement, sprint planning, daily, review, retrospective), with a constant focus on quality, performance and accessibility.',
            cardSummary: 'Frontend developer on Schneider\'s IIoT Edge platform: designed shared #vue3 #typescript components across teams, structured a #single-spa #microfrontend architecture, industrialized quality with #jest and #sonarqube, and contributed to #scrum delivery focused on performance and maintainability.',
            tasks: [
              'Design and develop reusable frontend components shared across the different project teams',
              'Implement a micro-frontend architecture',
              'Implement unit tests using Jest',
              'Monitor application performance and reliability, and improve code quality with SonarQube',
              'Continuously improve the project architecture and scalability',
            ],
            retrospective: 'A highly enriching first large-scale web experience in a demanding industrial context. This mission helped me solidify frontend engineering practices, deepen my micro-frontend architecture skills, and above all, develop a strong technical and methodological rigor essential for high-quality, high-stakes projects.',
            metrics: [],
          },
          '12': {
            badge: 'C# / Unity Developer',
            context: 'Augmented Operator Advisor (AOA) — Industrial AR Application',
            desc: 'Built cross-platform AR app (Android, iOS, Windows) for industrial operators over 6 years. Designed and implemented operator interfaces, managed complex AR layer state management.',
            cardSummary: 'C# / #unity developer on a cross-platform industrial #ar product: built operator-facing interfaces across #mobile and desktop, structured frontend architecture, implemented resilient #offline behavior, handled server-side #api communication, and improved production reliability across releases.',
            tasks: [
              'Design and development of a fully responsive interface (iOS, Android, Windows — portrait and landscape modes)',
              'Build packaging, preparation and deployment to the relevant stores (Google Play, App Store, SESU)',
              'Creation of a dedicated unit testing tool for Unity 3D, integrated into the pre-build and post-build pipeline',
              'Implementation of an externalized style system enabling white-label delivery for OEM clients',
              'Design of the application frontend architecture: modular split, coding conventions and clear responsibility boundaries',
              'Offline mode development with automatic data synchronization on connection restoration',
              'Deserialization and backward compatibility management across project versions: legacy format parsing and silent on-the-fly migration',
              'Implementation of the communication layer with the project server: HTTP requests, network error handling and reconnection logic',
              'Application data lifecycle management: cache invalidation, refresh strategy and stale data cleanup',
            ],
            metrics: [
              { label: 'years of\ncontinuous dev' },
              { label: 'simultaneous\nplatforms' },
              { label: 'real-time\nfield usage' },
            ],
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
            desc: 'Over four years at Oreka Engineering, I role was C# / Unity 3D Developer on VR/AR projects with a strong industrial focus. My responsibilities were highly versatile: in-depth client needs analysis, participation in commercial proposals, 3D modeling and integration, UI/UX design for immersive environments, and development of high-performance interactive applications. I collaborated with major industrial sector clients (EDF, Suez, DCNS, RTE, MBDA), meeting high technical requirements, particularly in sensitive contexts such as nuclear or defense. This experience gave me solid expertise in Unity, C#, VR/AR, immersive UI/UX, and 3D production tools (SolidWorks, 3ds Max), while strengthening my ability to understand business needs and propose adapted, coherent and effective technical solutions.',
            cardSummary: '#csharp on industrial #vr #ar programs for enterprise clients: in-depth client needs analysis, 3D modeling and integration #3dsmax #unity3D, development of 2D/3D interactive systems, immersive UI/UX design, performance optimization, implementation of business scenarios, delivery (debug, demo support), contribution to visual and technical quality, collaboration in sensitive contexts (nuclear, defense).',
            tasks: [
              'Development of 2D/3D interfaces and interactive systems in Unity (C#): scene architecture, gameplay scripting, event management, and VR/AR interaction systems.',
              'Integration and processing of CAD models (SolidWorks): mesh optimization, baking, LODs, lightmaps, and material/shader tuning.',
              'Performance optimization for industrial environments: Unity profiling, CPU/GPU cost reduction, object pooling, and optimization of assets and import pipelines.',
              'Development of specific technical modules: I/O handling, business logic, state systems, and dynamic content loading.',
              'Implementation of interactive scenarios based on business procedures: state graphs, conditional logic, and triggers.',
              'Design of immersive interfaces tailored for VR/AR usage: ergonomics, spatialization, and controller/gamepad interactions.',
              'Participation in the technical definition of client needs: specifications, feasibility, technology choices, and functional mockups.',
              'Contribution to visual and technical quality: art direction, asset consistency, and UI/UX refinements.',
              'Preparation and delivery of internal and client builds: partial build automation, debugging, and demo support.',
            ],
            retrospective: 'This experience taught me to tackle demanding technical challenges with method, to structure my thinking around the real needs of users and business teams, and to find the right balance between performance, ergonomics and feasibility. It also strengthened my versatility, from client need analysis through to final delivery, while improving my ability to collaborate effectively across diverse project environments. Over the years, it gave me solid foundations in communication, adaptability and interdisciplinary teamwork, which still guide how I design, prioritize and work with teams today.',
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
  },
}

export const getMockDataLocale = (lang: Language): LocalizedMockData => mockDataLocales[lang]

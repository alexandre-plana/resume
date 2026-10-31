import type { Language } from '../locales'
import type { Skill } from '../types'

// Content specific to the printable detailed CV. The online resume keeps its own wording
// (src/api/mockData*.ts); everything here only overrides what this version prints.
// Texts keep #tech tags, rendered inline like on the online resume.

export interface MissionOverride {
  title?: string
  badge?: string
  period?: string
  desc?: string
  tasks?: string[]
  tags?: string[]
  // Team and role, shown under the mission title.
  team?: string
  // Short team/role line for the cover timeline.
  note?: string
  // One or two sentences for the cover timeline card.
  summary?: string
  // Extra paragraph inside the card (e.g. companion tools).
  extra?: string
}

export interface ProjectRow {
  repo: string
  title: string
  text: string
  tags?: string[]
}

export const PROFILE: Record<Language, { title: string; subtitle: string; bio: string }> = {
  fr: {
    title: 'Développeur front-end / full-stack — Vue 3 · React · TypeScript',
    subtitle: 'Applications industrielles · Micro-frontends · IA',
    bio: 'Développeur spécialisé dans les applications industrielles, j’ai construit une expertise front-end et UI/UX. Chez Schneider Electric, j’ai développé en Vue 3 plusieurs micro-frontends de la plateforme IIoT IECA ainsi que des composants partagés entre les équipes. Sur Xistar, j’interviens de l’interface opérateur aux services qui intègrent et diffusent les données opérationnelles. J’aborde le développement en reliant usages métier, architecture et contraintes techniques, avec une attention portée à la cohérence du produit, de la maquette au code livré.',
  },
  en: {
    title: 'Front-end / full-stack developer — Vue 3 · React · TypeScript',
    subtitle: 'Industrial applications · Micro-frontends · AI',
    bio: 'I develop industrial applications, drawing on a strong front-end and UI/UX background. At Schneider Electric, I built several Vue 3 micro-frontends of the IECA IIoT platform, along with components shared across teams. On Xistar, I work from the operator interface through to the services that ingest and distribute operational data. My approach connects user needs, architecture and technical constraints, with close attention to product consistency from the initial design to delivered code.',
  },
}

// One color per technology, shared by the sidebar skills and the cover timeline chips.
// Kinds pick colors from the online tech-tag themes (src/theme/techTagTheme.ts).
const TECH_KINDS: Record<string, string> = {
  'vue 3': 'vue3',
  pinia: 'green',
  react: 'react',
  'single-spa': 'spa',
  tailwind: 'tailwind',
  typescript: 'ts',
  'c#': 'csharp',
  python: 'green',
  go: 'green',
  claude: 'mcp',
  codex: 'mcp',
  jev: 'mcp',
  'agents ia': 'mcp',
  'ai agents': 'mcp',
  bmad: 'green',
  mqtt: 'mqtt',
  'api rest': 'apirest',
  'rest api': 'apirest',
  'socket.io': 'socketio',
  maplibre: 'maplibre',
  vitest: 'vitest',
  sonarqube: 'sonarqube',
  docker: 'docker',
  'gitlab ci': 'gitlabci',
  figma: 'figma',
  shadcn: 'green',
  npm: 'green',
  unity: 'unity',
  'unity 3d': 'unity',
  wpf: 'wpf',
  android: 'android',
  ios: 'green',
}

export const techChip = (label: string) => ({ l: label, k: TECH_KINDS[label.toLowerCase()] ?? 'green' })

const tag = (l: string, k: string) => ({ l, k: TECH_KINDS[l.toLowerCase()] ?? k })

// Sidebar skills for this version: web, Vue and AI first. Kinds pick colors from the online tech-tag themes.
export const SKILLS: Record<Language, Skill[]> = {
  fr: [
    {
      id: 'frontend',
      cat: 'Front-end',
      featured: true,
      tags: [tag('Vue 3', 'vue3'), tag('Pinia', 'green'), tag('React', 'react'), tag('single-spa', 'spa'), tag('Tailwind', 'tailwind')],
    },
    {
      id: 'ai',
      cat: 'IA',
      featured: true,
      tags: [tag('Claude', 'mcp'), tag('Codex', 'mcp'), tag('Jev', 'mcp'), tag('agents IA', 'mcp')],
    },
    {
      id: 'languages',
      cat: 'Langages',
      featured: false,
      tags: [tag('TypeScript', 'ts'), tag('C#', 'csharp'), tag('Python', 'green')],
    },
    {
      id: 'services',
      cat: 'Back-end',
      featured: false,
      tags: [tag('MQTT', 'mqtt'), tag('API REST', 'apirest'), tag('Socket.IO', 'socketio')],
    },
    {
      id: 'quality',
      cat: 'Qualité & livraison',
      featured: false,
      tags: [tag('Vitest', 'vitest'), tag('SonarQube', 'sonarqube'), tag('Docker', 'docker'), tag('GitLab CI', 'gitlabci')],
    },
    {
      id: 'design',
      cat: 'Design & 3D',
      featured: false,
      tags: [tag('Figma', 'figma'), tag('Unity 3D', 'unity')],
    },
  ],
  en: [
    {
      id: 'frontend',
      cat: 'Front-end',
      featured: true,
      tags: [tag('Vue 3', 'vue3'), tag('Pinia', 'green'), tag('React', 'react'), tag('single-spa', 'spa'), tag('Tailwind', 'tailwind')],
    },
    {
      id: 'ai',
      cat: 'AI',
      featured: true,
      tags: [tag('Claude', 'mcp'), tag('Codex', 'mcp'), tag('Jev', 'mcp'), tag('AI agents', 'mcp')],
    },
    {
      id: 'languages',
      cat: 'Programming languages',
      featured: false,
      tags: [tag('TypeScript', 'ts'), tag('C#', 'csharp'), tag('Python', 'green')],
    },
    {
      id: 'services',
      cat: 'Back-end',
      featured: false,
      tags: [tag('MQTT', 'mqtt'), tag('REST API', 'apirest'), tag('Socket.IO', 'socketio')],
    },
    {
      id: 'quality',
      cat: 'Quality & delivery',
      featured: false,
      tags: [tag('Vitest', 'vitest'), tag('SonarQube', 'sonarqube'), tag('Docker', 'docker'), tag('GitLab CI', 'gitlabci')],
    },
    {
      id: 'design',
      cat: 'Design & 3D',
      featured: false,
      tags: [tag('Figma', 'figma'), tag('Unity 3D', 'unity')],
    },
  ],
}

// Employer first, client second, in both languages.
export const HEADS: Record<Language, Record<number, { company: string; employer: string; period?: string }>> = {
  fr: {
    3: { company: 'Datacorp', employer: 'Consultant R&D — client X-PERT', period: 'mars 2026 – aujourd’hui' },
    1: { company: 'Datacorp', employer: 'Consultant R&D — client Schneider Electric' },
    2: { company: 'Oreka Ingénierie', employer: 'Développeur C# / Unity 3D' },
  },
  en: {
    3: { company: 'Datacorp', employer: 'R&D Consultant — client X-PERT', period: 'Mar 2026 – present' },
    1: { company: 'Datacorp', employer: 'R&D Consultant — client Schneider Electric' },
    2: { company: 'Oreka Ingénierie', employer: 'C# / Unity 3D Developer' },
  },
}

export const MISSIONS: Record<Language, Record<number, MissionOverride>> = {
  fr: {
    11: {
      badge: 'Développeur front-end',
      team: '4 équipes Scrum d’une dizaine de personnes ; environ 80 personnes au total avec le management, la validation, les tests automatisés, la cybersécurité et les architectes solution',
      note: '4 équipes Scrum · ~80 personnes',
      summary: 'Plateforme IIoT Edge découpée en micro-frontends Vue 3. J’ai participé à leur mise en place et à leurs évolutions, créé le gabarit commun, contribué à la bibliothèque de composants partagés et relu le code des autres équipes.',
      desc: 'IECA est la plateforme IIoT Edge de Schneider Electric : une quinzaine de micro-frontends Vue 3 chargés par single-spa, adossés à des services Go. J’ai participé à leur mise en place et à leurs évolutions, en particulier pour ceux listés ci-dessous, et créé le gabarit commun.',
      tasks: [
        'Mise en place et évolution des micro-frontends en #vue3, #typescript et #pinia (connectivité, calculs, conditions, alertes, scripting, données et administration) et création du gabarit commun.',
        'Au-delà de mon équipe, toujours côté front-end : composants partagés de la bibliothèque commune (table configurable, sélecteur de propriétés, socle de routage) et revues de code, y compris sur les pull requests des autres équipes.',
        'Exigence de qualité : tests unitaires #vitest et #jest des composants, stores et utilitaires, analyse #sonarqube ; une base de code tenue propre et très peu d’anomalies remontées.',
        'Extensions ponctuelles du back-end pour les besoins des évolutions front-end.',
      ],
      tags: ['vue3', 'typescript', 'single-spa', 'pinia', 'vitest', 'jest', 'sonarqube', 'docker', 'figma', 'jira'],
    },
    12: {
      badge: 'Front-end puis main dev',
      team: '3 équipes Scrum (7, 5 et 4 personnes) ; évolution de développeur front-end à main dev, jusqu’à l’arrêt du projet',
      note: '3 équipes Scrum',
      desc: 'Solution de réalité augmentée pour opérateurs industriels, composée de trois modules : une application web, une application mobile multiplateforme (Android, iOS, Windows) en C# sous Unity et un runtime. J’étais en charge du design, des maquettes, de l’architecture front-end, du développement, des livraisons et des développements spécifiques clients.',
      tasks: [
        'Design, maquettes et architecture front-end d’une interface adaptée aux trois plateformes, en portrait et en paysage.',
        'Fonctionnement hors ligne et synchronisation #http, contributions au serveur de projets en #python.',
        'Rétrocompatibilité des projets : lecture des anciens formats et migration au chargement.',
        'Système de styles externalisé et développements spécifiques pour les clients #oem.',
        'Livraisons sur les différents stores (Android, iOS, Windows).',
        'Développement d’un asset #unity qui joue des tests fonctionnels après le build, sur une vraie tablette #ios, #android ou #windows.',
        'Maintenance en fin de vie du projet : mises à jour de cybersécurité, demandes de modification clients (PCR) et nouvelles livraisons.',
      ],
      tags: ['unity', 'c#', 'ar', 'android', 'ios', 'windows', 'python', 'figma', 'jira'],
    },
    31: {
      title: 'Xistar — poste de commandement tactique maritime',
      team: 'Équipe de 3 développeurs épaulés par des agents IA, rôles pluridisciplinaires',
      note: '3 développeurs + agents IA · de la conception à la livraison',
      summary: 'Application web pour les opérateurs : cartographie tactique, alertes, pilotage multi-écran en temps réel et rejeu. Je couvre la conception, l’interface React, une partie des services Go et la livraison.',
      desc: 'Poste de commandement accessible depuis le navigateur : situation tactique, conduite de missions et de drones, alertes, pilotage multi-écran et rejeu. J’interviens de la conception fonctionnelle à la livraison, surtout côté front-end.',
      tasks: [
        'Conception fonctionnelle, maquettes, design et décisions d’architecture (ADR) à partir des besoins opérationnels.',
        'Interface opérateur en #typescript et #react : espace de travail #dockview, cartographie #maplibre et #deckgl en symbologie OTAN APP-6.',
        'Application multi-écran pilotée depuis un poste maître : ensembles d’écrans, envoi de vues à distance et contrôle en temps réel de chaque affichage ; rejeu temporel pour les débriefings.',
        'Services #go, dans une moindre mesure : ingestion des flux AIS, NMEA, CoT et MAVLink, publication via #mqtt et API REST, alertes avec escalade.',
        'Tests de bout en bout, images #docker et pipelines #gitlab-ci jusqu’à la livraison.',
      ],
      extra: 'Outils associés : application mobile d’alertes et d’ordres (#react, #socketio), émulateur de mur d’écrans, simulateur de drones et de flotte (#nodejs, #mqtt).',
      tags: ['typescript', 'react', 'go', 'dockview', 'maplibre', 'deck.gl', 'mqtt', 'docker', 'gitlab ci'],
    },
    35: {
      title: 'Workflow de développement par agents IA',
      badge: 'Conception & orchestration d’agents IA',
      desc: 'Workflow de développement assisté par agents IA, inspiré de la méthode BMAD et utilisé sur Xistar et sur d’autres projets. Plusieurs fournisseurs d’IA y sont combinés (Claude, Codex et Jev) : l’un produit, un autre relit.',
      tasks: [
        'Agents spécialisés par domaine et orchestrateur qui leur répartit le travail.',
        'Agents dédiés à la non-régression, appuyés sur des parcours utilisateurs et un design system strictement défini.',
        'Exécution isolée dans un conteneur #docker par projet, exécutions distribuées par #gitlab-ci vers une machine dédiée.',
        'Outil de suivi en #vue3 et #typescript alimenté par les hooks des agents.',
        'Rapports de session analysés pour corriger les consignes des agents et le workflow.',
      ],
      tags: ['claude', 'codex', 'jev', 'bmad', 'docker', 'gitlab ci', 'vue3', 'typescript'],
    },
    36: {
      title: 'Design system de X-PERT',
      desc: 'Design system commun aux applications techniques, au site vitrine et à l’habillage des documents et vidéos de X-PERT.',
      tasks: [
        'Conception des composants et des interfaces sous #figma.',
        'Bibliothèque #react et #typescript basée sur #shadcn : composants courants et visualisations techniques (graphiques, treemaps, frises, cartographie, panneaux redimensionnables).',
        'Distribution via un registre #npm privé et documentation d’intégration.',
      ],
      tags: ['figma', 'react', 'typescript', 'shadcn', 'npm'],
    },
    21: {
      title: 'Serious games et simulateurs — EDF, RTE, AREVA, DCNS, SUEZ',
      badge: 'Conception & développement front-end',
      team: 'Équipes de 1 à 3 personnes',
      desc: 'Serious games, simulateurs et outils de visualisation pour l’industrie, le nucléaire et la défense. Mon travail portait surtout sur la conception, le design et le développement front-end des applications.',
      tasks: [
        'Analyse des besoins et des procédures métier, traduits en parcours, scénarios et maquettes.',
        'Interfaces et interactions 2D/3D en #csharp sous #unity, dont les dispositifs #vr et #ar.',
        'Intégration et optimisation de modèles CAO (#solidworks, #3dsmax) et des performances CPU/GPU, jusqu’à la livraison et aux démonstrations client.',
      ],
      tags: ['unity', 'c#', 'wpf', 'vr', 'uiux'],
    },
    26: { title: 'Formation en radioprotection' },
    22: { title: 'Prévention des troubles musculosquelettiques' },
    28: { title: 'Radioprotection en chirurgie interventionnelle' },
    24: { title: 'EMEM — enceinte mobile d’évacuation de matériel' },
    25: { title: 'Aeroball — formation au poste de contrôle' },
    27: { title: 'Maintenance des générateurs de vapeur' },
  },
  en: {
    11: {
      badge: 'Front-end developer',
      team: '4 Scrum teams of about ten people; around 80 people in total including management, validation, test automation, cybersecurity and solution architects',
      note: '4 Scrum teams · ~80 people',
      summary: 'An IIoT Edge platform split into Vue 3 micro-frontends. I helped set them up and evolve them, built the shared template, contributed to the shared component library and reviewed other teams’ code.',
      desc: 'IECA is Schneider Electric’s IIoT Edge platform: some fifteen Vue 3 micro-frontends loaded by single-spa, backed by Go services. I helped set them up and evolve them, especially those listed below, and built the shared template.',
      tasks: [
        'Set up and evolved the micro-frontends in #vue3, #typescript and #pinia (connectivity, computations, conditions, alerts, scripting, data and administration) and built the shared template.',
        'Beyond my own team, still on the front end: shared components in the common library (configurable table, property selector, routing foundation) and code reviews, including pull requests from other teams.',
        'Quality focus: #vitest and #jest unit tests for components, stores and utilities, #sonarqube analysis; a clean codebase with very few reported defects.',
        'Occasional back-end extensions needed by front-end changes.',
      ],
      tags: ['vue3', 'typescript', 'single-spa', 'pinia', 'vitest', 'jest', 'sonarqube', 'docker', 'figma', 'jira'],
    },
    12: {
      badge: 'Front-end, then main dev',
      team: '3 Scrum teams (7, 5 and 4 people); grew from front-end developer to main developer, until the project ended',
      note: '3 Scrum teams',
      desc: 'Augmented-reality solution for industrial operators, made of three modules: a web application, a cross-platform mobile app (Android, iOS, Windows) in C# with Unity, and a runtime. I was responsible for design, mockups, front-end architecture, development, releases and client-specific development.',
      tasks: [
        'Designed the interface, mockups and front-end architecture for three platforms, in portrait and landscape.',
        'Developed offline operation and #http synchronization, and contributed to the #python project server.',
        'Kept projects backward compatible by reading legacy formats and migrating them on load.',
        'Built an externalized style system and client-specific features for #oem customers.',
        'Shipped releases to each store (Android, iOS, Windows).',
        'Built a #unity asset that runs functional tests after the build on a real #ios, #android or #windows tablet.',
        'Maintained the product at end of life: cybersecurity updates, client change requests (PCRs) and new releases.',
      ],
      tags: ['unity', 'c#', 'ar', 'android', 'ios', 'windows', 'python', 'figma', 'jira'],
    },
    31: {
      title: 'Xistar — maritime tactical command center',
      team: 'Team of 3 developers working with AI agents, multidisciplinary roles',
      note: '3 developers + AI agents · from design to delivery',
      summary: 'A web app for operators: tactical mapping, alerts, real-time multi-screen control and replay. I cover design, the React interface, part of the Go services and delivery.',
      desc: 'A browser-based command center: tactical situation, mission and drone control, alerts, multi-screen operation and replay. I work from functional design to delivery, mostly on the front end.',
      tasks: [
        'Functional design, mockups, visual design and architecture decision records (ADRs) from operational requirements.',
        'Operator interface in #typescript and #react: #dockview workspace, #maplibre and #deckgl mapping with NATO APP-6 symbology.',
        'Multi-screen application driven from a master station: screen sets, remote view dispatch and real-time control of each display; time-based replay for debriefings.',
        '#go services, to a lesser extent: AIS, NMEA, CoT and MAVLink ingestion, publication over #mqtt and REST, alerts with escalation.',
        'End-to-end tests, #docker images and #gitlab-ci pipelines through to delivery.',
      ],
      extra: 'Companion tools: a mobile app for alerts and commands (#react, #socketio), a video-wall emulator, and a drone and fleet simulator (#nodejs, #mqtt).',
      tags: ['typescript', 'react', 'go', 'dockview', 'maplibre', 'deck.gl', 'mqtt', 'docker', 'gitlab ci'],
    },
    35: {
      title: 'AI-agent development workflow',
      badge: 'AI agent design & orchestration',
      desc: 'An AI-assisted development workflow inspired by the BMAD method and used on Xistar and other projects. Several AI providers are combined (Claude, Codex and Jev): one produces, another reviews.',
      tasks: [
        'Domain-specific agents and an orchestrator that dispatches work to them.',
        'Non-regression agents built on user journeys and a strictly defined design system.',
        'Isolated execution in one #docker container per project, with runs dispatched by #gitlab-ci to a dedicated machine.',
        'A #vue3 and #typescript tracking tool fed by agent hooks.',
        'Session reports analyzed to correct agent instructions and the workflow.',
      ],
      tags: ['claude', 'codex', 'jev', 'bmad', 'docker', 'gitlab ci', 'vue3', 'typescript'],
    },
    36: {
      title: 'X-PERT design system',
      desc: 'A design system shared by X-PERT’s technical applications, website, documents and videos.',
      tasks: [
        'Designed components and interfaces in #figma.',
        'Built a #react and #typescript library on #shadcn: common components and technical visualizations (charts, treemaps, timelines, mapping, resizable panels).',
        'Distributed it through a private #npm registry, with integration documentation.',
      ],
      tags: ['figma', 'react', 'typescript', 'shadcn', 'npm'],
    },
    21: {
      title: 'Serious games and simulators — EDF, RTE, AREVA, DCNS, SUEZ',
      badge: 'Design & front-end development',
      team: 'Teams of 1 to 3 people',
      desc: 'Serious games, simulators and visualization tools for industry, nuclear and defense. My work focused on the design and front-end development of the applications.',
      tasks: [
        'Analyzed requirements and operating procedures and turned them into workflows, scenarios and mockups.',
        'Built 2D/3D interfaces and interactions in #csharp with #unity, including #vr and #ar devices.',
        'Integrated and optimized CAD models (#solidworks, #3dsmax) and CPU/GPU performance, through to delivery and client demos.',
      ],
      tags: ['unity', 'c#', 'wpf', 'vr', 'uiux'],
    },
    26: { title: 'Radiation-safety training' },
    22: { title: 'Musculoskeletal disorder prevention' },
    28: { title: 'Radiation safety in interventional surgery' },
    24: { title: 'EMEM — mobile equipment evacuation enclosure' },
    25: { title: 'Aeroball — control-station training' },
    27: { title: 'Steam-generator maintenance' },
  },
}

// Personal projects that only this version lists (see alexandre-plana/time-weave and alexandre-plana/multi-screen).
export interface PersonalProjectRow {
  name: string
  kind: string
  status: string
  period: string
  role: string
  desc: string
  stack: string[]
}

export const EXTRA_PERSONAL_PROJECTS: Record<Language, PersonalProjectRow[]> = {
  fr: [
    {
      name: 'time-weave',
      kind: 'Bibliothèque de timelines React',
      status: 'en développement',
      period: '2026',
      role: 'Conception & développement',
      desc: 'Bibliothèque #typescript et #react de timelines interactives et synchronisées avec l’application : lignes hiérarchiques, lecture, clés de navigation et mode Direct, sur un moteur temporel indépendant de React.',
      stack: ['react', 'typescript', 'vitest', 'playwright'],
    },
    {
      name: 'multi-screen',
      kind: 'Bibliothèque de diffusion multi-écran',
      status: 'en développement',
      period: '2026',
      role: 'Conception & développement',
      desc: 'Bibliothèque #typescript qui décrit un écran comme une donnée JSON de panneaux #dockview, le route à l’exécution et le diffuse vers n’importe quel appareil, piloté à distance depuis une régie : mise à jour par patch, thème, rotation, accusés de réception.',
      stack: ['typescript', 'dockview', 'react', 'nodejs', 'vitest'],
    },
  ],
  en: [
    {
      name: 'time-weave',
      kind: 'React timeline library',
      status: 'in development',
      period: '2026',
      role: 'Design & development',
      desc: 'A #typescript and #react library for interactive timelines synchronized with the host app: hierarchical rows, playback, navigation keys and live mode, on a time engine independent of React.',
      stack: ['react', 'typescript', 'vitest', 'playwright'],
    },
    {
      name: 'multi-screen',
      kind: 'Multi-screen broadcasting library',
      status: 'in development',
      period: '2026',
      role: 'Design & development',
      desc: 'A #typescript library that describes a screen as JSON data made of #dockview panels, routes it at runtime and pushes it to any device, driven remotely from a control room: patch updates, theme, rotation, acknowledgements.',
      stack: ['typescript', 'dockview', 'react', 'nodejs', 'vitest'],
    },
  ],
}

// Oreka projects in the detail pages: one line each, key projects first.
export const OREKA_PROJECTS: Record<Language, ProjectRow[]> = {
  fr: [
    { repo: 'oreka/dosicase', title: 'Dosicase · 2015 – 2017', text: 'Simulateur de formation à la radioprotection pour chantiers-écoles : parcours pédagogique, interface et interactions.', tags: ['uiux', 'unity'] },
    { repo: 'suez/radioprotection', title: 'Formation en radioprotection · 2014 – 2015', text: 'Scénarios d’accident simulés et gestion des équipes de secours.', tags: ['unity', 'c#'] },
    { repo: 'simulhom', title: 'Prévention des TMS · 2015 – 2017', text: 'Simulateur ergonomique 3D conçu avec des ergonomes : parcours, interface et indicateurs de risque postural.', tags: ['uiux', 'unity'] },
    { repo: 'chu-caen/emsim-basic', title: 'Chirurgie interventionnelle · 2013 – 2015', text: 'Simulation médicale : dosimétrie et zones exposées visualisées au fil des scénarios.', tags: ['unity', 'c#'] },
    { repo: 'areva/emem', title: 'EMEM · 2014 – 2016', text: 'Simulation 3D d’une enceinte mobile d’évacuation de matériel nucléaire, interfaces opérateur en WPF.', tags: ['unity', 'wpf'] },
    { repo: 'edf/aeroball', title: 'Aeroball · 2014 – 2015', text: 'Serious game de formation au poste de contrôle Aeroball.', tags: ['unity', 'c#'] },
    { repo: 'suez/maintenance-generateurs-de-vapeurs', title: 'Générateurs de vapeur · 2014 – 2015', text: 'Serious game préparant les interventions de maintenance pendant les arrêts de tranche.', tags: ['unity', 'c#'] },
  ],
  en: [
    { repo: 'oreka/dosicase', title: 'Dosicase · 2015 – 2017', text: 'Radiation-safety training simulator for practice sites: learning path, interface and interactions.', tags: ['uiux', 'unity'] },
    { repo: 'suez/radioprotection', title: 'Radiation-safety training · 2014 – 2015', text: 'Simulated accident scenarios and rescue-team management.', tags: ['unity', 'c#'] },
    { repo: 'simulhom', title: 'MSD prevention · 2015 – 2017', text: '3D ergonomics simulator designed with ergonomists: workflows, interface and postural-risk indicators.', tags: ['uiux', 'unity'] },
    { repo: 'chu-caen/emsim-basic', title: 'Interventional surgery · 2013 – 2015', text: 'Medical simulation: dosimetry and exposed areas shown throughout the scenarios.', tags: ['unity', 'c#'] },
    { repo: 'areva/emem', title: 'EMEM · 2014 – 2016', text: '3D simulation of a mobile enclosure for evacuating nuclear equipment, with WPF operator interfaces.', tags: ['unity', 'wpf'] },
    { repo: 'edf/aeroball', title: 'Aeroball · 2014 – 2015', text: 'Serious game for training on the Aeroball control station.', tags: ['unity', 'c#'] },
    { repo: 'suez/maintenance-generateurs-de-vapeurs', title: 'Steam generators · 2014 – 2015', text: 'Serious game preparing maintenance work during plant outages.', tags: ['unity', 'c#'] },
  ],
}

// French typography: narrow no-break space before ; : ! ? and inside « », curly apostrophes.
export const frenchTypography = (text: string): string =>
  text
    .replace(/'/g, '’')
    .replace(/ ([;:!?»])/g, ' $1')
    .replace(/« /g, '« ')

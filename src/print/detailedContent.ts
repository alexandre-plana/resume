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
    bio: 'Treize ans d’applications industrielles, de la 3D temps réel au web. Chez Schneider Electric, j’ai créé plusieurs micro-frontends Vue 3 de la plateforme IIoT IECA, dont le gabarit commun, et tenu un rôle transverse sur les composants partagés et la revue de code. Sur Xistar, je couvre la conception, le front-end, une partie du back-end en Go et la livraison, avec des agents IA que je conçois et orchestre.',
  },
  en: {
    title: 'Front-end / full-stack developer — Vue 3 · React · TypeScript',
    subtitle: 'Industrial applications · Micro-frontends · AI',
    bio: 'Thirteen years of industrial applications, from real-time 3D to the web. At Schneider Electric, I built several Vue 3 micro-frontends of the IECA IIoT platform, including the shared template, and held a cross-team role on shared components and code review. On Xistar, I cover design, front-end, part of the Go back end and delivery, working with AI agents I design and orchestrate.',
  },
}

const tag = (l: string, k: string) => ({ l, k })

// Sidebar skills for this version: web, Vue and AI first. Kinds pick colors from the online tech-tag themes.
export const SKILLS: Record<Language, Skill[]> = {
  fr: [
    {
      id: 'frontend',
      cat: 'Front-end',
      featured: true,
      tags: [tag('Vue 3', 'vue3'), tag('Pinia', 'green'), tag('React', 'react'), tag('TypeScript', 'ts'), tag('single-spa', 'spa'), tag('Tailwind', 'tailwind')],
    },
    {
      id: 'ai',
      cat: 'IA',
      featured: true,
      tags: [tag('Claude', 'mcp'), tag('Codex', 'mcp'), tag('agents IA', 'mcp')],
    },
    {
      id: 'services',
      cat: 'Back-end',
      featured: false,
      tags: [tag('Go', 'green'), tag('MQTT', 'mqtt'), tag('API REST', 'apirest')],
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
      tags: [tag('Figma', 'figma'), tag('Unity 3D', 'unity'), tag('C#', 'csharp')],
    },
  ],
  en: [
    {
      id: 'frontend',
      cat: 'Front-end',
      featured: true,
      tags: [tag('Vue 3', 'vue3'), tag('Pinia', 'green'), tag('React', 'react'), tag('TypeScript', 'ts'), tag('single-spa', 'spa'), tag('Tailwind', 'tailwind')],
    },
    {
      id: 'ai',
      cat: 'AI',
      featured: true,
      tags: [tag('Claude', 'mcp'), tag('Codex', 'mcp'), tag('AI agents', 'mcp')],
    },
    {
      id: 'services',
      cat: 'Back-end',
      featured: false,
      tags: [tag('Go', 'green'), tag('MQTT', 'mqtt'), tag('REST API', 'apirest')],
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
      tags: [tag('Figma', 'figma'), tag('Unity 3D', 'unity'), tag('C#', 'csharp')],
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
      team: '4 équipes Scrum d’une dizaine de personnes, environ 80 personnes avec la validation et les tests automatisés',
      note: '4 équipes Scrum · ~80 personnes · rôle transverse',
      desc: 'IECA est la plateforme IIoT Edge de Schneider Electric : une quinzaine de micro-frontends Vue 3 chargés par single-spa, adossés à des services Go. J’en ai créé cinq ou six ainsi que le gabarit commun, et participé au développement et à l’évolution de chacun de ceux listés ci-dessous.',
      tasks: [
        'Création de cinq ou six micro-frontends et du gabarit commun, puis évolution de l’ensemble en #vue3, #typescript et #pinia : connectivité, calculs, conditions, alertes, scripting, données et administration.',
        'Rôle transverse entre les équipes : composants partagés de la bibliothèque commune (table configurable, sélecteur de propriétés, socle de routage) et revues de code, y compris sur les pull requests des autres équipes.',
        'Exigence de qualité : tests unitaires #vitest et #jest des composants, stores et utilitaires, analyse #sonarqube ; une base de code tenue propre et très peu d’anomalies remontées.',
        'Extensions ponctuelles du back-end pour les besoins des évolutions front-end.',
      ],
      tags: ['vue3', 'typescript', 'single-spa', 'pinia', 'vitest', 'jest', 'sonarqube', 'docker', 'figma', 'jira'],
    },
    12: {
      badge: 'Front-end puis lead dev',
      team: '3 équipes Scrum (7, 5 et 4 personnes) ; entré comme développeur front-end, parti lead développeur',
      note: '3 équipes Scrum · front-end puis lead dev',
      desc: 'Application de réalité augmentée pour opérateurs industriels, en C# sous Unity, sur Android, iOS et Windows. J’étais en charge du design, des maquettes, de l’architecture front-end, du développement, des livraisons et des développements spécifiques clients.',
      tasks: [
        'Design, maquettes et architecture front-end d’une interface adaptée aux trois plateformes, en portrait et en paysage.',
        'Fonctionnement hors ligne et synchronisation #http, contributions au serveur de projets en #python.',
        'Rétrocompatibilité des projets : lecture des anciens formats et migration au chargement.',
        'Système de styles externalisé et développements spécifiques pour les clients #oem.',
        'Livraisons sur les différents stores et outil de tests unitaires intégré aux étapes de build #unity.',
      ],
      tags: ['unity', 'c#', 'ar', 'android', 'ios', 'windows', 'python', 'figma', 'jira'],
    },
    31: {
      title: 'Xistar — poste de commandement tactique maritime',
      team: 'Équipe de 3 développeurs épaulés par des agents IA, rôles pluridisciplinaires',
      note: '3 développeurs + agents IA · de la conception à la livraison',
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
      desc: 'Workflow de développement assisté par agents IA, inspiré de la méthode BMAD et utilisé sur Xistar. Claude et Codex y travaillent en tandem : l’un produit, l’autre relit.',
      tasks: [
        'Agents spécialisés par domaine et orchestrateur qui leur répartit le travail.',
        'Agents dédiés à la non-régression, appuyés sur des parcours utilisateurs et un design system strictement défini.',
        'Exécution isolée dans un conteneur #docker par projet, exécutions distribuées par #gitlab-ci vers une machine dédiée.',
        'Outil de suivi en #react et #typescript alimenté par les hooks des agents.',
        'Rapports de session analysés pour corriger les consignes des agents et le workflow.',
      ],
      tags: ['claude', 'codex', 'bmad', 'docker', 'gitlab ci', 'react', 'typescript'],
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
      team: '4 Scrum teams of about ten people, around 80 people including validation and test automation',
      note: '4 Scrum teams · ~80 people · cross-team role',
      desc: 'IECA is Schneider Electric’s IIoT Edge platform: some fifteen Vue 3 micro-frontends loaded by single-spa, backed by Go services. I built five or six of them plus the shared template, and took part in developing and evolving each one listed below.',
      tasks: [
        'Built five or six micro-frontends and the shared template, then evolved them all in #vue3, #typescript and #pinia: connectivity, computations, conditions, alerts, scripting, data and administration.',
        'Cross-team role: shared components in the common library (configurable table, property selector, routing foundation) and code reviews, including pull requests from other teams.',
        'Quality focus: #vitest and #jest unit tests for components, stores and utilities, #sonarqube analysis; a clean codebase with very few reported defects.',
        'Occasional back-end extensions needed by front-end changes.',
      ],
      tags: ['vue3', 'typescript', 'single-spa', 'pinia', 'vitest', 'jest', 'sonarqube', 'docker', 'figma', 'jira'],
    },
    12: {
      badge: 'Front-end, then lead dev',
      team: '3 Scrum teams (7, 5 and 4 people); joined as front-end developer, left as lead developer',
      note: '3 Scrum teams · front-end, then lead dev',
      desc: 'Augmented-reality application for industrial operators, in C# with Unity, on Android, iOS and Windows. I was responsible for design, mockups, front-end architecture, development, releases and client-specific development.',
      tasks: [
        'Designed the interface, mockups and front-end architecture for three platforms, in portrait and landscape.',
        'Developed offline operation and #http synchronization, and contributed to the #python project server.',
        'Kept projects backward compatible by reading legacy formats and migrating them on load.',
        'Built an externalized style system and client-specific features for #oem customers.',
        'Shipped releases to each store and built a unit-testing tool wired into #unity build steps.',
      ],
      tags: ['unity', 'c#', 'ar', 'android', 'ios', 'windows', 'python', 'figma', 'jira'],
    },
    31: {
      title: 'Xistar — maritime tactical command center',
      team: 'Team of 3 developers working with AI agents, multidisciplinary roles',
      note: '3 developers + AI agents · from design to delivery',
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
      desc: 'An AI-assisted development workflow inspired by the BMAD method and used on Xistar. Claude and Codex work in tandem: one produces, the other reviews.',
      tasks: [
        'Domain-specific agents and an orchestrator that dispatches work to them.',
        'Non-regression agents built on user journeys and a strictly defined design system.',
        'Isolated execution in one #docker container per project, with runs dispatched by #gitlab-ci to a dedicated machine.',
        'A #react and #typescript tracking tool fed by agent hooks.',
        'Session reports analyzed to correct agent instructions and the workflow.',
      ],
      tags: ['claude', 'codex', 'bmad', 'docker', 'gitlab ci', 'react', 'typescript'],
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

import { getMockDataLocale } from '../api/mockDataLocales'
import { localizeFormations, localizeSkills } from '../api/localizeData'
import { mockExperiences, mockFormation, mockPersonalProjects, mockProfile, mockSkills } from '../api/mockData'
import type { Language } from '../locales'
import { normalizeTechTag } from '../utils/techTokens'
import { IECA_DETAILS, type IecaDetails } from './iecaDetails'
import { firstSentence, RESUME_URL, shortTitle, toPlainText } from './onePage'

export interface DetailedLabels {
  document: string
  profile: string
  highlights: string
  vueFocus: string
  iecaDetails: string
  iecaModules: string
  iecaFoundation: string
  iecaQuality: string
  ipSprint: string
  webXpert: string
  companionTools: string
  industrialAr: string
  oreka: string
  keyProjects: string
  otherProjects: string
  personalProjects: string
  skills: string
  education: string
  languages: string
  online: string
  achievements: string
}

export interface CompanyHead {
  company: string
  employer: string
  period: string
}

export interface MissionView {
  title: string
  shortTitle: string
  badge: string
  period: string
  summary: string
  brief: string
  tasks: string[]
  stack: string[]
}

export interface DetailedModel {
  language: Language
  labels: DetailedLabels
  name: string
  title: string
  subtitle: string
  email: string
  phone: string
  url: string
  bio: string
  highlights: { title: string; text: string }[]
  skills: { cat: string; items: string[] }[]
  formations: { title: string; sub: string }[]
  languages: { label: string; level: string }[]
  schneiderWeb: { head: CompanyHead; mission: MissionView; details: IecaDetails }
  xpert: { head: CompanyHead; xistar: MissionView; companionTools: MissionView[]; missions: MissionView[] }
  schneiderAr: { head: CompanyHead; mission: MissionView }
  oreka: { head: CompanyHead; overview: MissionView; keyProjects: MissionView[]; otherProjects: MissionView[] }
  personalProjects: { name: string; kind: string; period: string; text: string; stack: string[] }[]
}

const LABELS: Record<Language, DetailedLabels> = {
  fr: {
    document: 'CV détaillé',
    profile: 'Profil',
    highlights: 'Expertise web en bref',
    vueFocus: 'Vue.js · micro-frontend — Schneider Electric',
    iecaDetails: 'IECA — détail technique',
    iecaModules: 'Domaines fonctionnels',
    iecaFoundation: 'Socle partagé',
    iecaQuality: 'Qualité & industrialisation',
    ipSprint: 'IP Sprint — prototypes mobiles',
    webXpert: 'Développement web — X-PERT',
    companionTools: 'Outils associés à Xistar',
    industrialAr: 'Application AR industrielle — Schneider Electric',
    oreka: 'Serious games & simulation — Oreka Ingénierie',
    keyProjects: 'Projets phares',
    otherProjects: 'Autres réalisations',
    personalProjects: 'Projets personnels web',
    skills: 'Compétences',
    education: 'Formation',
    languages: 'Langues',
    online: 'CV en ligne',
    achievements: 'Réalisations',
  },
  en: {
    document: 'Detailed resume',
    profile: 'Profile',
    highlights: 'Web expertise at a glance',
    vueFocus: 'Vue.js · micro-frontend — Schneider Electric',
    iecaDetails: 'IECA — technical deep dive',
    iecaModules: 'Functional areas',
    iecaFoundation: 'Shared foundation',
    iecaQuality: 'Quality & delivery',
    ipSprint: 'IP Sprint — mobile prototypes',
    webXpert: 'Web development — X-PERT',
    companionTools: 'Xistar companion tools',
    industrialAr: 'Industrial AR application — Schneider Electric',
    oreka: 'Serious games & simulation — Oreka Engineering',
    keyProjects: 'Key projects',
    otherProjects: 'Other projects',
    personalProjects: 'Personal web projects',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    online: 'Online resume',
    achievements: 'Achievements',
  },
}

// Every statement below summarizes facts already detailed in the resume data.
const HIGHLIGHTS: Record<Language, { title: string; text: string }[]> = {
  fr: [
    {
      title: 'Vue 3 · micro-frontend',
      text: 'Trois ans sur IECA, la plateforme IIoT Edge de Schneider Electric : modules single-spa, composants partagés, stores Pinia testés avec Jest et qualité suivie dans SonarQube.',
    },
    {
      title: 'React · TypeScript',
      text: 'Xistar, poste de commandement maritime dans le navigateur : espace de travail Dockview, cartographie MapLibre et deck.gl, flux temps réel MQTT et Socket.IO.',
    },
    {
      title: 'Design system',
      text: 'Composants conçus sous Figma, développés en React avec shadcn et distribués via un registre npm privé aux applications de X-PERT.',
    },
    {
      title: 'UX/UI & conception fonctionnelle',
      text: 'Depuis 2013, des besoins métier aux parcours et interfaces : serious games, simulateurs (Dosicase, Simulhom) et applications multiplateformes.',
    },
  ],
  en: [
    {
      title: 'Vue 3 · micro-frontend',
      text: 'Three years on IECA, Schneider Electric’s IIoT Edge platform: single-spa modules, shared components, Pinia stores tested with Jest and code quality tracked in SonarQube.',
    },
    {
      title: 'React · TypeScript',
      text: 'Xistar, a browser-based maritime command center: Dockview workspace, MapLibre and deck.gl mapping, real-time MQTT and Socket.IO feeds.',
    },
    {
      title: 'Design system',
      text: 'Components designed in Figma, built in React with shadcn and distributed to X-PERT applications through a private npm registry.',
    },
    {
      title: 'UX/UI & functional design',
      text: 'Since 2013, from business requirements to workflows and interfaces: serious games, simulators (Dosicase, Simulhom) and cross-platform applications.',
    },
  ],
}

const WEB_SKILLS: Record<Language, { cat: string; items: string[] }> = {
  fr: {
    cat: 'Écosystème web',
    items: ['Vue 3', 'Pinia', 'single-spa', 'React', 'Vite', 'Dockview', 'shadcn', 'MapLibre', 'deck.gl', 'Socket.IO', 'Tailwind', 'HTML / CSS', 'WebGL'],
  },
  en: {
    cat: 'Web ecosystem',
    items: ['Vue 3', 'Pinia', 'single-spa', 'React', 'Vite', 'Dockview', 'shadcn', 'MapLibre', 'deck.gl', 'Socket.IO', 'Tailwind', 'HTML / CSS', 'WebGL'],
  },
}

const XR_SKILLS: Record<Language, { cat: string; items: string[] }> = {
  fr: { cat: '3D temps réel & XR', items: ['Unity 3D', 'C#', 'VR / AR', 'WPF', 'SolidWorks', '3ds Max'] },
  en: { cat: 'Real-time 3D & XR', items: ['Unity 3D', 'C#', 'VR / AR', 'WPF', 'SolidWorks', '3ds Max'] },
}

// The web group above replaces the generic front-end group of the online resume.
const SKILL_GROUPS = ['languages', 'services', 'tools']

// Stack chips: only recognized technologies are shown, under their usual spelling.
const STACK_LABELS: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  react: 'React',
  vue3: 'Vue 3',
  singlespa: 'single-spa',
  go: 'Go',
  dockview: 'Dockview',
  maplibre: 'MapLibre',
  deckgl: 'deck.gl',
  mqtt: 'MQTT',
  apirest: 'API REST',
  node: 'Node.js',
  nodejs: 'Node.js',
  socketio: 'Socket.IO',
  vite: 'Vite',
  shadcn: 'shadcn',
  figma: 'Figma',
  npm: 'npm',
  html: 'HTML',
  css: 'CSS',
  webgl: 'WebGL',
  hyperframes: 'HyperFrames',
  bmad: 'BMAD',
  docker: 'Docker',
  gitlabci: 'GitLab CI',
  jest: 'Jest',
  git: 'Git',
  jira: 'Jira',
  unity: 'Unity',
  c: 'C#',
  wpf: 'WPF',
  winform: 'WinForms',
  solidworks: 'SolidWorks',
  '3dsmax': '3ds Max',
  zod: 'Zod',
  sigmajs: 'Sigma.js',
  mcp: 'MCP',
  threejs: 'Three.js',
  r3f: 'React Three Fiber',
  webworkers: 'Web Workers',
  sqlite: 'SQLite',
  android: 'Android',
}

export const stackLabels = (tags: string[]): string[] => [
  ...new Set(tags.map((tag) => STACK_LABELS[normalizeTechTag(`#${tag}`)]).filter((label): label is string => Boolean(label))),
]

const findExperience = (id: number) => {
  const experience = mockExperiences.find((candidate) => candidate.id === id)
  if (!experience) throw new Error(`Unknown experience ${id}`)
  return experience
}

const companyHead = (language: Language, experienceId: number): CompanyHead => {
  const experience = findExperience(experienceId)
  const locale = getMockDataLocale(language).experiences[experienceId.toString()]
  return {
    company: locale?.company || experience.company,
    employer: locale?.employer || experience.employer,
    period: experience.period,
  }
}

const missionView = (language: Language, experienceId: number, missionId: number): MissionView => {
  const mission = findExperience(experienceId).missions.find((candidate) => candidate.id === missionId)
  if (!mission) throw new Error(`Unknown mission ${missionId}`)
  const locale = getMockDataLocale(language).experiences[experienceId.toString()]?.missions[missionId.toString()]
  const title = locale?.context || mission.context

  return {
    title,
    shortTitle: shortTitle(title),
    badge: locale?.badge || mission.badge,
    period: mission.period,
    summary: toPlainText(locale?.desc || mission.desc),
    brief: toPlainText(locale?.cardSummary || mission.cardSummary || mission.desc),
    tasks: (locale?.tasks || mission.tasks || []).map(toPlainText),
    stack: stackLabels(mission.tags),
  }
}

// Personal projects that are not web applications stay off this web-oriented resume.
const WEB_PERSONAL_PROJECTS = ['iasit', 'vorrery', 'kin']

export const buildDetailedModel = (language: Language): DetailedModel => {
  const locale = getMockDataLocale(language)

  const skills = localizeSkills(mockSkills, locale.skills)
    .filter((skill) => SKILL_GROUPS.includes(skill.id))
    .map((skill) => ({ cat: skill.cat, items: skill.tags.map((tag) => tag.l) }))

  const personalProjects = mockPersonalProjects
    .filter((project) => WEB_PERSONAL_PROJECTS.includes(project.name))
    .map((project) => {
      const projectLocale = locale.personalProjects[project.id]
      return {
        name: project.name,
        kind: projectLocale?.kind || project.kind,
        period: project.period,
        text: firstSentence(projectLocale?.desc || project.desc),
        stack: stackLabels(project.stack),
      }
    })

  return {
    language,
    labels: LABELS[language],
    name: mockProfile.name,
    title: locale.profile.title,
    subtitle: locale.profile.subtitle,
    email: mockProfile.email,
    phone: mockProfile.phone,
    url: RESUME_URL,
    bio: locale.profile.bio,
    highlights: HIGHLIGHTS[language],
    skills: [WEB_SKILLS[language], ...skills, XR_SKILLS[language]],
    formations: localizeFormations(mockFormation, locale.formation).map(({ title, sub }) => ({ title, sub })),
    languages: locale.profile.langs,
    schneiderWeb: { head: companyHead(language, 1), mission: missionView(language, 1, 11), details: IECA_DETAILS[language] },
    xpert: {
      head: companyHead(language, 3),
      xistar: missionView(language, 3, 31),
      companionTools: [33, 34, 32].map((id) => missionView(language, 3, id)),
      missions: [36, 35, 37].map((id) => missionView(language, 3, id)),
    },
    schneiderAr: { head: companyHead(language, 1), mission: missionView(language, 1, 12) },
    oreka: {
      head: companyHead(language, 2),
      overview: missionView(language, 2, 21),
      keyProjects: [23, 26, 22].map((id) => missionView(language, 2, id)),
      otherProjects: [28, 24, 25, 27].map((id) => missionView(language, 2, id)),
    },
    personalProjects,
  }
}

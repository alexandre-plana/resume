import { getMockDataLocale } from '../api/mockDataLocales'
import { localizeFormations, localizeSkills } from '../api/localizeData'
import { mockExperiences, mockFormation, mockPersonalProjects, mockProfile, mockSkills } from '../api/mockData'
import { getTranslations, type Language } from '../locales'
import type { Formation, Skill } from '../types'
import { IECA_DETAILS, type IecaDetails } from './iecaDetails'
import { RESUME_URL, shortTitle } from './onePage'

// Texts keep their #tech tags: the page renders them as inline tags, like the online resume.

export interface DetailedLabels {
  document: string
  about: string
  overview: string
  vueFocus: string
  iecaComponents: string
  webXpert: string
  industrialAr: string
  oreka: string
  keyProjects: string
  otherProjects: string
  personalProjects: string
  education: string
  languages: string
  coreSkills: string
  interests: string
  openToWork: string
  online: string
  tasks: string
}

export interface CompanyHead {
  company: string
  employer: string
  period: string
  current: boolean
}

export interface MissionView {
  name: string
  title: string
  badge: string
  period: string
  desc: string
  brief: string
  tasks: string[]
  tags: string[]
  featured: boolean
}

export interface Chip {
  l: string
  k: string
}

export interface OverviewEntry {
  name: string
  title: string
  badge: string
  period: string
  chips: Chip[]
  featured: boolean
  projects: { name: string; title: string; shortTitle: string; period: string; key: boolean }[]
}

export interface OverviewCompany {
  head: CompanyHead
  entries: OverviewEntry[]
}

export interface DetailedModel {
  language: Language
  labels: DetailedLabels
  name: string
  handle: string
  title: string
  subtitle: string
  company: string
  location: string
  email: string
  phone: string
  url: string
  bio: string
  overview: OverviewCompany[]
  skills: Skill[]
  interests: string[]
  formations: { id: string; kind: Formation['kind']; label: string; title: string; sub: string; meta: string }[]
  languages: { label: string; level: string }[]
  schneiderWeb: { head: CompanyHead; mission: MissionView; details: IecaDetails }
  xpert: {
    head: CompanyHead
    xistar: MissionView
    xistarFocus: { title: string; text: string }[]
    companionTools: MissionView[]
    missions: MissionView[]
  }
  schneiderAr: { head: CompanyHead; mission: MissionView }
  oreka: { head: CompanyHead; overview: MissionView; keyProjects: MissionView[]; otherProjects: MissionView[] }
  personalProjects: {
    name: string
    kind: string
    status: string
    period: string
    role: string
    desc: string
    stack: string[]
  }[]
}

type OwnLabels = Omit<DetailedLabels, 'about' | 'languages' | 'coreSkills' | 'interests' | 'openToWork' | 'tasks'>

const LABELS: Record<Language, OwnLabels> = {
  fr: {
    document: 'CV détaillé',
    overview: '📌 Parcours',
    vueFocus: '📌 Vue.js · micro-frontend — Schneider Electric',
    iecaComponents: 'Micro-frontends IECA sur lesquels j’ai travaillé',
    webXpert: '📌 Développement web — X-PERT',
    industrialAr: '📌 Application AR industrielle — Schneider Electric',
    oreka: '📌 Serious games & simulation — Oreka Ingénierie',
    keyProjects: 'Projets phares',
    otherProjects: 'Autres réalisations',
    personalProjects: '🛠️ Projets persos',
    education: '🎓 Formations',
    online: 'CV en ligne',
  },
  en: {
    document: 'Detailed resume',
    overview: '📌 Career overview',
    vueFocus: '📌 Vue.js · micro-frontend — Schneider Electric',
    iecaComponents: 'IECA micro-frontends I worked on',
    webXpert: '📌 Web development — X-PERT',
    industrialAr: '📌 Industrial AR application — Schneider Electric',
    oreka: '📌 Serious games & simulation — Oreka Engineering',
    keyProjects: 'Key projects',
    otherProjects: 'Other projects',
    personalProjects: '🛠️ Personal projects',
    education: '🎓 Education',
    online: 'Online resume',
  },
}

const findExperience = (id: number) => {
  const experience = mockExperiences.find((candidate) => candidate.id === id)
  if (!experience) throw new Error(`Unknown experience ${id}`)
  return experience
}

const companyHead = (language: Language, experienceId: number, current = false): CompanyHead => {
  const experience = findExperience(experienceId)
  const locale = getMockDataLocale(language).experiences[experienceId.toString()]
  return {
    company: locale?.company || experience.company,
    employer: locale?.employer || experience.employer,
    period: experience.period,
    current,
  }
}

const missionView = (language: Language, experienceId: number, missionId: number): MissionView => {
  const mission = findExperience(experienceId).missions.find((candidate) => candidate.id === missionId)
  if (!mission) throw new Error(`Unknown mission ${missionId}`)
  const locale = getMockDataLocale(language).experiences[experienceId.toString()]?.missions[missionId.toString()]

  return {
    name: mission.name,
    title: locale?.context || mission.context,
    badge: locale?.badge || mission.badge,
    period: mission.period,
    desc: locale?.desc || mission.desc,
    brief: locale?.cardSummary || mission.cardSummary || mission.desc,
    tasks: locale?.tasks || mission.tasks || [],
    tags: mission.tags,
    featured: mission.featured,
  }
}

// Cover timeline: domain chips first (web, Vue, AI stand out), then the main technologies.
// Kinds pick colors from the online tech-tag themes.
const DOMAIN_CHIPS: Record<Language, Record<
    | 'web'
    | 'vue'
    | 'ai'
    | 'xr'
    | 'uiux'
    | 'seriousGame'
    | 'multiScreen'
    | 'realTime'
    | 'radiation'
    | 'nuclear'
    | 'medical'
    | 'ergonomics'
    | 'simulation',
    Chip
  >> = {
  fr: {
    web: { l: 'web', k: 'ts' },
    vue: { l: 'vue 3', k: 'vue3' },
    ai: { l: 'ia', k: 'mcp' },
    xr: { l: '3d / xr', k: '3d' },
    uiux: { l: 'ux/ui', k: 'uiux' },
    seriousGame: { l: 'serious game', k: 'ar' },
    multiScreen: { l: 'multi-écran', k: 'desktop' },
    realTime: { l: 'temps réel', k: 'mqtt' },
    radiation: { l: 'radioprotection', k: 'html' },
    nuclear: { l: 'nucléaire', k: '3d' },
    medical: { l: 'médical', k: 'mobile' },
    ergonomics: { l: 'ergonomie', k: 'agile' },
    simulation: { l: 'simulation 3d', k: '3d-temps-réel' },
  },
  en: {
    web: { l: 'web', k: 'ts' },
    vue: { l: 'vue 3', k: 'vue3' },
    ai: { l: 'ai', k: 'mcp' },
    xr: { l: '3d / xr', k: '3d' },
    uiux: { l: 'ux/ui', k: 'uiux' },
    seriousGame: { l: 'serious game', k: 'ar' },
    multiScreen: { l: 'multi-screen', k: 'desktop' },
    realTime: { l: 'real-time', k: 'mqtt' },
    radiation: { l: 'radiation safety', k: 'html' },
    nuclear: { l: 'nuclear', k: '3d' },
    medical: { l: 'medical', k: 'mobile' },
    ergonomics: { l: 'ergonomics', k: 'agile' },
    simulation: { l: '3d simulation', k: '3d-temps-réel' },
  },
}

const OVERVIEW_CHIPS = (language: Language): Record<number, Chip[]> => {
  const d = DOMAIN_CHIPS[language]
  const unity = { l: 'unity', k: 'unity' }
  const csharp = { l: 'c#', k: 'csharp' }
  return {
    31: [
      d.web,
      d.multiScreen,
      d.realTime,
      { l: 'react', k: 'react' },
      { l: 'typescript', k: 'ts' },
      { l: 'go', k: 'green' },
      { l: 'docker', k: 'docker' },
      { l: 'gitlab ci', k: 'gitlabci' },
    ],
    36: [d.web, d.uiux, { l: 'figma', k: 'figma' }, { l: 'react', k: 'react' }, { l: 'shadcn', k: 'green' }, { l: 'npm', k: 'green' }],
    35: [d.ai, { l: 'bmad', k: 'green' }, { l: 'docker', k: 'docker' }, { l: 'gitlab ci', k: 'gitlabci' }, { l: 'react', k: 'react' }],
    11: [d.web, d.vue, { l: 'typescript', k: 'ts' }, { l: 'single-spa', k: 'spa' }, { l: 'pinia', k: 'green' }, { l: 'jest', k: 'jest' }, { l: 'sonarqube', k: 'sonarqube' }],
    12: [d.xr, { l: 'unity', k: 'unity' }, { l: 'c#', k: 'csharp' }, { l: 'ar', k: 'ar' }, { l: 'mobile', k: 'mobile' }, { l: 'offline', k: 'offline' }],
    // Oreka projects, one card each.
    26: [d.seriousGame, d.radiation, d.nuclear, unity, csharp],
    22: [d.uiux, d.ergonomics, d.simulation, unity, csharp],
    28: [d.simulation, d.radiation, d.medical, unity, csharp],
    24: [d.simulation, d.nuclear, unity, csharp, { l: 'wpf', k: 'wpf' }],
    25: [d.seriousGame, d.nuclear, unity, csharp],
    27: [d.seriousGame, d.nuclear, unity, csharp],
  }
}

// Web, Vue and AI missions get the featured card style.
const OVERVIEW_FEATURED = new Set([31, 11, 35])

// Projects listed under an entry; those in keyProjectIds are emphasized.
const overviewEntry = (
  language: Language,
  experienceId: number,
  missionId: number,
  projectIds: number[] = [],
  keyProjectIds: number[] = [],
): OverviewEntry => {
  const mission = missionView(language, experienceId, missionId)
  return {
    name: mission.name,
    title: mission.title,
    badge: mission.badge,
    period: mission.period,
    chips: OVERVIEW_CHIPS(language)[missionId] ?? [],
    featured: OVERVIEW_FEATURED.has(missionId),
    projects: projectIds.map((id) => {
      const project = missionView(language, experienceId, id)
      return {
        name: project.name,
        title: project.title,
        shortTitle: shortTitle(project.title),
        period: project.period,
        key: keyProjectIds.includes(id),
      }
    }),
  }
}

const buildOverview = (language: Language): OverviewCompany[] => [
  {
    head: companyHead(language, 3, true),
    entries: [31, 35, 36].map((id) => overviewEntry(language, 3, id)),
  },
  {
    head: companyHead(language, 1),
    entries: [overviewEntry(language, 1, 11), overviewEntry(language, 1, 12)],
  },
  {
    head: companyHead(language, 2),
    entries: [26, 22, 28, 24, 25, 27].map((id) => overviewEntry(language, 2, id)),
  },
]

// Xistar highlights: multi-screen operation (from the mission and wall-emulator data) and delivery.
const XISTAR_FOCUS: Record<Language, { title: string; text: string }[]> = {
  fr: [
    {
      title: 'Multi-écran & temps réel',
      text: 'Application multi-écran pilotée depuis un poste maître : ensembles d’écrans, tableau de mission et envoi de vues à distance, avec une gestion centralisée et en temps réel de ce que chaque écran affiche. Les situations, alertes et positions arrivent en continu par #mqtt et #socketio, et le rejeu temporel permet de revoir une opération pour l’analyse et les débriefings.',
    },
    {
      title: 'Conteneurs & pipelines',
      text: 'Interface et services #go conteneurisés avec #docker, workflow de développement et pipelines #gitlab-ci pour construire et livrer les images.',
    },
  ],
  en: [
    {
      title: 'Multi-screen & real time',
      text: 'Multi-screen application driven from a master station: screen sets, a mission board and remote view sending, with centralized, real-time control of what each screen displays. Situation, alert and position updates stream in through #mqtt and #socketio, and time-based replay lets operators review an operation for analysis and debriefing.',
    },
    {
      title: 'Containers & pipelines',
      text: 'Interface and #go services containerized with #docker, with a development workflow and #gitlab-ci pipelines that build and ship the images.',
    },
  ],
}

const withTags = (mission: MissionView, tags: string[]): MissionView => ({ ...mission, tags: [...mission.tags, ...tags] })

// Personal projects that are not web applications stay off this web-oriented resume.
const WEB_PERSONAL_PROJECTS = ['iasit', 'vorrery', 'kin']

export const buildDetailedModel = (language: Language): DetailedModel => {
  const locale = getMockDataLocale(language)
  const t = getTranslations(language)

  const personalProjects = mockPersonalProjects
    .filter((project) => WEB_PERSONAL_PROJECTS.includes(project.name))
    .map((project) => {
      const projectLocale = locale.personalProjects[project.id]
      return {
        name: project.name,
        kind: projectLocale?.kind || project.kind,
        status: projectLocale?.status || project.status || '',
        period: project.period,
        role: projectLocale?.role || project.role,
        desc: projectLocale?.desc || project.desc,
        stack: project.stack,
      }
    })

  return {
    language,
    labels: {
      ...LABELS[language],
      about: `👤 ${t.sections.about}`,
      languages: t.common.languages,
      coreSkills: t.common.coreSkills,
      interests: t.sidebar.interests,
      openToWork: t.common.openToWork,
      tasks: t.mission.tasksPreviewTitle,
    },
    name: mockProfile.name,
    handle: mockProfile.handle,
    title: locale.profile.title,
    subtitle: locale.profile.subtitle,
    company: locale.profile.company,
    location: mockProfile.location,
    email: mockProfile.email,
    phone: mockProfile.phone,
    url: RESUME_URL,
    bio: locale.profile.bio,
    overview: buildOverview(language),
    // Same sidebar sections as the online resume.
    skills: localizeSkills(mockSkills, locale.skills),
    interests: locale.profile.interests,
    formations: localizeFormations(mockFormation, locale.formation).map(({ id, kind, label, title, sub, meta }) => ({
      id,
      kind,
      label,
      title,
      sub,
      meta,
    })),
    languages: locale.profile.langs,
    schneiderWeb: {
      head: companyHead(language, 1),
      mission: missionView(language, 1, 11),
      details: IECA_DETAILS[language],
    },
    xpert: {
      head: companyHead(language, 3, true),
      xistar: withTags(missionView(language, 3, 31), ['docker', 'gitlab ci']),
      xistarFocus: XISTAR_FOCUS[language],
      companionTools: [32, 33, 34].map((id) => missionView(language, 3, id)),
      missions: [36, 35].map((id) => missionView(language, 3, id)),
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

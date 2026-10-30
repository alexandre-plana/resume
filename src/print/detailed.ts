import { getMockDataLocale } from '../api/mockDataLocales'
import { localizeFormations } from '../api/localizeData'
import { mockExperiences, mockFormation, mockPersonalProjects, mockProfile } from '../api/mockData'
import { getTranslations, type Language } from '../locales'
import type { Formation, Skill } from '../types'
import {
  frenchTypography,
  HEADS,
  MISSIONS,
  OREKA_PROJECTS,
  PROFILE,
  SKILLS,
  type ProjectRow,
} from './detailedContent'
import { IECA_DETAILS, type IecaDetails } from './iecaDetails'

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
  orekaProjects: string
  personalProjects: string
  education: string
  languages: string
  coreSkills: string
  interests: string
  openToWork: string
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
  team?: string
  extra?: string
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
  note?: string
  chips: Chip[]
  featured: boolean
}

export interface OverviewCompany {
  head: CompanyHead
  entries: OverviewEntry[]
  // Shown as a thin "…" line: more projects than the cover lists.
  more?: boolean
}

export interface DetailedModel {
  language: Language
  labels: DetailedLabels
  name: string
  title: string
  subtitle: string
  location: string
  email: string
  phone: string
  bio: string
  overview: OverviewCompany[]
  skills: Skill[]
  interests: string[]
  formations: { id: string; kind: Formation['kind']; title: string; sub: string }[]
  languages: { label: string; level: string }[]
  schneiderWeb: { head: CompanyHead; mission: MissionView; details: IecaDetails }
  xpert: { head: CompanyHead; missions: MissionView[] }
  schneiderAr: { head: CompanyHead; mission: MissionView }
  oreka: { head: CompanyHead; overview: MissionView; projects: ProjectRow[] }
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

type OwnLabels = Omit<DetailedLabels, 'about' | 'languages' | 'coreSkills' | 'interests' | 'openToWork'>

const LABELS: Record<Language, OwnLabels> = {
  fr: {
    document: 'CV détaillé',
    overview: '📌 Parcours',
    vueFocus: '📌 Vue.js · micro-frontend — Schneider Electric',
    iecaComponents: 'Micro-frontends IECA sur lesquels j’ai travaillé',
    webXpert: '📌 Développement web — X-PERT',
    industrialAr: '📌 Application AR industrielle — Schneider Electric',
    oreka: '📌 Serious games & simulation — Oreka Ingénierie',
    orekaProjects: 'Projets',
    personalProjects: '🛠️ Projets personnels',
    education: '🎓 Formations',
    tasks: 'Réalisations',
  },
  en: {
    document: 'Detailed resume',
    overview: '📌 Career overview',
    vueFocus: '📌 Vue.js · micro-frontend — Schneider Electric',
    iecaComponents: 'IECA micro-frontends I worked on',
    webXpert: '📌 Web development — X-PERT',
    industrialAr: '📌 Industrial AR application — Schneider Electric',
    oreka: '📌 Serious games & simulation — Oreka Ingénierie',
    orekaProjects: 'Projects',
    personalProjects: '🛠️ Personal projects',
    education: '🎓 Education',
    tasks: 'Key contributions',
  },
}

const findExperience = (id: number) => {
  const experience = mockExperiences.find((candidate) => candidate.id === id)
  if (!experience) throw new Error(`Unknown experience ${id}`)
  return experience
}

// Detail sections pass the mission period, so a section reads as the time spent on that work.
const companyHead = (language: Language, experienceId: number, current = false, period?: string): CompanyHead => {
  const experience = findExperience(experienceId)
  const head = HEADS[language][experienceId]
  return {
    company: head?.company ?? experience.company,
    employer: head?.employer ?? experience.employer,
    period: period ?? head?.period ?? experience.period,
    current,
  }
}

const missionView = (language: Language, experienceId: number, missionId: number): MissionView => {
  const mission = findExperience(experienceId).missions.find((candidate) => candidate.id === missionId)
  if (!mission) throw new Error(`Unknown mission ${missionId}`)
  const locale = getMockDataLocale(language).experiences[experienceId.toString()]?.missions[missionId.toString()]
  const override = MISSIONS[language][missionId] ?? {}

  return {
    name: mission.name,
    title: override.title ?? (locale?.context || mission.context),
    badge: override.badge ?? (locale?.badge || mission.badge),
    period: override.period ?? mission.period,
    desc: override.desc ?? (locale?.desc || mission.desc),
    brief: locale?.cardSummary || mission.cardSummary || mission.desc,
    tasks: override.tasks ?? (locale?.tasks || mission.tasks || []),
    tags: override.tags ?? mission.tags,
    featured: mission.featured,
    team: override.team,
    extra: override.extra,
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
    35: [d.ai, { l: 'claude', k: 'mcp' }, { l: 'codex', k: 'mcp' }, { l: 'jev', k: 'mcp' }, { l: 'bmad', k: 'green' }, { l: 'docker', k: 'docker' }, { l: 'gitlab ci', k: 'gitlabci' }],
    11: [d.web, d.vue, { l: 'typescript', k: 'ts' }, { l: 'single-spa', k: 'spa' }, { l: 'pinia', k: 'green' }, { l: 'vitest', k: 'vitest' }, { l: 'sonarqube', k: 'sonarqube' }],
    12: [d.xr, { l: 'unity', k: 'unity' }, { l: 'c#', k: 'csharp' }, { l: 'ar', k: 'ar' }, { l: 'mobile', k: 'mobile' }, { l: 'offline', k: 'offline' }],
    // Oreka projects, one card each.
    26: [d.seriousGame, d.radiation, d.nuclear, unity, csharp],
    22: [d.uiux, d.ergonomics, d.simulation, unity, csharp],
    28: [d.simulation, d.radiation, d.medical, unity, csharp],
    24: [d.simulation, d.nuclear, unity, csharp, { l: 'wpf', k: 'wpf' }],
    27: [d.seriousGame, d.nuclear, unity, csharp],
  }
}

// Web, Vue and AI missions get the featured card style.
const OVERVIEW_FEATURED = new Set([31, 11, 35])

const overviewEntry = (language: Language, experienceId: number, missionId: number): OverviewEntry => {
  const mission = missionView(language, experienceId, missionId)
  return {
    name: mission.name,
    title: mission.title,
    badge: mission.badge,
    period: mission.period,
    note: MISSIONS[language][missionId]?.note,
    chips: OVERVIEW_CHIPS(language)[missionId] ?? [],
    featured: OVERVIEW_FEATURED.has(missionId),
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
    entries: [26, 22, 28, 24, 27].map((id) => overviewEntry(language, 2, id)),
    more: true,
  },
]

// Personal projects that are not finished web applications stay off this web-oriented resume.
const WEB_PERSONAL_PROJECTS = ['iasit', 'vorrery']

// Applies French typography to every printed string except identifiers, addresses and chip keys.
const TYPOGRAPHY_SKIP = new Set(['name', 'repo', 'email', 'phone', 'k', 'language'])

const withFrenchTypography = <T>(value: T, key = ''): T => {
  if (typeof value === 'string') return (TYPOGRAPHY_SKIP.has(key) ? value : frenchTypography(value)) as T
  if (Array.isArray(value)) return value.map((item) => withFrenchTypography(item, key)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entry]) => [entryKey, withFrenchTypography(entry, entryKey)]),
    ) as T
  }
  return value
}

const INTERESTS_FR: Record<string, string> = { '🥾 Rando': '🥾 Randonnée' }

export const buildDetailedModel = (language: Language): DetailedModel => {
  const model = buildModel(language)
  return language === 'fr' ? withFrenchTypography(model) : model
}

const buildModel = (language: Language): DetailedModel => {
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
    },
    name: mockProfile.name,
    ...PROFILE[language],
    location: 'Le Cannet (06)',
    email: mockProfile.email,
    phone: mockProfile.phone,
    overview: buildOverview(language),
    skills: SKILLS[language],
    interests: locale.profile.interests.map((interest) => (language === 'fr' ? INTERESTS_FR[interest] ?? interest : interest)),
    formations: localizeFormations(mockFormation, locale.formation).map(({ id, kind, title, sub }) => ({ id, kind, title, sub })),
    languages: locale.profile.langs,
    schneiderWeb: {
      head: companyHead(language, 1, false, '2023 – 2026'),
      mission: missionView(language, 1, 11),
      details: IECA_DETAILS[language],
    },
    xpert: {
      head: companyHead(language, 3, true),
      missions: [31, 35, 36].map((id) => missionView(language, 3, id)),
    },
    schneiderAr: { head: companyHead(language, 1, false, '2017 – 2023'), mission: missionView(language, 1, 12) },
    oreka: {
      head: companyHead(language, 2),
      overview: missionView(language, 2, 21),
      projects: OREKA_PROJECTS[language],
    },
    personalProjects,
  }
}

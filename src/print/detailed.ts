import { getMockDataLocale } from '../api/mockDataLocales'
import { localizeFormations } from '../api/localizeData'
import { mockExperiences, mockFormation, mockPersonalProjects, mockProfile } from '../api/mockData'
import { getTranslations, type Language } from '../locales'
import type { Formation } from '../types'
import { IECA_DETAILS, type IecaDetails } from './iecaDetails'
import { RESUME_URL, shortTitle } from './onePage'

// Texts keep their #tech tags: the page renders them as inline tags, like the online resume.

export interface DetailedLabels {
  document: string
  about: string
  overview: string
  vueFocus: string
  iecaDetails: string
  iecaModules: string
  iecaFoundation: string
  iecaOther: string
  webXpert: string
  industrialAr: string
  oreka: string
  keyProjects: string
  otherProjects: string
  personalProjects: string
  education: string
  languages: string
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
  formations: { id: string; kind: Formation['kind']; label: string; title: string; sub: string; meta: string }[]
  languages: { label: string; level: string }[]
  schneiderWeb: { head: CompanyHead; mission: MissionView; details: IecaDetails }
  xpert: { head: CompanyHead; xistar: MissionView; companionTools: MissionView[]; missions: MissionView[] }
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

type OwnLabels = Omit<DetailedLabels, 'about' | 'languages' | 'openToWork' | 'tasks'>

const LABELS: Record<Language, OwnLabels> = {
  fr: {
    document: 'CV détaillé',
    overview: '📌 Parcours',
    vueFocus: '📌 Vue.js · micro-frontend — Schneider Electric',
    iecaDetails: '🔎 IECA — détail technique',
    iecaModules: 'Domaines fonctionnels',
    iecaFoundation: 'Socle partagé',
    iecaOther: 'Qualité & prototypes',
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
    iecaDetails: '🔎 IECA — technical deep dive',
    iecaModules: 'Functional areas',
    iecaFoundation: 'Shared foundation',
    iecaOther: 'Quality & prototypes',
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
const DOMAIN_CHIPS: Record<Language, Record<'web' | 'vue' | 'ai' | 'xr' | 'uiux' | 'seriousGame', Chip>> = {
  fr: {
    web: { l: 'web', k: 'ts' },
    vue: { l: 'vue 3', k: 'vue3' },
    ai: { l: 'ia', k: 'mcp' },
    xr: { l: '3d / xr', k: '3d' },
    uiux: { l: 'ux/ui', k: 'uiux' },
    seriousGame: { l: 'serious game', k: 'ar' },
  },
  en: {
    web: { l: 'web', k: 'ts' },
    vue: { l: 'vue 3', k: 'vue3' },
    ai: { l: 'ai', k: 'mcp' },
    xr: { l: '3d / xr', k: '3d' },
    uiux: { l: 'ux/ui', k: 'uiux' },
    seriousGame: { l: 'serious game', k: 'ar' },
  },
}

const OVERVIEW_CHIPS = (language: Language): Record<number, Chip[]> => {
  const d = DOMAIN_CHIPS[language]
  return {
    31: [d.web, { l: 'react', k: 'react' }, { l: 'typescript', k: 'ts' }, { l: 'go', k: 'green' }, { l: 'maplibre', k: 'maplibre' }, { l: 'mqtt', k: 'mqtt' }],
    36: [d.web, d.uiux, { l: 'figma', k: 'figma' }, { l: 'react', k: 'react' }, { l: 'shadcn', k: 'green' }, { l: 'npm', k: 'green' }],
    35: [d.ai, { l: 'bmad', k: 'green' }, { l: 'docker', k: 'docker' }, { l: 'gitlab ci', k: 'gitlabci' }, { l: 'react', k: 'react' }],
    37: [d.ai, { l: 'webgl', k: 'webgl2' }, { l: 'hyperframes', k: 'green' }],
    11: [d.web, d.vue, { l: 'typescript', k: 'ts' }, { l: 'single-spa', k: 'spa' }, { l: 'pinia', k: 'green' }, { l: 'jest', k: 'jest' }, { l: 'sonarqube', k: 'sonarqube' }],
    12: [d.xr, { l: 'unity', k: 'unity' }, { l: 'c#', k: 'csharp' }, { l: 'ar', k: 'ar' }, { l: 'mobile', k: 'mobile' }, { l: 'offline', k: 'offline' }],
    21: [d.seriousGame, d.uiux, d.xr, { l: 'unity', k: 'unity' }, { l: 'c#', k: 'csharp' }, { l: 'vr', k: 'vr' }],
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
    entries: [overviewEntry(language, 3, 31, [33, 34, 32]), ...[35, 36, 37].map((id) => overviewEntry(language, 3, id))],
  },
  {
    head: companyHead(language, 1),
    entries: [overviewEntry(language, 1, 11), overviewEntry(language, 1, 12)],
  },
  {
    head: companyHead(language, 2),
    entries: [overviewEntry(language, 2, 21, [23, 26, 22, 28, 24, 25, 27], [23, 26, 22])],
  },
]

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
      xistar: missionView(language, 3, 31),
      companionTools: [32, 33, 34].map((id) => missionView(language, 3, id)),
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

import { getMockDataLocale } from '../api/mockDataLocales'
import { localizeFormations, localizeSkills } from '../api/localizeData'
import { mockExperiences, mockFormation, mockPersonalProjects, mockProfile, mockSkills } from '../api/mockData'
import { getTranslations, type Language } from '../locales'
import type { Formation } from '../types'
import { IECA_DETAILS, type IecaDetails } from './iecaDetails'
import { RESUME_URL } from './onePage'

// Texts keep their #tech tags: the page renders them as inline tags, like the online resume.

export interface DetailedLabels {
  document: string
  about: string
  highlights: string
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
  coreSkills: string
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

export interface SkillGroup {
  cat: string
  featured: boolean
  tags: { l: string; k: string }[]
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
  highlights: { title: string; text: string }[]
  skills: SkillGroup[]
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

type OwnLabels = Omit<DetailedLabels, 'about' | 'coreSkills' | 'languages' | 'openToWork' | 'tasks'>

const LABELS: Record<Language, OwnLabels> = {
  fr: {
    document: 'CV détaillé',
    highlights: '⚡ Expertise web en bref',
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
    highlights: '⚡ Web expertise at a glance',
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

// Every statement below summarizes facts already detailed in the resume data.
const HIGHLIGHTS: Record<Language, { title: string; text: string }[]> = {
  fr: [
    {
      title: 'Vue 3 · micro-frontend',
      text: 'Trois ans sur IECA, la plateforme IIoT Edge de Schneider Electric : modules #single-spa, composants partagés, stores #pinia testés avec #jest et qualité suivie dans #sonarqube.',
    },
    {
      title: 'React · TypeScript',
      text: 'Xistar, poste de commandement maritime dans le navigateur : espace de travail #dockview, cartographie #maplibre et #deckgl, flux temps réel #mqtt et #socketio.',
    },
    {
      title: 'Design system',
      text: 'Composants conçus sous #figma, développés en #react avec #shadcn et distribués via un registre #npm privé aux applications de X-PERT.',
    },
    {
      title: 'UX/UI & conception fonctionnelle',
      text: 'Depuis 2013, des besoins métier aux parcours et interfaces : serious games, simulateurs (Dosicase, Simulhom) et applications multiplateformes.',
    },
  ],
  en: [
    {
      title: 'Vue 3 · micro-frontend',
      text: 'Three years on IECA, Schneider Electric’s IIoT Edge platform: #single-spa modules, shared components, #pinia stores tested with #jest and code quality tracked in #sonarqube.',
    },
    {
      title: 'React · TypeScript',
      text: 'Xistar, a browser-based maritime command center: #dockview workspace, #maplibre and #deckgl mapping, real-time #mqtt and #socketio feeds.',
    },
    {
      title: 'Design system',
      text: 'Components designed in #figma, built in #react with #shadcn and distributed to X-PERT applications through a private #npm registry.',
    },
    {
      title: 'UX/UI & functional design',
      text: 'Since 2013, from business requirements to workflows and interfaces: serious games, simulators (Dosicase, Simulhom) and cross-platform applications.',
    },
  ],
}

// Tag kinds follow the online resume's tech-tag themes (src/theme/techTagTheme.ts).
const WEB_SKILLS: SkillGroup = {
  cat: 'Web',
  featured: true,
  tags: [
    { l: 'Vue 3', k: 'vue3' },
    { l: 'Pinia', k: 'green' },
    { l: 'single-spa', k: 'spa' },
    { l: 'React', k: 'react' },
    { l: 'Vite', k: 'vite' },
    { l: 'Dockview', k: 'desktop' },
    { l: 'shadcn', k: 'green' },
    { l: 'MapLibre', k: 'maplibre' },
    { l: 'deck.gl', k: 'deck.gl' },
    { l: 'Socket.IO', k: 'socketio' },
    { l: 'Tailwind', k: 'tailwind' },
    { l: 'HTML / CSS', k: 'html' },
  ],
}

const XR_TAGS = [
  { l: 'Unity 3D', k: 'unity' },
  { l: 'VR', k: 'vr' },
  { l: 'AR', k: 'ar' },
  { l: 'WPF', k: 'wpf' },
  { l: 'SolidWorks', k: 'solidworks' },
  { l: '3ds Max', k: '3dsmax' },
]

const XR_SKILLS: Record<Language, SkillGroup> = {
  fr: { cat: '3D temps réel & XR', featured: false, tags: XR_TAGS },
  en: { cat: 'Real-time 3D & XR', featured: false, tags: XR_TAGS },
}

// The web group above replaces the generic front-end group of the online resume.
const SKILL_GROUPS = ['languages', 'services', 'tools']

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

// Personal projects that are not web applications stay off this web-oriented resume.
const WEB_PERSONAL_PROJECTS = ['iasit', 'vorrery', 'kin']

export const buildDetailedModel = (language: Language): DetailedModel => {
  const locale = getMockDataLocale(language)
  const t = getTranslations(language)

  const skills = localizeSkills(mockSkills, locale.skills)
    .filter((skill) => SKILL_GROUPS.includes(skill.id))
    .map((skill) => ({ cat: skill.cat, featured: false, tags: skill.tags }))

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
      coreSkills: t.common.coreSkills,
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
    highlights: HIGHLIGHTS[language],
    skills: [WEB_SKILLS, ...skills, XR_SKILLS[language]],
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

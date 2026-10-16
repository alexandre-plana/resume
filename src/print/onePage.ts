import { getMockDataLocale } from '../api/mockDataLocales'
import { localizeFormations, localizeSkills } from '../api/localizeData'
import {
  mockExperiences,
  mockFormation,
  mockPersonalProjects,
  mockProfile,
  mockSkills,
} from '../api/mockData'
import type { Language } from '../locales'
import { tokenizeTechText } from '../utils/techTokens'

export interface OnePageLabels {
  profile: string
  experience: string
  skills: string
  education: string
  languages: string
  personalProjects: string
  relatedProjects: string
  online: string
}

export interface OnePageItem {
  title: string
  badge: string
  period: string
  text: string
  related: string[]
}

export interface OnePageExperience {
  company: string
  employer: string
  period: string
  items: OnePageItem[]
}

export interface OnePageModel {
  language: Language
  labels: OnePageLabels
  name: string
  title: string
  subtitle: string
  email: string
  phone: string
  url: string
  bio: string
  experiences: OnePageExperience[]
  skills: { cat: string; items: string[] }[]
  formations: { title: string; sub: string }[]
  languages: { label: string; level: string }[]
  personalProjects: { name: string; kind: string }[]
}

export const RESUME_URL = 'https://alexandre-plana.github.io/resume/'

// Personal projects kept off the printed one-pager.
const EXCLUDED_PERSONAL_PROJECTS = ['n-fold-protocol']

const LABELS: Record<Language, OnePageLabels> = {
  fr: {
    profile: 'Profil',
    experience: 'Expérience professionnelle',
    skills: 'Compétences',
    education: 'Formation',
    languages: 'Langues',
    personalProjects: 'Projets personnels',
    relatedProjects: 'Projets associés',
    online: 'CV en ligne',
  },
  en: {
    profile: 'Profile',
    experience: 'Professional experience',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    personalProjects: 'Personal projects',
    relatedProjects: 'Related projects',
    online: 'Online resume',
  },
}

const TAG_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  csharp: 'C#',
  react: 'React',
  go: 'Go',
  python: 'Python',
  unity: 'Unity',
  vue3: 'Vue 3',
  maplibre: 'MapLibre',
  deckgl: 'deck.gl',
  mqtt: 'MQTT',
  apirest: 'API REST',
  app6d: 'APP-6D',
  microfrontend: 'micro-frontend',
  singlespa: 'single-spa',
  figma: 'Figma',
  shadcn: 'shadcn',
  npm: 'npm',
  html: 'HTML',
  webgl: 'WebGL',
  hyperframes: 'HyperFrames',
  bmad: 'BMAD',
  docker: 'Docker',
  gitlabci: 'GitLab CI',
  nodejs: 'Node.js',
  ar: 'AR',
  android: 'Android',
  ios: 'iOS',
  windows: 'Windows',
  http: 'HTTP',
  offline: 'offline',
  cao: 'CAO',
}

// Tags that merely repeat the word right before them in the prose are dropped.
const REDUNDANT_TAGS = new Set(['seriousgame'])

const tagLabel = (key: string, raw: string): string => TAG_LABELS[key] ?? raw

export const toPlainText = (text: string): string =>
  tokenizeTechText(text)
    .map((token) => {
      if (token.type === 'text') return token.value
      return REDUNDANT_TAGS.has(token.key) ? '' : tagLabel(token.key, token.value.slice(1))
    })
    .join('')
    .replace(/\s+([,.;])/g, '$1')

// "Dosicase — Simulateur de ..." and "Outil de prévention (TMS)" become "Dosicase" and "Outil de prévention".
export const shortTitle = (context: string): string =>
  context.split(' — ')[0].replace(/\s*\([^)]*\)\s*$/, '')

export const firstSentence = (text: string): string => {
  const plain = toPlainText(text).trim()
  const match = plain.match(/^.*?[.!?](?=\s|$)/su)
  return match ? match[0] : plain
}

export const buildOnePageModel = (language: Language): OnePageModel => {
  const locale = getMockDataLocale(language)

  const experiences = mockExperiences.map((experience): OnePageExperience => {
    const experienceLocale = locale.experiences[experience.id.toString()]
    const missions = experience.missions.map((mission) => {
      const missionLocale = experienceLocale?.missions[mission.id.toString()]
      return {
        mission,
        badge: missionLocale?.badge || mission.badge,
        context: missionLocale?.context || mission.context,
        summary: missionLocale?.cardSummary || mission.cardSummary || mission.desc,
      }
    })

    const items = missions
      .filter(({ mission }) => mission.type === 'mission')
      .map(({ mission, badge, context, summary }): OnePageItem => ({
        title: context,
        badge,
        period: mission.period,
        text: toPlainText(summary),
        related: missions
          .filter(({ mission: other }) => other.type === 'projet' && other.parentMissionId === mission.id)
          .map((other) => shortTitle(other.context)),
      }))

    return {
      company: experienceLocale?.company || experience.company,
      employer: experienceLocale?.employer || experience.employer,
      period: experience.period,
      items,
    }
  })

  const skills = localizeSkills(mockSkills, locale.skills).map((skill) => ({
    cat: skill.cat,
    items: skill.tags.map((tag) => tag.l),
  }))

  const formations = localizeFormations(mockFormation, locale.formation).map((formation) => ({
    title: formation.title,
    sub: formation.sub,
  }))

  const personalProjects = mockPersonalProjects
    .filter((project) => !EXCLUDED_PERSONAL_PROJECTS.includes(project.name))
    .map((project) => ({
      name: project.name,
      kind: locale.personalProjects[project.id]?.kind || project.kind,
    }))

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
    experiences,
    skills,
    formations,
    languages: locale.profile.langs,
    personalProjects,
  }
}

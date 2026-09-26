export interface Profile {
  name: string
  handle: string
  title: string
  subtitle: string
  bio: string
  company: string
  location: string
  email: string
  phone: string
  langs: { label: string; level: string }[]
  interests: string[]
}

export interface Metric {
  value: string
  label: string
}

export interface Mission {
  id: number
  featured: boolean
  name: string
  badge: string
  period: string
  context: string
  desc: string
  cardSummary?: string
  tasks?: string[]
  priorityActionIndexes?: number[]
  retrospective?: string
  tags: string[]
  isCurrent?: boolean
  relatedPersonalProject?: {
    id: number
    name: string
  }
  type?: string // e.g., 'projet', 'mission', etc.
  metrics?: { label: string }[]
}

export interface Experience {
  id: number
  company: string
  employer: string
  period: string
  missions: Mission[]
}

export interface Skill {
  cat: string
  featured: boolean
  tags: { l: string; k: string }[]
}

export interface Formation {
  label: string
  title: string
  sub: string
  meta: string
}

export interface PersonalProject {
  id: number
  name: string
  kind: string
  role: string
  desc: string
  details?: string
  highlights?: string[]
  stack: string[]
  period: string
  status?: string
}

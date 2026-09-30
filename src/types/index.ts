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

interface MissionBase {
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
}

export interface ProfessionalMission extends MissionBase {
  type: 'mission'
  parentMissionId?: never
}

export interface AttachedProject extends MissionBase {
  type: 'projet'
  parentMissionId: number
}

export type Mission = ProfessionalMission | AttachedProject

export interface Experience {
  id: number
  company: string
  employer: string
  period: string
  missions: Mission[]
}

export interface Skill {
  id: string
  cat: string
  featured: boolean
  tags: { l: string; k: string }[]
}

export type FormationKind = 'training' | 'degree'

export interface Formation {
  id: string
  kind: FormationKind
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
  images?: ProjectImage[]
}

export interface ProjectImage {
  src: string
  alt: string
}

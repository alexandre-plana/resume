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
  languages: { name: string; pct: number; color: string }[]
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
  tasks?: string[]
  retrospective?: string
  metrics: Metric[]
  tags: string[]
  isCurrent?: boolean
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

export interface Activity {
  id: number
  icon: string
  type: 'blue' | 'green' | 'orange'
  action: string
  repo: string
  detail: string
  time: string
}

export interface Project {
  id: number
  name: string
  company: string
  role: string
  period: string
  desc: string
  context: string
  stack: string
  tags: string[]
}

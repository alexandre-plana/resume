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
  followers: number
  following: number
  contributions: number
  seeking: string
  langs: { label: string; level: string }[]
  languages: { name: string; pct: number; color: string }[]
  awards: { year: string; title: string; desc: string }[]
  interests: string[]
  uiuxHighlight: {
    label: string
    desc: string
    tools: string[]
  }
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
  stack: string
  tags: string[]
  lang: string
  langColor: string
  stars: string
  isCurrent?: boolean
}

export interface Experience {
  id: number
  company: string
  employer: string
  period: string
  type: 'consulting' | 'employee'
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
  bg: string
  color: string
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
  link?: string
  highlights?: string[]
}

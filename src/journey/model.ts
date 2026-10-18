import type { Experience, Mission, PersonalProject } from '../types'

export type SceneKind = 'industrial' | 'augmented' | 'edge' | 'maritime' | 'personal'
export interface JourneyEvent {
  id: string
  year: number
  start: number
  duration: number
  scene: SceneKind
  experience?: Experience
  mission?: Mission
  project?: PersonalProject
}
export interface JourneyModel {
  events: JourneyEvent[]
  duration: number
  from: number
  to: number
}

export const firstYear = (period: string) => Number(period.match(/\d{4}/)?.[0])
export const calendarNow = (date = new Date()) => {
  const year = date.getUTCFullYear()
  return year + (date.getTime() - Date.UTC(year, 0, 1)) / (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1))
}

function sceneFor(experience: Experience, mission: Mission): SceneKind {
  if (experience.id === 2) return 'industrial'
  if (experience.id === 1) return mission.id === 12 ? 'augmented' : 'edge'
  return 'maritime'
}

// Narrative budgets are presentation durations, never employment durations.
const budgets: Record<SceneKind, number> = { industrial: 26, augmented: 18, edge: 18, maritime: 28, personal: 24 }

export function buildJourney(experiences: Experience[], projects: PersonalProject[], to = calendarNow()): JourneyModel {
  const entries: JourneyEvent[] = experiences.flatMap(experience => experience.missions.map(mission => ({
    id: `mission-${mission.id}`, year: firstYear(mission.period), start: 0, duration: 0,
    scene: sceneFor(experience, mission), experience, mission,
  })))
  entries.push(...projects.map(project => ({
    id: `personal-${project.id}`, year: firstYear(project.period), start: 0, duration: 0,
    scene: 'personal' as const, project,
  })))
  const events = entries.filter(e => Number.isFinite(e.year)).sort((a, b) =>
    a.year - b.year || Number(Boolean(a.project)) - Number(Boolean(b.project)) ||
    Number(b.mission?.type === 'mission') - Number(a.mission?.type === 'mission'))
  const weight = (e: JourneyEvent) => e.mission?.type === 'mission' ? 3 : 1
  let duration = 0
  for (const event of events) {
    const totalWeight = events.filter(e => e.scene === event.scene).reduce((sum, e) => sum + weight(e), 0)
    event.start = duration
    event.duration = budgets[event.scene] * weight(event) / totalWeight
    duration += event.duration
  }
  return { events, duration: Math.round(duration * 1e9) / 1e9, from: events[0]?.year ?? 2013, to: Math.max(to, (events[events.length - 1]?.year ?? 2026) + 0.01) }
}

export function getMoment(model: JourneyModel, seconds: number) {
  const time = Math.max(0, Math.min(model.duration, Number.isFinite(seconds) ? seconds : 0))
  let index = model.events.findIndex((e, i) => time < (model.events[i + 1]?.start ?? Infinity))
  index = Math.max(0, index)
  const event = model.events[index]
  return { event, index, progress: event ? Math.min(1, Math.max(0, (time - event.start) / event.duration)) : 0 }
}

export function yearForTime(model: JourneyModel, seconds: number) {
  const { event, index, progress } = getMoment(model, seconds)
  if (!event) return model.from
  return event.year + ((model.events[index + 1]?.year ?? model.to) - event.year) * progress
}

export function timeForYear(model: JourneyModel, year: number) {
  if (year <= model.from) return 0
  if (year >= model.to) return model.duration
  for (let i = 0; i < model.events.length; i++) {
    const event = model.events[i]
    const end = model.events[i + 1]?.year ?? model.to
    if (end > event.year && year >= event.year && year < end) {
      return event.start + (year - event.year) / (end - event.year) * event.duration
    }
    if (event.year === year) return event.start
  }
  return model.duration
}

export function eventTitle(event: JourneyEvent) {
  return event.project?.name ?? event.mission?.name.split('/').pop() ?? ''
}

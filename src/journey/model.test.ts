import { describe, expect, it } from 'vitest'
import { mockExperiences, mockPersonalProjects } from '../api/mockData'
import { buildJourney, getMoment, timeForYear, yearForTime } from './model'

const journey = () => buildJourney(mockExperiences, mockPersonalProjects, 2026.8)

describe('career time model', () => {
  it('starts with Oreka, follows documented chronology and separates personal work', () => {
    const model = journey()
    expect(model.events[0].mission?.id).toBe(21)
    expect(model.events.map(e => e.year)).toEqual(model.events.map(e => e.year).sort((a, b) => a - b))
    expect(model.events.filter(e => e.project).map(e => e.project?.id)).toEqual(mockPersonalProjects.map(p => p.id))
    expect(model.events).toHaveLength(mockExperiences.flatMap(e => e.missions).length + mockPersonalProjects.length)
    expect(model.events.find(e => e.mission?.id === 12)?.year).toBe(2017)
    expect(model.events.find(e => e.mission?.id === 11)?.year).toBe(2023)
  })

  it('reconstructs every scene immediately after an arbitrary jump', () => {
    const model = journey()
    for (const event of model.events) {
      expect(getMoment(model, event.start).event.id).toBe(event.id)
      expect(getMoment(model, event.start).progress).toBe(0)
    }
    expect(getMoment(model, -99).event).toBe(model.events[0])
    expect(getMoment(model, model.duration + 99).event).toBe(model.events[model.events.length - 1])
    expect(getMoment(model, model.duration).progress).toBe(1)
  })

  it('keeps calendar motion monotonic despite multiple projects in the same year', () => {
    const model = journey()
    const years = Array.from({ length: 201 }, (_, i) => yearForTime(model, model.duration * i / 200))
    expect(years).toEqual([...years].sort((a, b) => a - b))
    expect(years[0]).toBe(2013)
    expect(years[years.length - 1]).toBeCloseTo(2026.8)
    for (const year of [2013.5, 2015, 2018, 2024, 2026.4]) {
      expect(yearForTime(model, timeForYear(model, year))).toBeCloseTo(year)
    }
  })

  it('allocates narrative time independently from the nine-year calendar span', () => {
    const model = journey()
    const seconds = (scene: string) => model.events.filter(e => e.scene === scene).reduce((sum, e) => sum + e.duration, 0)
    expect(seconds('industrial')).toBeCloseTo(26)
    expect(seconds('augmented') + seconds('edge')).toBeCloseTo(36)
    expect(seconds('maritime')).toBeCloseTo(28)
    expect(seconds('personal')).toBeCloseTo(24)
    expect(buildJourney([], [], 2026.8).events).toEqual([])
  })
})

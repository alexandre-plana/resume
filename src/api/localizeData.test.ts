import { describe, expect, it } from 'vitest'
import { localizeFormations, localizeSkills } from './localizeData'

describe('localizeSkills', () => {
  it('uses the stable id when the API changes the order', () => {
    const skills = [
      { id: 'backend', cat: 'Back-end', featured: false, tags: [] },
      { id: 'frontend', cat: 'Front-end', featured: true, tags: [] },
    ]
    const locale = {
      frontend: { cat: 'Interface' },
      backend: { cat: 'Services' },
    }

    expect(localizeSkills(skills, locale).map((skill) => skill.cat)).toEqual(['Services', 'Interface'])
  })

  it('keeps the source label when a translation is missing', () => {
    const skills = [{ id: 'tools', cat: 'Tools', featured: false, tags: [] }]
    expect(localizeSkills(skills, {})).toEqual(skills)
  })
})

describe('localizeFormations', () => {
  it('localizes a reordered formation list by id', () => {
    const formations = [
      { id: 'degree', kind: 'degree' as const, label: 'Degree', title: 'A', sub: '2020', meta: 'A' },
      { id: 'training', kind: 'training' as const, label: 'Training', title: 'B', sub: '2024', meta: 'B' },
    ]
    const locale = {
      training: { label: 'Formation', title: 'B FR', sub: '2024', meta: 'B FR' },
      degree: { label: 'Diplôme', title: 'A FR', sub: '2020', meta: 'A FR' },
    }

    expect(localizeFormations(formations, locale).map((item) => item.title)).toEqual(['A FR', 'B FR'])
  })
})

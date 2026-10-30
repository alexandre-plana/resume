import { describe, expect, it } from 'vitest'
import { buildDetailedModel, stackLabels } from './detailed'

describe('stackLabels', () => {
  it('keeps known technologies under their usual spelling and drops the rest', () => {
    expect(stackLabels(['vue3', 'ts', 'typescript', 'c#', 'design system'])).toEqual(['Vue 3', 'TypeScript', 'C#'])
  })
})

describe('buildDetailedModel', () => {
  it.each(['fr', 'en'] as const)('builds a complete model in %s', (language) => {
    const model = buildDetailedModel(language)

    expect(model.highlights).toHaveLength(4)
    expect(model.schneiderWeb.mission.tasks.length).toBeGreaterThan(0)
    expect(model.xpert.companionTools).toHaveLength(3)
    expect(model.oreka.keyProjects.every((mission) => mission.tasks.length > 0)).toBe(true)
    expect(model.formations.length).toBeGreaterThan(0)
  })

  it('opens on the Vue.js mission at Schneider Electric', () => {
    const { mission } = buildDetailedModel('fr').schneiderWeb

    expect(mission.title).toBe('Industrial Automation Edge (IECA)')
    expect(mission.summary).toContain('Vue 3')
    expect(mission.summary).not.toContain('#')
  })

  it('adds the IECA technical deep dive in both languages', () => {
    for (const language of ['fr', 'en'] as const) {
      const { details } = buildDetailedModel(language).schneiderWeb

      expect(details.modules).toHaveLength(4)
      expect(details.foundation.map((block) => block.title).length).toBe(4)
      expect(details.qualityStack).toContain('SonarQube')
    }
  })

  it('details Dosicase, the radiation-safety serious game and Simulhom', () => {
    const titles = buildDetailedModel('fr').oreka.keyProjects.map((mission) => mission.shortTitle)

    expect(titles).toEqual(['Dosicase', 'Formation en Radioprotection', 'Outil de prévention des TMS'])
  })

  it('keeps only web personal projects', () => {
    const names = buildDetailedModel('en').personalProjects.map((project) => project.name)

    expect(names).toEqual(['iasit', 'vorrery', 'kin'])
  })
})

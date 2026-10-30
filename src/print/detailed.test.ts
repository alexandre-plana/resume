import { describe, expect, it } from 'vitest'
import { buildDetailedModel } from './detailed'

describe('buildDetailedModel', () => {
  it.each(['fr', 'en'] as const)('builds a complete model in %s', (language) => {
    const model = buildDetailedModel(language)

    expect(model.highlights).toHaveLength(4)
    expect(model.schneiderWeb.mission.tasks.length).toBeGreaterThan(0)
    expect(model.xpert.companionTools).toHaveLength(3)
    expect(model.oreka.keyProjects.every((mission) => mission.tasks.length > 0)).toBe(true)
    expect(model.formations.length).toBeGreaterThan(0)
    expect(model.skills[0].featured).toBe(true)
  })

  it('opens on the Vue.js mission at Schneider Electric, with its tech tags kept for inline rendering', () => {
    const { mission } = buildDetailedModel('fr').schneiderWeb

    expect(mission.name).toBe('schneider-electric/iiot-edge-ieca')
    expect(mission.desc).toContain('#vue3')
  })

  it('adds the IECA technical deep dive in both languages', () => {
    for (const language of ['fr', 'en'] as const) {
      const { details } = buildDetailedModel(language).schneiderWeb

      expect(details.modules.map((block) => block.repo)).toContain('ieca-connectivity-ui')
      expect(details.foundation).toHaveLength(4)
      expect(details.other).toHaveLength(2)
    }
  })

  it('details Dosicase, the radiation-safety serious game and Simulhom', () => {
    const names = buildDetailedModel('fr').oreka.keyProjects.map((mission) => mission.name)

    expect(names).toEqual(['oreka/dosicase', 'suez/serious-game-radioprotection', 'simulhom'])
  })

  it('keeps only web personal projects', () => {
    const names = buildDetailedModel('en').personalProjects.map((project) => project.name)

    expect(names).toEqual(['iasit', 'vorrery', 'kin'])
  })
})

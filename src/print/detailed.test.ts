import { describe, expect, it } from 'vitest'
import { buildDetailedModel } from './detailed'

describe('buildDetailedModel', () => {
  it.each(['fr', 'en'] as const)('builds a complete model in %s', (language) => {
    const model = buildDetailedModel(language)

    expect(model.overview.map((company) => company.entries.length)).toEqual([3, 2, 1])
    expect(model.schneiderWeb.mission.tasks.length).toBeGreaterThan(0)
    expect(model.xpert.companionTools).toHaveLength(3)
    expect(model.oreka.keyProjects.every((mission) => mission.tasks.length > 0)).toBe(true)
    expect(model.formations.length).toBeGreaterThan(0)
  })

  it('opens on the Vue.js mission at Schneider Electric, with its tech tags kept for inline rendering', () => {
    const { mission } = buildDetailedModel('fr').schneiderWeb

    expect(mission.name).toBe('schneider-electric/iiot-edge-ieca')
    expect(mission.desc).toContain('#vue3')
  })

  it('describes every IECA front-end component in both languages', () => {
    for (const language of ['fr', 'en'] as const) {
      const { details } = buildDetailedModel(language).schneiderWeb

      const repos = details.groups.flatMap((group) => group.blocks.map((block) => block.repo))
      expect(details.groups).toHaveLength(5)
      expect(repos).toContain('ieca-connectivity-ui')
      expect(repos).toContain('ieca-platform-configuration-ui')
    }
  })

  it('lists the Oreka projects in the cover timeline and highlights web, Vue and AI', () => {
    const [xpert, schneider, oreka] = buildDetailedModel('fr').overview

    const orekaProjects = oreka.entries[0].projects
    expect(orekaProjects).toHaveLength(7)
    expect(orekaProjects.filter((project) => project.key).map((project) => project.name)).toEqual([
      'oreka/dosicase',
      'suez/serious-game-radioprotection',
      'simulhom',
    ])
    expect(schneider.entries[0].chips.map((chip) => chip.l)).toContain('vue 3')
    expect(xpert.entries.filter((entry) => entry.featured).map((entry) => entry.name)).toEqual([
      'x-pert/xistar',
      'x-pert/ai-workflow',
    ])
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

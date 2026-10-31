import { describe, expect, it } from 'vitest'
import { buildDetailedModel } from './detailed'
import { frenchTypography } from './detailedContent'

describe('buildDetailedModel', () => {
  it.each(['fr', 'en'] as const)('builds a complete model in %s', (language) => {
    const model = buildDetailedModel(language)

    expect(model.overview.map((company) => company.entries.length)).toEqual([3, 2, 5])
    expect(model.overview[2].more).toBeTruthy()
    expect(model.overview[0].head.period).toMatch(/2026/)
    expect(model.schneiderWeb.mission.tasks.length).toBeGreaterThan(0)
    expect(model.xpert.missions.map((mission) => mission.name)).toEqual([
      'x-pert/xistar',
      'x-pert/ai-workflow',
      'x-pert/xpert-design-system',
    ])
    expect(model.oreka.projects).toHaveLength(7)
    expect(model.skills[0].featured).toBe(true)
  })

  it('names the employer first and the client second in both languages', () => {
    for (const language of ['fr', 'en'] as const) {
      const heads = buildDetailedModel(language).overview.map((company) => company.head.company)
      expect(heads).toEqual(['Datacorp', 'Datacorp', 'Oreka Ingénierie'])
    }
  })

  it('dates detail sections with the mission period', () => {
    const model = buildDetailedModel('fr')

    expect(model.schneiderWeb.head.period).toBe('2023 – 2026')
    expect(model.schneiderAr.head.period).toBe('2017 – 2023')
  })

  it('opens on the Vue.js mission at Schneider Electric, with its tech tags kept for inline rendering', () => {
    const { mission } = buildDetailedModel('fr').schneiderWeb

    expect(mission.name).toBe('schneider-electric/iiot-edge-ieca')
    expect(mission.tasks[0]).toContain('#vue3')
    expect(mission.team).toContain('Scrum')
  })

  it('lists every IECA micro-frontend in both languages', () => {
    for (const language of ['fr', 'en'] as const) {
      const { details } = buildDetailedModel(language).schneiderWeb
      const repos = details.groups.flatMap((group) => group.blocks.map((block) => block.repo))

      expect(repos).toContain('ieca-connectivity-ui')
      expect(repos).not.toContain('ieca-data-publication-ui')
      const microFrontends = details.groups.filter((group) => group.title !== 'Prototypes').flatMap((group) => group.blocks)
      expect(microFrontends.every((block) => block.tags?.[0] === 'vue3')).toBe(true)
      expect(details.groups[details.groups.length - 1].blocks).toHaveLength(2)
    }
  })

  it('highlights web, Vue and AI in the cover timeline', () => {
    const [xpert, schneider, oreka] = buildDetailedModel('fr').overview

    expect(xpert.entries.filter((entry) => entry.featured).map((entry) => entry.name)).toEqual([
      'x-pert/xistar',
      'x-pert/ai-workflow',
    ])
    expect(schneider.entries[0].chips.map((chip) => chip.l)).toContain('vue 3')
    expect(oreka.entries.map((entry) => entry.name)).not.toContain('oreka/dosicase')
    expect(oreka.entries.map((entry) => entry.name)).not.toContain('edf/aeroball')
  })

  it('keeps only finished web personal projects', () => {
    const names = buildDetailedModel('en').personalProjects.map((project) => project.name)

    expect(names).toEqual(['time-weave', 'multi-screen', 'iasit'])
  })
})

describe('frenchTypography', () => {
  it('adds narrow no-break spaces before high punctuation and curls apostrophes', () => {
    expect(frenchTypography("l'équipe : test ; ok ?")).toBe('l’équipe : test ; ok ?')
  })
})

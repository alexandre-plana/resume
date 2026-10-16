import { describe, expect, it } from 'vitest'
import { buildOnePageModel, firstSentence, shortTitle, toPlainText } from './onePage'

describe('toPlainText', () => {
  it('replaces tech tags by their display name', () => {
    expect(toPlainText('Interface en #typescript et #react.')).toBe('Interface en TypeScript et React.')
  })

  it('drops tags that only repeat the preceding word', () => {
    expect(toPlainText('des serious games #seriousgame, des simulateurs')).toBe('des serious games, des simulateurs')
  })
})

describe('firstSentence', () => {
  it('keeps only the first sentence', () => {
    expect(firstSentence('Première phrase. Deuxième phrase.')).toBe('Première phrase.')
  })
})

describe('shortTitle', () => {
  it('keeps the name before the dash and drops a trailing parenthesis', () => {
    expect(shortTitle('Dosicase — Simulateur de radioactivité')).toBe('Dosicase')
    expect(shortTitle('Outil de prévention des TMS (Troubles Musculo-Squelettiques)')).toBe('Outil de prévention des TMS')
  })
})

describe('buildOnePageModel', () => {
  it.each(['fr', 'en'] as const)('builds a complete model in %s', (language) => {
    const model = buildOnePageModel(language)

    expect(model.experiences.map((experience) => experience.company)).toContain('Datacorp')
    expect(model.experiences.every((experience) => experience.items.length > 0)).toBe(true)
    expect(model.skills.length).toBeGreaterThan(0)
    expect(model.formations.length).toBeGreaterThan(0)
  })

  it('attaches sub-projects to their parent mission instead of listing them', () => {
    const xistar = buildOnePageModel('fr').experiences[0].items.find((item) => item.title.startsWith('Xistar'))

    expect(xistar?.related).toHaveLength(3)
  })

  it('leaves excluded personal projects out', () => {
    const names = buildOnePageModel('fr').personalProjects.map((project) => project.name)

    expect(names).not.toContain('n-fold-protocol')
  })
})

import { describe, expect, it } from 'vitest'
import { translations } from './index'

describe('French translations', () => {
  it('uses correct accents in visible labels', () => {
    expect(translations.fr.common.coreSkills).toBe('Compétences clés')
    expect(translations.fr.common.noData).toBe('Aucune donnée à afficher.')
    expect(translations.fr.sections.about).toBe('À propos')
    expect(translations.fr.sections.professionalExperience).toBe('Expériences professionnelles')
    expect(translations.fr.mission.tasksTitle).toBe('Exemples de tâches effectuées')
    expect(translations.fr.mission.retrospective).toBe('Rétrospective')
  })
})

import type { Formation, Skill } from '../types'

type LocalizedSkill = Pick<Skill, 'cat'>
type LocalizedFormation = Pick<Formation, 'label' | 'title' | 'sub' | 'meta'>

export const localizeSkills = (skills: Skill[], locale: Record<string, LocalizedSkill>): Skill[] =>
  skills.map((skill) => ({ ...skill, ...(locale[skill.id] ?? {}) }))

export const localizeFormations = (
  formations: Formation[],
  locale: Record<string, LocalizedFormation>,
): Formation[] => formations.map((formation) => ({ ...formation, ...(locale[formation.id] ?? {}) }))

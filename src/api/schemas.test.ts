import { describe, expect, it } from 'vitest'
import { personalProjectSchema } from './schemas'

const baseProject = {
  id: 4,
  name: 'iasit',
  kind: 'Outil de pilotage',
  role: 'Conception',
  desc: 'Description',
  stack: ['react'],
  period: '2026',
}

describe('personalProjectSchema', () => {
  it('preserves a valid optional image gallery', () => {
    const project = personalProjectSchema.parse({
      ...baseProject,
      images: [{ src: 'images/projects/iasit/dashboard.webp', alt: 'Tableau de bord Iasit' }],
    })

    expect(project.images).toEqual([
      { src: 'images/projects/iasit/dashboard.webp', alt: 'Tableau de bord Iasit' },
    ])
  })

  it('accepts a project without images', () => {
    expect(personalProjectSchema.parse(baseProject)).toEqual(baseProject)
  })
})

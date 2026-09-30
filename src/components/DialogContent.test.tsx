import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { translations } from '../locales'
import { MissionDialog } from './MissionDialog'
import { ProjectDialog } from './ProjectDialog'

afterEach(() => cleanup())

const animation = { fromX: 0, fromY: 0, fromScale: 1 }

describe('dialog close controls', () => {
  it('gives the mission close control the translated accessible name', () => {
    render(
      <MissionDialog
        popout={{
          mission: {
            id: 11,
            type: 'mission',
            featured: false,
            name: 'Mission',
            badge: 'Badge',
            period: '2026',
            context: 'Context',
            desc: 'Description',
            tags: [],
          },
          company: 'Company',
          employer: 'Role',
          animation,
        }}
        t={translations.fr}
        onClose={() => undefined}
        onOpenPersonalProject={() => undefined}
      />,
    )

    expect(screen.getByRole('button', { name: translations.fr.mission.close })).toBeInTheDocument()
  })

  it('gives the project close control the translated accessible name', () => {
    render(
      <ProjectDialog
        popout={{
          project: {
            id: 4,
            name: 'Project',
            kind: 'Tool',
            role: 'Design',
            desc: 'Description',
            stack: [],
            period: '2026',
          },
          animation,
        }}
        t={translations.en}
        onClose={() => undefined}
      />,
    )

    expect(screen.getByRole('button', { name: translations.en.mission.close })).toBeInTheDocument()
  })
})

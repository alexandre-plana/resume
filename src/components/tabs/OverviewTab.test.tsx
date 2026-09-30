import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { translations } from '../../locales'
import type { Experience } from '../../types'
import { OverviewTab } from './OverviewTab'

afterEach(() => cleanup())

describe('OverviewTab mission card names', () => {
  it('includes each visible mission name in its accessible card name', () => {
    const experience: Experience = {
      id: 1,
      company: 'Company',
      employer: 'Role',
      period: '2026',
      missions: [
        {
          id: 11,
          type: 'mission',
          featured: false,
          name: 'Main mission',
          badge: 'Badge',
          period: '2026',
          context: 'Context',
          desc: 'Description',
          tags: [],
        },
        {
          id: 12,
          type: 'projet',
          parentMissionId: 11,
          featured: false,
          name: 'Attached project',
          badge: 'Badge',
          period: '2026',
          context: 'Context',
          desc: 'Description',
          tags: [],
        },
      ],
    }

    render(
      <OverviewTab
        state={{ status: 'ready', data: [experience] }}
        language="fr"
        t={translations.fr}
        onOpenMission={() => undefined}
      />,
    )

    expect(screen.getByRole('button', { name: /Main mission/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Attached project/i })).toBeInTheDocument()
  })
})

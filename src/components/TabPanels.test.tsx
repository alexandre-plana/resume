import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { getTranslations } from '../locales'
import { TabPanels } from './TabPanels'

afterEach(() => cleanup())

const renderPanels = (activeTab: 'overview' | 'formations' | 'personal') =>
  render(
    <>
      <button id="tab-overview">📋 Aperçu</button>
      <button id="tab-formations">🎓 Formations</button>
      <button id="tab-personal">🛠️ Projets persos</button>
      <TabPanels
        activeTab={activeTab}
        experiencesState={{ status: 'loading' }}
        formationState={{ status: 'loading' }}
        personalProjectsState={{ status: 'loading' }}
        language="fr"
        t={getTranslations('fr')}
        onOpenMission={() => undefined}
      />
    </>,
  )

describe('TabPanels', () => {
  it('keeps the overview panel mounted while personal projects are active', () => {
    renderPanels('personal')

    expect(screen.getByRole('tabpanel', { name: /projets/i })).toHaveAttribute('aria-hidden', 'false')
    const overview = screen.getAllByRole('tabpanel', { hidden: true })[0]
    expect(overview).toBeInTheDocument()
    expect(overview).toHaveClass('overviewPanel')
    expect(screen.queryByRole('tabpanel', { name: /formations/i, hidden: true })).not.toBeInTheDocument()
  })

  it('keeps the overview panel mounted while formations are active', () => {
    renderPanels('formations')

    expect(screen.getByRole('tabpanel', { name: /formations/i })).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getAllByRole('tabpanel', { hidden: true })[0]).toHaveClass('overviewPanel')
    expect(screen.queryByRole('tabpanel', { name: /projets/i, hidden: true })).not.toBeInTheDocument()
  })
})

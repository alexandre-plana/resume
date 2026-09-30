import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { getTranslations } from '../locales'
import { TabPanels } from './TabPanels'

afterEach(() => cleanup())

const renderPanels = (activeTab: 'overview' | 'formations' | 'personal') =>
  render(
    <>
      <button role="tab" id="tab-overview">📋 Aperçu</button>
      <button role="tab" id="tab-formations">🎓 Formations</button>
      <button role="tab" id="tab-personal">🛠️ Projets persos</button>
      <TabPanels
        activeTab={activeTab}
        experiencesState={{ status: 'ready', data: [] }}
        formationState={{ status: 'ready', data: [] }}
        personalProjectsState={{ status: 'ready', data: [] }}
        language="fr"
        t={getTranslations('fr')}
        onOpenMission={() => undefined}
      />
    </>,
  )

describe('TabPanels', () => {
  it('marks overview active when overview is selected', () => {
    renderPanels('overview')

    expect(screen.getByRole('tabpanel', { name: /aperçu/i })).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByRole('tabpanel', { name: /aperçu/i })).toHaveClass('overviewPanel')
    expect(screen.queryByRole('tabpanel', { name: /formations/i, hidden: true })).not.toBeInTheDocument()
    expect(screen.queryByRole('tabpanel', { name: /projets/i, hidden: true })).not.toBeInTheDocument()
  })

  it('keeps the overview panel mounted while personal projects are active', () => {
    renderPanels('personal')

    expect(screen.getByRole('tabpanel', { name: /projets/i })).toHaveAttribute('aria-hidden', 'false')
    const overview = document.getElementById('panel-overview')
    expect(overview).not.toBeNull()
    expect(overview).toBeInTheDocument()
    expect(overview).toHaveClass('overviewPanel')
    expect(overview).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('tabpanel', { name: /formations/i, hidden: true })).not.toBeInTheDocument()
  })

  it('keeps the overview panel mounted while formations are active', () => {
    renderPanels('formations')

    expect(screen.getByRole('tabpanel', { name: /formations/i })).toHaveAttribute('aria-hidden', 'false')
    const overview = document.getElementById('panel-overview')
    expect(overview).toHaveClass('overviewPanel')
    expect(overview).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('tabpanel', { name: /projets/i, hidden: true })).not.toBeInTheDocument()
  })
})

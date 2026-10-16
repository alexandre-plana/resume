import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Toolbar } from './Toolbar'

describe('Toolbar', () => {
  it.each([
    ['fr', 'Exporter PDF'],
    ['en', 'Export PDF'],
  ] as const)('links the %s one-page PDF', (language, label) => {
    render(<Toolbar language={language} />)

    const link = screen.getByRole('link', { name: new RegExp(label) })

    expect(link.getAttribute('href')).toMatch(new RegExp(`pdf/cv-alexandre-plana-${language}\\.pdf$`))
    expect(link).toHaveAttribute('download')
  })

  it('no longer offers the Word export', () => {
    render(<Toolbar language="fr" />)

    expect(screen.queryByText(/Word/)).not.toBeInTheDocument()
  })
})

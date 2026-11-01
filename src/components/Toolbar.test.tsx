import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Toolbar } from './Toolbar'

describe('Toolbar', () => {
  afterEach(cleanup)

  it.each([
    ['fr', 'CV une page'],
    ['en', 'One-page CV'],
  ] as const)('links the %s one-page PDF', (language, label) => {
    render(<Toolbar language={language} />)

    const link = screen.getByRole('link', { name: new RegExp(label) })

    expect(link.getAttribute('href')).toMatch(new RegExp(`pdf/cv-alexandre-plana-${language}\\.pdf$`))
    expect(link).toHaveAttribute('download')
  })

  it.each([
    ['fr', 'CV détaillé'],
    ['en', 'Detailed CV'],
  ] as const)('links the %s detailed PDF', (language, label) => {
    render(<Toolbar language={language} />)

    const link = screen.getByRole('link', { name: new RegExp(label) })

    expect(link.getAttribute('href')).toMatch(new RegExp(`pdf/cv-alexandre-plana-detaille-${language}\\.pdf$`))
    expect(link).toHaveAttribute('download')
  })

  it('no longer offers the Word export', () => {
    render(<Toolbar language="fr" />)

    expect(screen.queryByText(/Word/)).not.toBeInTheDocument()
  })
})

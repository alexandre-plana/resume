import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { translations } from '../locales'
import type { PersonalProject } from '../types'
import { PersonalProjectsTab } from './tabs/PersonalProjectsTab'

const project = {
  id: 4,
  name: 'iasit',
  kind: 'Pilotage du développement assisté par IA',
  role: 'Conception produit & développement full-stack',
  desc: 'Description du projet',
  stack: ['react', 'typescript'],
  period: '2026',
  images: [
    { src: 'images/projects/iasit/execution.webp', alt: 'Vue des exécutions' },
    { src: 'images/projects/iasit/finding.webp', alt: 'Vue des findings' },
  ],
} as PersonalProject & { images: Array<{ src: string; alt: string }> }

afterEach(() => cleanup())

describe('project image gallery', () => {
  it('switches the main image from the vertical thumbnail rail', async () => {
    const user = userEvent.setup()

    render(
      <PersonalProjectsTab
        state={{ status: 'ready', data: [project] }}
        t={translations.fr}
      />,
    )

    await user.click(screen.getByRole('button', { name: /iasit/i }))

    expect(screen.getByRole('img', { name: 'Vue des exécutions' })).toHaveAttribute(
      'src',
      '/resume/images/projects/iasit/execution.webp',
    )
    expect(screen.getByText('1 / 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Afficher Vue des findings' }))

    expect(screen.getByRole('img', { name: 'Vue des findings' })).toHaveAttribute(
      'src',
      '/resume/images/projects/iasit/finding.webp',
    )
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
  })

  it('wraps navigation with the previous and next controls', async () => {
    const user = userEvent.setup()

    render(
      <PersonalProjectsTab
        state={{ status: 'ready', data: [project] }}
        t={translations.fr}
      />,
    )

    await user.click(screen.getByRole('button', { name: /iasit/i }))
    await user.click(screen.getByRole('button', { name: translations.fr.personalModal.previousImage }))
    expect(screen.getByRole('img', { name: 'Vue des findings' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: translations.fr.personalModal.nextImage }))
    expect(screen.getByRole('img', { name: 'Vue des exécutions' })).toBeInTheDocument()
  })

  it('removes an image that cannot be loaded', async () => {
    const user = userEvent.setup()

    render(
      <PersonalProjectsTab
        state={{ status: 'ready', data: [project] }}
        t={translations.fr}
      />,
    )

    await user.click(screen.getByRole('button', { name: /iasit/i }))
    fireEvent.error(screen.getByRole('img', { name: 'Vue des exécutions' }))

    expect(screen.getByRole('img', { name: 'Vue des findings' })).toBeInTheDocument()
    expect(screen.queryByText('1 / 1')).not.toBeInTheDocument()
  })

  it('keeps the detail layout image-free when a project has no gallery', async () => {
    const user = userEvent.setup()
    const projectWithoutImages: PersonalProject = { ...project, images: undefined }

    render(
      <PersonalProjectsTab
        state={{ status: 'ready', data: [projectWithoutImages] }}
        t={translations.fr}
      />,
    )

    await user.click(screen.getByRole('button', { name: /iasit/i }))

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: translations.fr.personalModal.nextImage })).not.toBeInTheDocument()
  })
})

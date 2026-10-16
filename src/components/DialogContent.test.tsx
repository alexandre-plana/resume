import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { translations } from '../locales'
import { missionSchema } from '../api/schemas'
import { MissionDialog } from './MissionDialog'
import { ProjectDialog } from './ProjectDialog'

afterEach(() => cleanup())

const animation = { fromX: 0, fromY: 0, fromScale: 1 }

describe('professional mission screenshots', () => {
  it('browses images and videos without autoplay and unloads a video when leaving it', async () => {
    const user = userEvent.setup()
    const mission = missionSchema.parse({
      id: 37, type: 'mission', featured: false,
      name: 'x-pert/xpert-promo-video', badge: 'R&D', period: '2026',
      context: 'Vidéos promotionnelles', desc: 'Description', tags: [],
      images: [
        { type: 'video', src: 'videos/projects/promo/xear.mp4', poster: 'images/projects/promo/xear.webp', alt: 'Vidéo XEAR' },
        { type: 'video', src: 'videos/projects/promo/xtorp.mp4', poster: 'images/projects/promo/xtorp.webp', alt: 'Vidéo XTORP' },
        { src: 'images/projects/promo/preview.webp', alt: 'Aperçu' },
      ],
    })
    render(
      <MissionDialog
        popout={{ mission, company: 'Datacorp', employer: 'X-PERT', animation }}
        t={translations.fr} onClose={() => undefined} onOpenPersonalProject={() => undefined}
      />,
    )

    const firstVideo = screen.getByLabelText('Vidéo XEAR')
    expect(firstVideo.tagName).toBe('VIDEO')
    expect(firstVideo).toHaveAttribute('src', '/resume/videos/projects/promo/xear.mp4')
    expect(firstVideo).toHaveAttribute('poster', '/resume/images/projects/promo/xear.webp')
    expect(firstVideo).toHaveAttribute('controls')
    expect(firstVideo).toHaveAttribute('preload', 'none')
    expect(firstVideo).not.toHaveAttribute('autoplay')

    await user.click(screen.getByRole('button', { name: 'Afficher Vidéo XTORP' }))
    expect(firstVideo.isConnected).toBe(false)
    const secondVideo = screen.getByLabelText('Vidéo XTORP')
    expect(secondVideo).not.toBe(firstVideo)
    expect(secondVideo).toHaveAttribute('src', '/resume/videos/projects/promo/xtorp.mp4')

    fireEvent.error(secondVideo)
    expect(screen.queryByLabelText('Vidéo XTORP')).not.toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Afficher Aperçu' }))
    expect(screen.queryByLabelText('Vidéo XEAR')).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Aperçu' })).toBeInTheDocument()
  })

  it('preserves screenshots through validation and lets the reader browse them', async () => {
    const user = userEvent.setup()
    const mission = missionSchema.parse({
      id: 36,
      type: 'mission',
      featured: false,
      name: 'x-pert/xpert-design-system',
      badge: 'Conception UI',
      period: '2026',
      context: 'Design system',
      desc: 'Description',
      tags: [],
      images: [
        { src: 'images/projects/xpert-design-system/components.webp', alt: 'Bibliothèque de composants' },
        { src: 'images/projects/xpert-design-system/charts.webp', alt: 'Graphiques et treemaps' },
      ],
    })

    render(
      <MissionDialog
        popout={{ mission, company: 'Datacorp', employer: 'X-PERT', animation }}
        t={translations.fr}
        onClose={() => undefined}
        onOpenPersonalProject={() => undefined}
      />,
    )

    expect(screen.getByRole('img', { name: 'Bibliothèque de composants' })).toHaveAttribute(
      'src', '/resume/images/projects/xpert-design-system/components.webp',
    )
    await user.click(screen.getByRole('button', { name: translations.fr.personalModal.nextImage }))
    expect(screen.getByRole('img', { name: 'Graphiques et treemaps' })).toBeInTheDocument()
  })
})

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

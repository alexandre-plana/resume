import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { translations } from '../../locales'
import type { PersonalProject } from '../../types'
import { PersonalProjectsTab } from './PersonalProjectsTab'

const project: PersonalProject = {
  id: 4,
  name: 'iasit',
  kind: 'Outil de pilotage',
  role: 'Conception',
  desc: 'Description',
  stack: ['react'],
  period: '2026',
}

const otherProject: PersonalProject = { ...project, id: 5, name: 'other' }

afterEach(() => {
  cleanup()
  window.history.replaceState({}, '', '/')
  vi.restoreAllMocks()
})

describe('PersonalProjectsTab deep links', () => {
  it('does not steal focus again when an equivalent state object is rendered', () => {
    window.history.replaceState({}, '', '/#personal-project-4')
    const queuedFrames: FrameRequestCallback[] = []
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        queuedFrames.push(callback)
        return queuedFrames.length
      })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    })

    const { rerender } = render(
      <PersonalProjectsTab state={{ status: 'ready', data: [project] }} t={translations.fr} />,
    )
    expect(requestAnimationFrame).toHaveBeenCalledOnce()

    act(() => {
      queuedFrames.shift()?.(0)
    })

    rerender(
      <PersonalProjectsTab state={{ status: 'ready', data: [project] }} t={translations.fr} />,
    )

    expect(requestAnimationFrame).toHaveBeenCalledOnce()
  })

  it('focuses the deep-linked project when it appears without changing the list length', () => {
    window.history.replaceState({}, '', '/#personal-project-4')
    const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    })

    const { rerender } = render(
      <PersonalProjectsTab state={{ status: 'ready', data: [otherProject] }} t={translations.fr} />,
    )
    expect(requestAnimationFrame).not.toHaveBeenCalled()

    rerender(
      <PersonalProjectsTab state={{ status: 'ready', data: [project] }} t={translations.fr} />,
    )

    expect(requestAnimationFrame).toHaveBeenCalledOnce()
  })

  it('does not refocus when another project changes while the target stays available', () => {
    window.history.replaceState({}, '', '/#personal-project-4')
    const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    })

    const { rerender } = render(
      <PersonalProjectsTab state={{ status: 'ready', data: [project] }} t={translations.fr} />,
    )
    expect(requestAnimationFrame).toHaveBeenCalledOnce()

    rerender(
      <PersonalProjectsTab state={{ status: 'ready', data: [project, otherProject] }} t={translations.fr} />,
    )

    expect(requestAnimationFrame).toHaveBeenCalledOnce()
  })
})

describe('PersonalProjectsTab localized dialog', () => {
  it('derives an open project dialog from the current localized project', () => {
    const frenchProject: PersonalProject = { ...project, name: 'Projet FR', desc: 'Description FR' }
    const englishProject: PersonalProject = { ...project, name: 'Project EN', desc: 'Description EN' }

    const { rerender } = render(
      <PersonalProjectsTab state={{ status: 'ready', data: [frenchProject] }} t={translations.fr} />,
    )
    fireEvent.click(screen.getByText('Projet FR'))
    expect(within(screen.getByRole('dialog')).getByText('Description FR')).toBeInTheDocument()

    rerender(<PersonalProjectsTab state={{ status: 'ready', data: [englishProject] }} t={translations.en} />)

    expect(within(screen.getByRole('dialog')).getByText('Description EN')).toBeInTheDocument()
  })
})

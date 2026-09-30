import { act, cleanup, render } from '@testing-library/react'
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
})

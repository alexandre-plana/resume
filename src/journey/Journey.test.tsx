import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { mockExperiences, mockPersonalProjects, mockProfile } from '../api/mockData'
import { useAppStore } from '../store/appStore'
import Journey from './Journey'
import { useExperiences } from '../hooks/useApi'
import { useJourneyClock } from './useJourneyClock'

vi.mock('../hooks/useApi', () => ({
  useProfile: () => ({ data: mockProfile, refetch: vi.fn() }),
  useExperiences: vi.fn(() => ({ data: mockExperiences })),
  usePersonalProjects: () => ({ data: mockPersonalProjects }),
}))

let frames: Map<number, FrameRequestCallback>
let frameId = 0
beforeEach(() => {
  frames = new Map()
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => { frames.set(++frameId, callback); return frameId }))
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => frames.delete(id)))
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  useAppStore.setState({ language: 'fr' })
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

function frame(time: number) {
  act(() => {
    const callbacks = [...frames.values()]
    frames.clear()
    callbacks.forEach(callback => callback(time))
  })
}

it('plays from Oreka, pauses all narrative motion and supports direct project jumps', () => {
  render(<Journey />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Oreka')
  expect(screen.getByRole('button', { name: 'Mettre en pause' })).toBeInTheDocument()
  frame(0); frame(1000)
  const slider = screen.getByRole('slider', { name: 'Position dans le parcours' })
  fireEvent.click(screen.getByRole('button', { name: 'Mettre en pause' }))
  const paused = (slider as HTMLInputElement).value
  const frozenWorld = document.querySelector('.journey-world')!.innerHTML
  frame(2000); frame(3000)
  expect((slider as HTMLInputElement).value).toBe(paused)
  expect(document.querySelector('.journey-world')!.innerHTML).toBe(frozenWorld)
  fireEvent.click(screen.getByRole('button', { name: /Sélectionner xistar$/i }))
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('X-PERT')
  expect(screen.getByRole('button', { name: 'Lire le parcours' })).toBeInTheDocument()
  fireEvent.keyDown(window, { key: 'Home' })
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Oreka')
  fireEvent.keyDown(screen.getByRole('button', { name: 'Lire le parcours' }), { key: 'End' })
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Explorations')
  expect(screen.getByRole('link', { name: 'CV classique' })).toHaveAttribute('href', '?view=cv&lang=fr')
})

it('scrubs the calendar, preserves position on language change and ignores shortcuts in controls', () => {
  render(<Journey />)
  const slider = screen.getByRole('slider', { name: 'Position dans le parcours' })
  fireEvent.change(slider, { target: { value: '2024' } })
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Schneider')
  expect(screen.getByText('Industrial Automation Edge (IECA)')).toBeInTheDocument()
  fireEvent.keyDown(slider, { key: 'End' })
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Schneider')
  fireEvent.click(screen.getByRole('button', { name: 'English' }))
  expect(screen.getByRole('link', { name: 'Classic résumé' })).toHaveAttribute('href', '?view=cv&lang=en')
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Schneider')
})

it('starts paused when reduced motion is requested and releases viewport styles on exit', () => {
  vi.mocked(window.matchMedia).mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList)
  const { unmount } = render(<Journey />)
  expect(screen.getByRole('button', { name: 'Lire le parcours' })).toBeInTheDocument()
  expect(document.body).toHaveClass('journey-open')
  unmount()
  expect(document.body).not.toHaveClass('journey-open')
})

it('waits for professional history and exposes its own retry when personal data succeeded', () => {
  const refetch = vi.fn()
  vi.mocked(useExperiences).mockReturnValueOnce({ data: undefined, isPending: true, isError: false } as ReturnType<typeof useExperiences>)
  const { unmount } = render(<Journey />)
  expect(screen.getByRole('status')).toHaveTextContent('Chargement')
  expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument()
  expect(frames.size).toBe(0)
  unmount()
  vi.mocked(useExperiences).mockReturnValueOnce({ data: undefined, isError: true, refetch } as unknown as ReturnType<typeof useExperiences>)
  render(<Journey />)
  expect(screen.getByRole('status')).toHaveTextContent('indisponible')
  expect(screen.getByRole('button', { name: 'Réessayer' })).toBeInTheDocument()
  expect(frames.size).toBe(0)
  fireEvent.click(screen.getByRole('button', { name: 'Réessayer' }))
  expect(refetch).toHaveBeenCalledOnce()
})

it('uses elapsed time, applies speed, stops at the end and resumes from a seek', () => {
  const { result } = renderHook(() => useJourneyClock(10))
  frame(0); frame(1000)
  expect(result.current.time).toBe(1)
  act(() => result.current.setSpeed(2))
  frame(2000); frame(2500)
  expect(result.current.time).toBe(2)
  act(() => result.current.seek(9))
  expect(result.current.playing).toBe(false)
  act(() => result.current.toggle())
  frame(3000); frame(4000)
  expect(result.current.time).toBe(10)
  expect(result.current.playing).toBe(false)
  act(() => result.current.toggle())
  expect(result.current.time).toBe(0)
  expect(result.current.playing).toBe(true)
})

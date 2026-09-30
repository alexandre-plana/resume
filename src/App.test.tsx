import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getTranslations } from './locales'
import { useExperiences, useFormation, usePersonalProjects, useProfile, useSkills } from './hooks/useApi'

vi.mock('./hooks/useApi', () => ({
  useExperiences: vi.fn(),
  useFormation: vi.fn(),
  usePersonalProjects: vi.fn(),
  useProfile: vi.fn(),
  useSkills: vi.fn(),
}))

import App, { getAsyncViewState } from './App'

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('getAsyncViewState', () => {
  it('keeps a pending paused query in the loading state', () => {
    const pausedQuery = {
      data: undefined,
      isLoading: false,
      isPending: true,
      isError: false,
      status: 'pending' as const,
    }
    const state = getAsyncViewState<string>(
      pausedQuery,
      'Unable to load data',
    )

    expect(state).toEqual({ status: 'loading' })
  })
})

describe('App profile query guard', () => {
  it('renders loading while the profile query is pending and paused', () => {
    vi.mocked(useProfile).mockReturnValue({
      data: undefined,
      isLoading: false,
      isPending: true,
      isError: false,
      status: 'pending',
    } as unknown as ReturnType<typeof useProfile>)
    vi.mocked(useExperiences).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useExperiences>)
    vi.mocked(useFormation).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useFormation>)
    vi.mocked(usePersonalProjects).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof usePersonalProjects>)
    vi.mocked(useSkills).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useSkills>)

    render(<App />)

    expect(screen.getByText(getTranslations('fr').common.loading)).toBeInTheDocument()
    expect(screen.queryByText(getTranslations('fr').queryErrors.profile)).not.toBeInTheDocument()
  })
})

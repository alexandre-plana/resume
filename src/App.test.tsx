import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getTranslations } from './locales'
import { useExperiences, useFormation, usePersonalProjects, useProfile, useSkills } from './hooks/useApi'
import { useAppStore } from './store/appStore'
import type { Experience, Formation, PersonalProject, Profile, Skill } from './types'
import { mockProfile } from './api/mockData'

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

  it('renders loading for skills while the query is pending and paused', () => {
    vi.mocked(useProfile).mockReturnValue({ data: mockProfile, isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useProfile>)
    vi.mocked(useExperiences).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useExperiences>)
    vi.mocked(useFormation).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useFormation>)
    vi.mocked(usePersonalProjects).mockReturnValue({ data: [], isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof usePersonalProjects>)
    vi.mocked(useSkills).mockReturnValue({ data: undefined, isLoading: false, isPending: true, isError: false, status: 'pending' } as unknown as ReturnType<typeof useSkills>)

    render(<App />)

    expect(screen.getByText(getTranslations('fr').common.loading)).toBeInTheDocument()
    expect(screen.queryByText(getTranslations('fr').queryErrors.skills)).not.toBeInTheDocument()
  })
})

describe('App localized dialogs', () => {
  const profile: Profile = {
    name: 'Alex',
    handle: 'alex',
    title: 'Developer',
    subtitle: 'Applications',
    bio: 'Bio',
    company: 'Company',
    location: 'France',
    email: 'alex@example.com',
    phone: '+33 1 23 45 67 89',
    langs: [],
    interests: [],
  }
  const skills: Skill[] = []
  const formation: Formation[] = []
  const project: PersonalProject[] = []
  const frenchExperiences: Experience[] = [
    {
      id: 1,
      company: 'Société FR',
      employer: 'Rôle FR',
      period: '2026',
      missions: [
        {
          id: 11,
          type: 'mission',
          featured: false,
          name: 'Mission FR',
          badge: 'Badge FR',
          period: '2026',
          context: 'Contexte FR',
          desc: 'Description FR',
          tags: [],
        },
      ],
    },
  ]
  const englishExperiences: Experience[] = [
    {
      ...frenchExperiences[0],
      company: 'Company EN',
      employer: 'Role EN',
      missions: [{ ...frenchExperiences[0].missions[0], name: 'Mission EN', badge: 'Badge EN', context: 'Context EN', desc: 'Description EN' }],
    },
  ]

  afterEach(() => {
    useAppStore.setState({ language: 'fr', activeTab: 'overview' })
  })

  it('derives an open mission dialog from the current localized experiences', () => {
    vi.mocked(useProfile).mockReturnValue({ data: profile, isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useProfile>)
    vi.mocked(useSkills).mockReturnValue({ data: skills, isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useSkills>)
    vi.mocked(useFormation).mockReturnValue({ data: formation, isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useFormation>)
    vi.mocked(usePersonalProjects).mockReturnValue({ data: project, isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof usePersonalProjects>)
    vi.mocked(useExperiences).mockImplementation(() => {
      const language = useAppStore.getState().language
      return { data: language === 'fr' ? frenchExperiences : englishExperiences, isPending: false, isError: false, status: 'success' } as unknown as ReturnType<typeof useExperiences>
    })

    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Mission FR/i }))
    expect(screen.getByRole('dialog')).toHaveTextContent('Description FR')

    act(() => {
      useAppStore.getState().setLanguage('en')
    })

    expect(screen.getByRole('dialog')).toHaveTextContent('Description EN')
    expect(screen.getByRole('dialog')).toHaveTextContent('Company EN')
  })
})

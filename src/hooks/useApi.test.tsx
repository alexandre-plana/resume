import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '../api'
import { useAppStore } from '../store/appStore'
import { usePersonalProjects, useSkills } from './useApi'

describe('useSkills', () => {
  const skills = [
    {
      id: 'languages',
      cat: 'Langages',
      featured: false,
      tags: [],
    },
  ]

  beforeEach(() => {
    useAppStore.getState().setLanguage('fr')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('updates the localized category without fetching again when language changes', async () => {
    const getSkills = vi.spyOn(api.skillService, 'getSkills').mockResolvedValue(skills)
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useSkills(), { wrapper })

    await waitFor(() => expect(result.current.data?.[0]?.cat).toBe('Langages'))
    useAppStore.getState().setLanguage('en')
    await waitFor(() => expect(result.current.data?.[0]?.cat).toBe('Languages'))

    expect(getSkills).toHaveBeenCalledOnce()
  })
})

describe('usePersonalProjects', () => {
  beforeEach(() => {
    useAppStore.getState().setLanguage('fr')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('updates localized image alternatives without fetching again', async () => {
    const projects = [
      {
        id: 4,
        name: 'iasit',
        kind: 'Outil de pilotage',
        role: 'Conception',
        desc: 'Description',
        stack: ['react'],
        period: '2026',
        images: [{ src: 'images/projects/iasit/dashboard.webp', alt: 'Tableau de bord Iasit' }],
      },
    ]
    const getPersonalProjects = vi.spyOn(api.personalProjectService, 'getPersonalProjects').mockResolvedValue(projects)
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => usePersonalProjects(), { wrapper })

    await waitFor(() => expect(result.current.data?.[0]?.images?.[0]?.alt).toBe('Tableau de bord Iasit'))
    useAppStore.getState().setLanguage('en')
    await waitFor(() => expect(result.current.data?.[0]?.images?.[0]?.alt).toBe('Iasit dashboard'))

    expect(getPersonalProjects).toHaveBeenCalledOnce()
  })
})

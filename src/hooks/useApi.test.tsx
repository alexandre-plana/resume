import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '../api'
import { useAppStore } from '../store/appStore'
import { useSkills } from './useApi'

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

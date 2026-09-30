import { describe, expect, it } from 'vitest'
import { getAsyncViewState } from './App'

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

import { describe, expect, it } from 'vitest'
import { matchAsyncViewState, type AsyncViewState } from './asyncViewState'

describe('matchAsyncViewState', () => {
  it.each<[AsyncViewState<string>, string]>([
    [{ status: 'loading' }, 'loading'],
    [{ status: 'error', message: 'failed' }, 'failed'],
    [{ status: 'ready', data: 'resume' }, 'resume'],
  ])('handles every state', (state, expected) => {
    expect(
      matchAsyncViewState(state, {
        loading: () => 'loading',
        error: ({ message }) => message,
        ready: ({ data }) => data,
      }),
    ).toBe(expected)
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import { getPopoutAnimation } from './popoutAnimation'

describe('getPopoutAnimation', () => {
  afterEach(() => vi.restoreAllMocks())

  it('uses the fallback when no source element exists', () => {
    expect(getPopoutAnimation(null)).toEqual({ fromX: 0, fromY: 8, fromScale: 0.96 })
  })

  it('derives the translation from the source rectangle and bounds its scale', () => {
    vi.stubGlobal('innerWidth', 1200)
    vi.stubGlobal('innerHeight', 800)
    const source = {
      getBoundingClientRect: () => ({ left: 100, top: 200, width: 20, height: 40 }),
    } as HTMLElement

    expect(getPopoutAnimation(source)).toEqual({ fromX: -490, fromY: -180, fromScale: 0.42 })
  })

  it('caps very wide sources at the maximum scale', () => {
    vi.stubGlobal('innerWidth', 1200)
    vi.stubGlobal('innerHeight', 800)
    const source = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 2000, height: 40 }),
    } as HTMLElement

    expect(getPopoutAnimation(source).fromScale).toBe(0.98)
  })
})

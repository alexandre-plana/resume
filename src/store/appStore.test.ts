import { describe, expect, it } from 'vitest'
import { useAppStore } from './appStore'

describe('appStore', () => {
  it('only exposes navigation and language state', () => {
    const state = useAppStore.getState()
    expect(Object.keys(state).sort()).toEqual([
      'activeTab',
      'language',
      'setActiveTab',
      'setLanguage',
    ])
  })
})

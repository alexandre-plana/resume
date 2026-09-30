import { describe, expect, it } from 'vitest'
import { getTechTagTheme } from './techTagTheme'

describe('getTechTagTheme', () => {
  it('resolves canonical and historical aliases', () => {
    expect(getTechTagTheme('react')).toEqual({
      bg: '#e0f2fe',
      text: '#075985',
      border: '#7dd3fc',
      dot: '#61dafb',
    })
    expect(getTechTagTheme('c#')).toEqual(getTechTagTheme('csharp'))
    expect(getTechTagTheme('three.js')).toEqual(getTechTagTheme('threejs'))
  })

  it('uses the green fallback for unknown keys', () => {
    expect(getTechTagTheme('unknown-tech')).toEqual({
      bg: '#dcfce7',
      text: '#166534',
      border: '#86efac',
      dot: '#86efac',
    })
  })
})

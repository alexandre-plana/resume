import { describe, expect, it } from 'vitest'
import { parsePersonalProjectHash } from './personalProjectHash'

describe('parsePersonalProjectHash', () => {
  it.each([
    ['#personal-project-4', 4],
    ['#personal-project-004', 4],
    ['', null],
    ['#personal-project-[', null],
    ['#personal-project-4-extra', null],
    ['#personal-project-9007199254740992', null],
  ])('parses %s safely', (hash, expected) => {
    expect(parsePersonalProjectHash(hash)).toBe(expected)
  })
})

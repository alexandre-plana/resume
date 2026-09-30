import { describe, expect, it } from 'vitest'
import { tokenizeTechText } from './techTokens'

describe('tokenizeTechText', () => {
  it('keeps punctuation outside tags', () => {
    expect(tokenizeTechText('avec #react, #three.js et #api-rest.')).toEqual([
      { type: 'text', value: 'avec ' },
      { type: 'tag', value: '#react', key: 'react' },
      { type: 'text', value: ', ' },
      { type: 'tag', value: '#three.js', key: 'threejs' },
      { type: 'text', value: ' et ' },
      { type: 'tag', value: '#api-rest', key: 'apirest' },
      { type: 'text', value: '.' },
    ])
  })
})

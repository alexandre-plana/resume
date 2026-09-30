export type TechToken =
  | { type: 'text'; value: string }
  | { type: 'tag'; value: string; key: string }

const TECH_TAG_PATTERN = /#[\p{L}\p{N}][\p{L}\p{N}._-]*/gu

export const normalizeTechTag = (value: string): string =>
  value.slice(1).toLocaleLowerCase('en').replace(/[^a-z0-9]/g, '')

export const tokenizeTechText = (text: string): TechToken[] => {
  const tokens: TechToken[] = []
  let lastIndex = 0

  for (const match of text.matchAll(TECH_TAG_PATTERN)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, index) })
    }

    const value = match[0]
    // A dot is valid inside names such as #three.js, but terminal punctuation
    // belongs to the surrounding prose (for example #api-rest.).
    const tagValue = value.replace(/[._-]+$/u, '')
    tokens.push({ type: 'tag', value: tagValue, key: normalizeTechTag(tagValue) })
    lastIndex = index + tagValue.length
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return tokens
}

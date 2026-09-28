const PERSONAL_PROJECT_HASH = /^#personal-project-(\d+)$/

export const parsePersonalProjectHash = (hash: string): number | null => {
  const match = PERSONAL_PROJECT_HASH.exec(hash)
  if (!match) {
    return null
  }

  const id = Number(match[1])
  return Number.isSafeInteger(id) ? id : null
}

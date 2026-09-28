export interface PopoutAnimation {
  fromX: number
  fromY: number
  fromScale: number
}

export const getPopoutAnimation = (sourceEl: HTMLElement | null): PopoutAnimation => {
  if (!sourceEl) {
    return { fromX: 0, fromY: 8, fromScale: 0.96 }
  }

  const rect = sourceEl.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const sourceCenterX = rect.left + rect.width / 2
  const sourceCenterY = rect.top + rect.height / 2
  const targetModalWidth = Math.max(1, Math.min(840, viewportWidth - 32))
  const fromScale = Math.min(0.98, Math.max(0.42, rect.width / targetModalWidth))

  return {
    fromX: sourceCenterX - viewportWidth / 2,
    fromY: sourceCenterY - viewportHeight / 2,
    fromScale,
  }
}

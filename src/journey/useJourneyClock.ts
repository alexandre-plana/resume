import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

const reducedQuery = '(prefers-reduced-motion: reduce)'
const getReduced = () => window.matchMedia?.(reducedQuery).matches ?? false
const subscribeReduced = (callback: () => void) => {
  const media = window.matchMedia?.(reducedQuery)
  media?.addEventListener('change', callback)
  return () => media?.removeEventListener('change', callback)
}
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const getVisible = () => document.visibilityState !== 'hidden'

export function useJourneyClock(duration: number, ready = true) {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => true)
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, () => true)
  const [time, setTime] = useState(0)
  const [requestedPlaying, setRequestedPlaying] = useState(() => !getReduced())
  const [speed, setSpeed] = useState(1)
  const playing = ready && requestedPlaying && time < duration

  useEffect(() => {
    if (!playing || !visible) return
    let frame = 0
    let previous: number | null = null
    const tick = (timestamp: number) => {
      const delta = previous === null ? 0 : (timestamp - previous) / 1000
      previous = timestamp
      setTime(value => Math.min(duration, value + delta * speed))
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [duration, playing, speed, visible])

  const seek = useCallback((target: number) => {
    setTime(Math.max(0, Math.min(duration, target)))
    setRequestedPlaying(false)
  }, [duration])
  const toggle = useCallback(() => {
    if (time >= duration) {
      setTime(0)
      setRequestedPlaying(true)
    } else setRequestedPlaying(value => !value)
  }, [duration, time])
  const restart = useCallback(() => {
    setTime(0)
    setRequestedPlaying(!getReduced())
  }, [])

  return { time, playing, speed, setSpeed, seek, toggle, restart, reduced }
}

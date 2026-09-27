import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { fetchJson } from './fetchJson'

const schema = z.object({ name: z.string() })

describe('fetchJson', () => {
  afterEach(() => vi.restoreAllMocks())

  it('rejects a successful response with an invalid payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ name: 42 }), { status: 200 }),
    )

    await expect(fetchJson('/profile', schema)).rejects.toThrow('Invalid API response')
  })

  it('preserves the HTTP status in an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 503 }))

    await expect(fetchJson('/profile', schema)).rejects.toThrow('503')
  })

  it('passes the abort signal to fetch', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ name: 'Alex' })))
    const controller = new AbortController()

    await fetchJson('/profile', schema, { signal: controller.signal })

    expect(fetchMock).toHaveBeenCalledWith('/profile', expect.objectContaining({ signal: controller.signal }))
  })

  it('preserves an AbortError from fetch', async () => {
    const abortError = new DOMException('The operation was aborted.', 'AbortError')
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(abortError)

    await expect(fetchJson('/profile', schema)).rejects.toBe(abortError)
  })
})

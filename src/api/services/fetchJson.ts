import type { ZodType } from 'zod'

const isAbortError = (error: unknown): boolean =>
  typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError'

const createErrorWithCause = (message: string, cause: unknown): Error => {
  const error = new Error(message)
  Object.defineProperty(error, 'cause', {
    configurable: true,
    enumerable: false,
    value: cause,
    writable: true,
  })
  return error
}

export const fetchJson = async <T>(
  url: string,
  schema: ZodType<T>,
  init: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  let body: unknown
  try {
    body = await response.json()
  } catch (error) {
    if (isAbortError(error)) {
      throw error
    }
    throw createErrorWithCause('Invalid API response: response body is not valid JSON', error)
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    throw new Error(`Invalid API response: ${parsed.error.issues[0]?.message ?? 'unknown schema error'}`)
  }

  return parsed.data
}

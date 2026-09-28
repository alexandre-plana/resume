export type AsyncViewState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T }

type AsyncViewHandlers<T, R> = {
  [S in AsyncViewState<T>['status']]: (state: Extract<AsyncViewState<T>, { status: S }>) => R
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled async view state: ${String(value)}`)
}

export const matchAsyncViewState = <T, R>(state: AsyncViewState<T>, handlers: AsyncViewHandlers<T, R>): R => {
  switch (state.status) {
    case 'loading':
      return handlers.loading(state)
    case 'error':
      return handlers.error(state)
    case 'ready':
      return handlers.ready(state)
    default:
      return assertNever(state)
  }
}

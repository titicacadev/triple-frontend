import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import { refreshSessionMiddleware } from './refresh-session'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware])

export * from './types'

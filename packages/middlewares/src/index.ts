import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import {
  refreshSessionMiddleware,
  refreshSessionMiddlewareNext13,
} from './refresh-session'
import { setWebDeviceIdMiddleware } from './set-web-device-id'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware, setWebDeviceIdMiddleware])
export const constructMiddlewareNext13 = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddlewareNext13])

export * from './types'
export { chain } from './chain'
export {
  refreshSessionMiddleware,
  refreshSessionMiddlewareNext13,
} from './refresh-session'
export { setWebDeviceIdMiddleware } from './set-web-device-id'

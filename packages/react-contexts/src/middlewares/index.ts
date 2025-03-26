import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import { setWebDeviceIdMiddleware } from './set-web-device-id'
import { serverRefreshSessionMiddleware } from './session/server'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([
    ...functions,
    serverRefreshSessionMiddleware,
    setWebDeviceIdMiddleware,
  ])

export * from './types'
export { chain } from './chain'
export { serverRefreshSessionMiddleware } from './session/server'
export { setWebDeviceIdMiddleware } from './set-web-device-id'
export { applySetCookie } from './utils/apply-set-cookie'

import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import { serverRefreshSessionMiddleware } from './session'
import { setWebDeviceIdMiddleware } from './set-web-device-id'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([
    ...functions,
    serverRefreshSessionMiddleware,
    setWebDeviceIdMiddleware,
  ])

export * from './types'
export { chain } from './chain'
export {
  serverRefreshSessionMiddleware,
  clientRefreshSessionMiddleware,
} from './session'
export { setWebDeviceIdMiddleware } from './set-web-device-id'
export { applySetCookie } from './utils/apply-set-cookie'

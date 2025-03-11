import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import { refreshSessionMiddleware } from './refresh-session'
import { setWebDeviceIdMiddleware } from './set-web-device-id'

export { oldIosCookiesMiddleware } from './old-ios-cookie'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware, setWebDeviceIdMiddleware])

export * from './types'

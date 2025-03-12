import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import { refreshSessionMiddleware } from './refresh-session'
import { setWebDeviceIdMiddleware } from './set-web-device-id'

export { oldTripleIosCookiesMiddleware } from './old-triple-ios-cookie'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware, setWebDeviceIdMiddleware])

export * from './types'

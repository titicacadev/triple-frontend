import { chain, MiddlewareFactory } from './chain'
import { refreshSessionMiddleware } from './refresh-session'

export { oldTripleIosCookiesMiddleware } from './old-triple-ios-cookie'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware])

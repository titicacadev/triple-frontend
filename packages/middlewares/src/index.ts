import { chain, MiddlewareFactory } from './chain'
import { refreshSessionMiddleware } from './refresh-session'

export { oldIosCookiesMiddleware } from './old-ios-cookie'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware])

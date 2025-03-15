import { chain, MiddlewareFactory } from './chain'
import { refreshSessionMiddleware } from './refresh-session'

export { chain } from './chain'
export { oldIosCookiesMiddleware } from './old-ios-cookie'
export { refreshSessionMiddleware } from './refresh-session'
export { NEED_LOGIN_IDENTIFIER, X_AUTH_STATUS } from './constants'

export const middlewareWithSessionRefresh = (functions: MiddlewareFactory[]) =>
  chain([refreshSessionMiddleware, ...functions])

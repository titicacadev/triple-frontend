import { chain } from './chain'
import type { MiddlewareFactory } from './types'
import { refreshSessionMiddleware } from './refresh-session'
import { setWebDeviceIdMiddleware } from './set-web-device-id'

export {
  TP_SE,
  TP_TK,
  X_TRIPLE_WEB_DEVICE_ID,
  SESSION_KEY as X_SOTO_SESSION,
} from '@titicaca/constants'

export const constructMiddleware = (functions: MiddlewareFactory[]) =>
  chain([...functions, refreshSessionMiddleware, setWebDeviceIdMiddleware])

export * from './types'

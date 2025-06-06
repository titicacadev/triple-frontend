import type { IncomingMessage } from 'http'

import Cookies from 'universal-cookie'
import { SESSION_KEY, TP_TK } from '@titicaca/constants'

export function checkSession(req: IncomingMessage) {
  const cookies = new Cookies(req.headers.cookie)

  return !!cookies.get(TP_TK) || !!cookies.get(SESSION_KEY)
}

import { IncomingMessage } from 'http'

import Cookies from 'universal-cookie'
import { SESSION_KEY, TP_TK } from '@titicaca/constants'

export default function getSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
) {
  return (
    !!new Cookies(req?.headers.cookie).get(TP_TK) ||
    !!new Cookies(req?.headers.cookie).get(SESSION_KEY)
  )
}

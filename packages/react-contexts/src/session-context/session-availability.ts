import { IncomingMessage } from 'http'

import Cookies from 'universal-cookie'
import { TP_TK } from '@titicaca/constants'

export default function getSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
) {
  return !!new Cookies(req?.headers.cookie).get(TP_TK)
}

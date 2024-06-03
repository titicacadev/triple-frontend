import 'server-only'

import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'
import type { UserAgentValue } from '@titicaca/triple-web'
import { isMobile } from '@titicaca/triple-web-utils'

export function getUserAgent(): UserAgentValue {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')
  const parser = new UAParser(userAgent ?? undefined)
  const result = parser.getResult()

  return {
    ...result,
    isMobile: isMobile(result),
  }
}

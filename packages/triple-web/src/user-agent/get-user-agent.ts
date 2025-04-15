import { isMobile } from '@titicaca/triple-web-utils'
import UAParser from 'ua-parser-js'

import { UserAgentValue } from './types'

export function getUserAgent(userAgent?: string): UserAgentValue {
  const parser = new UAParser(userAgent ?? undefined)
  const result = parser.getResult()

  return {
    ...result,
    isMobile: isMobile(result),
  }
}

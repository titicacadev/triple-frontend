import type { UserAgentValue } from '@titicaca/triple-web'
import { isMobile } from '@titicaca/triple-web-utils'
import { UAParser } from 'ua-parser-js'

interface Params {
  userAgent: string | undefined
}

export function extractUserAgent({ userAgent }: Params): UserAgentValue {
  const parser = new UAParser(userAgent ?? undefined)
  const result = parser.getResult()

  return {
    ...result,
    isMobile: isMobile(result),
  }
}

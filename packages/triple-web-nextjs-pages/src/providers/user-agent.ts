import type { NextPageContext } from 'next'
import type { UserAgentValue } from '@titicaca/triple-web'
import { UAParser } from 'ua-parser-js'
import { isMobile } from '@titicaca/triple-web-utils'

export function getUserAgent(ctx: NextPageContext): UserAgentValue {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent
  const parser = new UAParser(userAgent ?? undefined)
  const result = parser.getResult()

  return {
    ...result,
    isMobile: isMobile(result),
  }
}

import { NextPageContext } from 'next'
import { UserAgentValue } from '@titicaca/triple-web/user-agent'
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

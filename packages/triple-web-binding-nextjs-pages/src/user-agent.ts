import { NextPageContext } from 'next'
import { UserAgentValue } from '@titicaca/triple-web'
import { UAParser } from 'ua-parser-js'
import { isMobile } from '@titicaca/triple-web-utils'

export function getUserAgent(ctx: NextPageContext): UserAgentValue {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent
  const parser = new UAParser(userAgent)

  return {
    ...parser.getResult(),
    isMobile: isMobile(userAgent),
  }
}

import { NextPageContext } from 'next'
import { UserAgent } from '@titicaca/triple-web'
import { UAParser } from 'ua-parser-js'

export function getUserAgent(ctx: NextPageContext): UserAgent {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent
  const parser = new UAParser(userAgent)

  return {
    ...parser.getResult(),
  }
}

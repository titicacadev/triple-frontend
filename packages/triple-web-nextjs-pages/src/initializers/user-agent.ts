import type { NextPageContext } from 'next'
import type { UserAgentValue } from '@titicaca/triple-web'

import { extractUserAgent } from '../helpers/user-agent'

export function getUserAgent(ctx: NextPageContext): UserAgentValue {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent']
    : window.navigator.userAgent

  return extractUserAgent({ userAgent })
}

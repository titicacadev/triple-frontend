import type { GetServerSidePropsContext } from 'next'
import type { UserAgentValue } from '@titicaca/triple-web'

import { extractUserAgent } from '../helpers/user-agent'

export function getUserAgent(ctx: GetServerSidePropsContext): UserAgentValue {
  const userAgent = ctx.req
    ? (ctx.req.headers['user-agent'] ?? '')
    : window.navigator.userAgent

  return extractUserAgent({ userAgent })
}

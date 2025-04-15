import type { GetServerSidePropsContext } from 'next'
import type { UserAgentValue } from '@titicaca/triple-web'
import { getUserAgent as extractUserAgent } from '@titicaca/triple-web'

export function getUserAgent(ctx: GetServerSidePropsContext): UserAgentValue {
  const userAgent = ctx.req
    ? (ctx.req.headers['user-agent'] ?? '')
    : window.navigator.userAgent

  return extractUserAgent(userAgent)
}

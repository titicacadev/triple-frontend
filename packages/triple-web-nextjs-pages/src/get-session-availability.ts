import { checkClientApp } from '@titicaca/triple-web-utils'
import { GetServerSidePropsContext } from 'next'

import { checkClientAppSession, checkWebSession } from './helpers'

export function getSessionAvailability(
  ctx: GetServerSidePropsContext,
): boolean {
  const isClientApp = checkClientApp(ctx.req.headers['user-agent'] ?? '')

  return isClientApp ? checkClientAppSession(ctx.req) : checkWebSession(ctx.req)
}

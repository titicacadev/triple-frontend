import type { GetServerSidePropsContext } from 'next'
import type { ClientAppValue } from '@titicaca/triple-web'

import { extractClientApp } from '../helpers/client-app'

export function getClientApp(ctx: GetServerSidePropsContext): ClientAppValue {
  const userAgent = ctx.req.headers['user-agent']

  const autoplay = ctx.req?.headers['x-triple-autoplay']
  const networkType = ctx.req?.headers['x-triple-network-type']

  return extractClientApp({ autoplay, networkType, userAgent })
}

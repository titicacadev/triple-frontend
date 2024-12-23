import type { NextPageContext } from 'next'
import { type ClientAppValue } from '@titicaca/triple-web'

import { extractClientApp } from '../helpers/client-app'

export function getClientApp(ctx: NextPageContext): ClientAppValue {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent']
    : window.navigator.userAgent

  const autoplay = ctx.req?.headers['x-triple-autoplay']
  const networkType = ctx.req?.headers['x-triple-network-type']

  return extractClientApp({ autoplay, networkType, userAgent })
}

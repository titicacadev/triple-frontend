import { NextPageContext } from 'next'
import type { ClientAppValue } from '@titicaca/triple-web'
import { parseClientAppMetadata } from '@titicaca/triple-web-utils'

export function getClientApp(ctx: NextPageContext): ClientAppValue {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent
  const metadata = parseClientAppMetadata(userAgent)

  if (!metadata) {
    return null
  }

  const autoplay =
    (ctx.req?.headers['x-triple-autoplay'] as
      | NonNullable<ClientAppValue>['device']['autoplay']
      | undefined) ?? 'always'
  const networkType =
    (ctx.req?.headers['x-triple-network-type'] as
      | NonNullable<ClientAppValue>['device']['networkType']
      | undefined) ?? 'unknown'

  return {
    metadata,
    device: {
      autoplay,
      networkType,
    },
  }
}

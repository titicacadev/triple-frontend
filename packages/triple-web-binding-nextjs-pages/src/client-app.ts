import { NextPageContext } from 'next'
import { ClientApp, parseClientAppMetadata } from '@titicaca/triple-web'

export function getClientApp(ctx: NextPageContext): ClientApp {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent
  const metadata = parseClientAppMetadata(userAgent)

  if (!metadata) {
    return null
  }

  const autoplay =
    (ctx.req?.headers['x-triple-autoplay'] as
      | NonNullable<ClientApp>['device']['autoplay']
      | undefined) ?? 'always'
  const networkType =
    (ctx.req?.headers['x-triple-network-type'] as
      | NonNullable<ClientApp>['device']['networkType']
      | undefined) ?? 'unknown'

  return {
    metadata,
    device: {
      autoplay,
      networkType,
    },
  }
}

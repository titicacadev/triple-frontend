import { NextPageContext } from 'next'
import { ClientAppName, ClientAppValue } from '@titicaca/triple-web'
import { clientAppRegex } from '@titicaca/triple-web-utils'

export function getClientApp(ctx: NextPageContext): ClientAppValue {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent
  const metadata = clientAppRegex.exec(userAgent)

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
    metadata: {
      name: (metadata[1] as keyof typeof ClientAppName)
        ? ClientAppName.Android
        : ClientAppName.iOS,
      version: metadata[2],
    },
    device: {
      autoplay,
      networkType,
    },
  }
}

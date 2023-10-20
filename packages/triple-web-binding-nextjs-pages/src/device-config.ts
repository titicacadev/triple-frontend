import { NextPageContext } from 'next'
import { DeviceConfig, deviceConfigDefaultValue } from '@titicaca/triple-web'

export function getDeviceConfig(ctx: NextPageContext): DeviceConfig {
  const autoplay: DeviceConfig['autoplay'] | undefined = ctx.req?.headers[
    'x-triple-autoplay'
  ] as DeviceConfig['autoplay'] | undefined
  const networkType = ctx.req?.headers['x-triple-network-type'] as
    | DeviceConfig['networkType']
    | undefined

  return {
    autoplay: autoplay ?? deviceConfigDefaultValue.autoplay,
    networkType: networkType ?? deviceConfigDefaultValue.networkType,
  }
}

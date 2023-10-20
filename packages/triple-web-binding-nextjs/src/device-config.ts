import 'server-only'

import { headers } from 'next/headers'
import { DeviceConfig, deviceConfigDefaultValue } from '@titicaca/triple-web'

export function getDeviceConfig(): DeviceConfig {
  const headersList = headers()

  const autoplay = headersList.get('x-triple-autoplay') as
    | DeviceConfig['autoplay']
    | null
  const networkType = headersList.get('x-triple-network-type') as
    | DeviceConfig['networkType']
    | null

  return {
    autoplay: autoplay ?? deviceConfigDefaultValue.autoplay,
    networkType: networkType ?? deviceConfigDefaultValue.networkType,
  }
}

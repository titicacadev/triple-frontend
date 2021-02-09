import { IncomingHttpHeaders } from 'http'

import { strictQuery } from '@titicaca/view-utilities'

export interface DeviceState {
  autoplay: 'always' | 'wifi_only' | 'never'
  networkType: 'wifi' | 'cellular' | 'unknown'
}

/**
 * request headers에서 디바이스의 상태 값을 가져옵니다.
 * @param headers
 */
export function getDeviceState(
  headers: IncomingHttpHeaders | undefined,
): DeviceState {
  if (!headers) {
    return {
      autoplay: 'never',
      networkType: 'unknown',
    }
  }

  const {
    'x-triple-autoplay': autoplay,
    'x-triple-network-type': networkType,
  } = strictQuery(headers)
    .string<'x-triple-autoplay', DeviceState['autoplay']>('x-triple-autoplay')
    .string<'x-triple-network-type', DeviceState['networkType']>(
      'x-triple-network-type',
    )
    .use()

  return {
    autoplay: autoplay || 'never',
    networkType: networkType || 'unknown',
  }
}

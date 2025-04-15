import { getClientApp, type ClientAppValue } from '@titicaca/triple-web'

type AutoplayOption = NonNullable<ClientAppValue>['device']['autoplay']

function isValidAutoplayOption(value: string): value is AutoplayOption {
  const validOptions: AutoplayOption[] = ['always', 'wifi_only', 'never']
  return validOptions.includes(value as AutoplayOption)
}

function getAutoplayValue(value: string): AutoplayOption {
  if (isValidAutoplayOption(value)) {
    return value
  } else {
    return 'always'
  }
}

type NetworkTypeOption = NonNullable<ClientAppValue>['device']['networkType']

function isValidNetworkTypeOption(value: string): value is NetworkTypeOption {
  const validOptions: NetworkTypeOption[] = ['wifi', 'cellular', 'unknown']
  return validOptions.includes(value as NetworkTypeOption)
}

function getNetwork(value: string): NetworkTypeOption {
  if (isValidNetworkTypeOption(value)) {
    return value
  } else {
    return 'unknown'
  }
}

interface Params {
  userAgent: string | undefined
  autoplay: string | string[] | undefined
  networkType: string | string[] | undefined
}

export function extractClientApp({
  userAgent,
  autoplay: _autoplay,
  networkType: _networkType,
}: Params): ClientAppValue {
  const autoplay = getAutoplayValue(
    Array.isArray(_autoplay) ? _autoplay[0] : (_autoplay ?? ''),
  )

  const networkType = getNetwork(
    Array.isArray(_networkType) ? _networkType[0] : (_networkType ?? ''),
  )

  return getClientApp({ userAgent, autoplay, networkType })
}

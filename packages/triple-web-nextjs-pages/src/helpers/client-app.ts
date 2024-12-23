import { ClientAppName, type ClientAppValue } from '@titicaca/triple-web'
import { clientAppRegex, macAppRegex } from '@titicaca/triple-web-utils'

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
  autoplay,
  networkType,
}: Params): ClientAppValue {
  const metadata = userAgent ? clientAppRegex.exec(userAgent) : null

  if (!metadata) {
    return null
  }

  return {
    metadata: {
      name:
        metadata[1] === 'Triple-Android'
          ? ClientAppName.Android
          : ClientAppName.iOS,
      version: metadata[2],
      isMacApp: userAgent ? macAppRegex.test(userAgent) : false,
    },
    device: {
      autoplay: getAutoplayValue(
        Array.isArray(autoplay) ? autoplay[0] : (autoplay ?? ''),
      ),
      networkType: getNetwork(
        Array.isArray(networkType) ? networkType[0] : (networkType ?? ''),
      ),
    },
  }
}

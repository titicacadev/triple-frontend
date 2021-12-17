import * as semver from 'semver'
import { AppName } from '@titicaca/view-utilities'

import { useClientContext } from './client-context'

type Operator = 'lt' | 'lte' | 'gt' | 'gte'

const VERSION_OPERATIONS: Record<Operator, Function> = {
  lt: semver.lt,
  lte: semver.lte,
  gt: semver.gt,
  gte: semver.gte,
}

export function useClientFeatureFlag({
  operator,
  version,
  availableOnPublic,
  appName,
}: {
  operator: Operator
  version: string
  availableOnPublic: boolean
  appName?: AppName
}) {
  const clientContext = useClientContext()

  if (!clientContext) {
    return availableOnPublic
  } else {
    const appVersion = semver.coerce(clientContext.appVersion)
    const operation = VERSION_OPERATIONS[operator]
    const hasMatchingOs =
      appName !== undefined ? clientContext.appName === appName : true

    return Boolean(
      appVersion && operation(appVersion, version) && hasMatchingOs,
    )
  }
}

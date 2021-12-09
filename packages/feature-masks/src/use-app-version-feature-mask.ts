import { useUserAgentContext } from '@titicaca/react-contexts'
import semver from 'semver'

type Operator = 'lt' | 'lte' | 'gt' | 'gte'

const VERSION_OPERATIONS: Record<Operator, Function> = {
  lt: semver.lt,
  lte: semver.lte,
  gt: semver.gt,
  gte: semver.gte,
}

export function useAppVersionFeatureMask({
  operator,
  version,
  availableOnPublic,
}: {
  operator: Operator
  version: string
  availableOnPublic: boolean
}) {
  const { isPublic, app } = useUserAgentContext()

  if (isPublic) {
    return availableOnPublic
  } else {
    const appVersion = semver.coerce(app?.version)
    const operation = VERSION_OPERATIONS[operator]

    return Boolean(appVersion && operation(appVersion, version))
  }
}

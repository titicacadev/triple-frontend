import * as semver from 'semver'

import { useClientApp } from './use-client-app'

type Operator = 'lt' | 'lte' | 'gt' | 'gte'

const VERSION_OPERATIONS: Record<
  Operator,
  typeof semver.lt | typeof semver.lte | typeof semver.gt | typeof semver.gte
> = {
  lt: semver.lt,
  lte: semver.lte,
  gt: semver.gt,
  gte: semver.gte,
}

export interface UseFeatureFlagParams {
  /**
   * 버전 비교에 사용할 operator를 결정합니다. 아래 4개 operator가 지원됩니다.
   *
   *   - 'gt'
   *   - 'gte'
   *   - 'lt'
   *   - 'lte'
   */
  operator: Operator
  /**
   * 비교의 기준이 될 버전입니다.
   */
  appVersion: string
  /**
   * 트리플 클라이언트 사용 중이 아닐 경우(= 외부 브라우저일 경우) 노출 여부를
   * 결정합니다.
   */
  availableOnPublic: boolean
  /**
   * 특정 플랫폼의 트리플 클라이언트에서만 노출이 필요할 경우 설정합니다.
   */
  appName?: 'Triple-iOS' | 'Triple-Android'
}

export function useFeatureFlag({
  operator,
  appVersion,
  availableOnPublic,
  appName,
}: UseFeatureFlagParams) {
  const clientApp = useClientApp()

  if (!clientApp) {
    return availableOnPublic
  }

  const tripleClientAppVersion = semver.coerce(clientApp.metadata.version)
  const operation = VERSION_OPERATIONS[operator]
  const hasMatchingOs =
    appName !== undefined ? clientApp.metadata.version === appName : true

  return Boolean(
    tripleClientAppVersion &&
      operation(tripleClientAppVersion, appVersion) &&
      hasMatchingOs,
  )
}

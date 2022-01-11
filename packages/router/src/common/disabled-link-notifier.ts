import { useLoginCtaModal } from '@titicaca/modals'
import {
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'

import { useOnClientRequired } from './on-client-required'

export type AllowSource = 'all' | 'app' | 'app-with-session' | 'none'

export interface AllowSourceProps {
  /**
   * 링크가 작동하는 환경을 설정합니다.
   * `all`, `app`, `app-with-session`, `none` 네 가지를 사용할 수 있습니다.
   * 기본 값은 `all`.
   */
  allowSource?: AllowSource
}

export function useDisabledLinkNotifierCreator({
  alert = defaultAlert,
}: {
  alert?: (message: string) => void
} = {}) {
  const { isPublic } = useUserAgentContext()
  const sessionAvailable = useSessionAvailability()
  const { show: showLoginCtaModal } = useLoginCtaModal()
  const onClientRequired = useOnClientRequired()

  const createDisabledLinkNotifier = ({
    allowSource = 'all',
  }: AllowSourceProps) => {
    if (allowSource === 'none') {
      return () => {
        alert('접근할 수 없는 링크입니다.')
      }
    }

    if (
      isPublic === true &&
      (allowSource === 'app' || allowSource === 'app-with-session')
    ) {
      return onClientRequired
    }

    if (sessionAvailable === false && allowSource === 'app-with-session') {
      return showLoginCtaModal
    }
  }

  return createDisabledLinkNotifier
}

function defaultAlert(message: string) {
  if (typeof window !== 'undefined') {
    window.alert(message)
  }
}

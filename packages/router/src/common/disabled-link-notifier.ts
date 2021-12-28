import {
  useTransitionModal,
  useLoginCTAModal,
  TransitionType,
} from '@titicaca/modals'
import {
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'

export type AllowSource = 'all' | 'app' | 'app-with-session' | 'none'

export interface AllowSourceProps {
  /**
   * 링크가 작동하는 환경을 설정합니다.
   * `all`, `app`, `app-with-session`, `none` 네 가지를 사용할 수 있습니다.
   * 기본 값은 `all`.
   */
  allowSource?: AllowSource
}

export function useDisabledLinkNotifierCreator() {
  const { isPublic } = useUserAgentContext()
  const sessionAvailable = useSessionAvailability()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCtaModal } = useLoginCTAModal()

  const createDisabledLinkNotifier = ({
    allowSource = 'all',
  }: AllowSourceProps) => {
    if (allowSource === 'none') {
      return () => {
        window.alert('접근할 수 없는 링크입니다.')
      }
    }

    if (
      isPublic === true &&
      (allowSource === 'app' || allowSource === 'app-with-session')
    ) {
      return () => {
        showTransitionModal(TransitionType.General)
      }
    }

    if (sessionAvailable === false && allowSource === 'app-with-session') {
      return showLoginCtaModal
    }
  }

  return createDisabledLinkNotifier
}

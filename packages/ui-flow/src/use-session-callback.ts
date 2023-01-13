import { useCallback } from 'react'
import { useLoginCtaModal } from '@titicaca/modals'
import {
  useSessionAvailability,
  useSessionControllers,
} from '@titicaca/react-contexts'

/**
 * sessionId가 있는 환경에서만 주어진 콜백을 실행하는 함수를 반환하는 훅
 * sessionId가 없으면 로그인 유도 모달을 띄웁니다.
 * @param fn
 * @param returnValue sessionId가 없을 때 리턴할 값
 * @param returnUrl 로그인 완료 후 복귀할 페이지 주소
 * @param triggeredEventAction 로그인 유도 모달 팝업을 발생시킨 이벤트 액션
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSessionCallback<T extends (...args: any[]) => any>(
  fn: T,
  ...options:
    | [boolean | undefined, string]
    | [boolean]
    | [
        {
          returnUrl?: string
          returnValue?: boolean
          skipTransitionModal?: boolean
          triggeredEventAction?: string
        },
      ]
    | []
): (...args: Parameters<T>) => ReturnType<T> | boolean | void {
  const sessionAvailable = useSessionAvailability()
  const { login } = useSessionControllers()
  const { show } = useLoginCtaModal()

  return useCallback(
    (...args) => {
      if (sessionAvailable === false) {
        if (typeof options[0] === 'object') {
          const {
            returnUrl,
            returnValue,
            skipTransitionModal,
            triggeredEventAction,
          } = options[0]

          if (skipTransitionModal) {
            login({ returnUrl })
          } else {
            show(returnUrl, triggeredEventAction)
          }

          return returnValue
        } else {
          const [returnValue, returnUrl] = options

          show(returnUrl)

          return returnValue
        }
      }
      return fn(...args)
    },
    [fn, login, options, sessionAvailable, show],
  )
}

import { useCallback } from 'react'
import { useSessionContext } from '@titicaca/react-contexts'
import { useLoginCTAModal } from '@titicaca/modals'

/**
 * sessionId가 있는 환경에서만 주어진 콜백을 실행하는 함수를 반환하는 훅
 * sessionId가 없으면 로그인 유도 모달을 띄웁니다.
 * @param fn
 * @param returnValue sessionId가 없을 때 리턴할 값
 * @param returnUrl 로그인 완료 후 복귀할 페이지 주소
 */
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
        },
      ]
    | []
): (...args: Parameters<T>) => ReturnType<T> | boolean | void {
  const { hasWebSession, hasSessionId, login } = useSessionContext()
  const { show } = useLoginCTAModal()

  const isLoggedIn = hasWebSession || hasSessionId

  return useCallback(
    (...args) => {
      if (!isLoggedIn) {
        if (typeof options[0] === 'object') {
          const { returnUrl, returnValue, skipTransitionModal } = options[0]

          if (skipTransitionModal) {
            login({ returnUrl })
          } else {
            show(returnUrl)
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
    [fn, show, login, options, isLoggedIn],
  )
}

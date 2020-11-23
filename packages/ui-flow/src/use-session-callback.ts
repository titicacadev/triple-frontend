import { useCallback } from 'react'
import { useSessionContext } from '@titicaca/react-contexts'
import { useLoginCTAModal } from '@titicaca/modals'

/**
 * sessionId가 있는 환경에서만 주어진 콜백을 실행하는 함수를 반환하는 훅
 * sessionId가 없으면 로그인 유도 모달을 띄웁니다.
 * @param fn
 * @param returnValue sessionId가 없을 때 리턴할 값
 */
export function useSessionCallback<
  T extends (...args: any[]) => any,
  S = unknown
>(
  fn: T,
  returnValue?: S,
): (...args: Parameters<T>) => ReturnType<T> | S | void {
  const { hasSessionId } = useSessionContext()
  const { show } = useLoginCTAModal()

  return useCallback(
    (...args) => {
      if (!hasSessionId) {
        show()
        return returnValue
      }
      return fn(...args)
    },
    [fn, hasSessionId, show, returnValue],
  )
}

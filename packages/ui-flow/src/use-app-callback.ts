import { useCallback } from 'react'
import { TransitionType, useTransitionModal } from '@titicaca/modals'
import { useUserAgentContext } from '@titicaca/react-contexts'

/**
 * User Agent가 앱 환경일 때만 주어진 콜백을 실행하는 함수를 반환하는 훅
 * 앱이 아닐 때는 transition 모달을 띄웁니다.
 *
 * Usage
 *
 * const invokeNativeFn= useAppCallback(TransitionType.Some, () => {})
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAppCallback<T extends (...args: any[]) => any>(
  transitionType: TransitionType,
  fn: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returnValue?: any,
): (...args: Parameters<T>) => ReturnType<T> | void {
  const { isPublic } = useUserAgentContext()
  const { show } = useTransitionModal()

  return useCallback(
    (...args) => {
      if (!isPublic) {
        return fn(...args)
      }

      show(transitionType)

      return returnValue
    },
    [fn, isPublic, show, transitionType, returnValue],
  )
}

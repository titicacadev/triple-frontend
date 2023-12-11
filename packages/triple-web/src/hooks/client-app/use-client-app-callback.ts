/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'

import { useTransitionModal } from '../modal'
import { TransitionType } from '../../constants'

import { useClientApp } from './use-client-app'

/**
 * User Agent가 앱 환경일 때만 주어진 콜백을 실행하는 함수를 반환하는 훅
 * 앱이 아닐 때는 transition 모달을 띄웁니다.
 *
 * Usage
 *
 * const invokeNativeFn= useAppCallback(TransitionType.Some, () => {})
 */
export function useClientAppCallback<T extends (...args: any[]) => any, V>(
  transitionType: TransitionType,
  fn: T,
  returnValue?: V,
): (...args: Parameters<T>) => ReturnType<T> {
  const clientApp = useClientApp()
  const { show } = useTransitionModal()

  return useCallback(
    (...args) => {
      if (clientApp) {
        return fn(...args)
      }

      show(transitionType)

      return returnValue
    },
    [clientApp, show, transitionType, returnValue, fn],
  )
}

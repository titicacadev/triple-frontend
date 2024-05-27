/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'

import { useAppInstallCtaModal } from '../modal/use-app-install-cta-modal'
import { AppInstallCtaModalRef } from '../modal/types'

import { useClientApp } from './use-client-app'

/**
 * User Agent가 앱 환경일 때만 주어진 콜백을 실행하는 함수를 반환하는 훅
 * 앱이 아닐 때는 AppInstallCta 모달을 띄웁니다.
 *
 * Usage
 *
 * const invokeNativeFn= useClientAppCallback(appInstallCtaModalRef, () => {})
 */
export function useClientAppCallback<T extends (...args: any[]) => any, V>(
  appInstallCtaModalOptions: AppInstallCtaModalRef = {},
  fn: T,
  returnValue?: V,
): (...args: Parameters<T>) => ReturnType<T> {
  const clientApp = useClientApp()
  const { show } = useAppInstallCtaModal()

  return useCallback(
    (...args) => {
      if (clientApp) {
        return fn(...args)
      }

      show(appInstallCtaModalOptions)

      return returnValue
    },
    [clientApp, show, appInstallCtaModalOptions, returnValue, fn],
  )
}

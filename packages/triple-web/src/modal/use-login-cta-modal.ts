import { useCallback, useContext, useEffect } from 'react'

import { useHashRouter } from '../hash-router'
import { EventTrackingContext } from '../event-tracking/context'

import { LOGIN_CTA_MODAL_HASH } from './constants'
import { useModal } from './context'
import type { LoginCtaModalRef } from './types'

type ShowOptions = LoginCtaModalRef

/**
 * 로그인 유도 modal을 관리합니다.
 */
export function useLoginCtaModal() {
  const { loginCtaModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useContext(EventTrackingContext)
  const { addUriHash, removeUriHash } = useHashRouter()

  const show = useCallback(
    (options?: ShowOptions) => {
      addUriHash(LOGIN_CTA_MODAL_HASH)

      if (options) {
        loginCtaModalRef.current = options
      }
    },
    [addUriHash, loginCtaModalRef],
  )

  const close = useCallback(() => {
    removeUriHash()

    loginCtaModalRef.current = {}
  }, [loginCtaModalRef, removeUriHash])

  useEffect(() => {
    const previous = eventTrackingContextForkRef.current
    eventTrackingContextForkRef.current = eventTrackingContext

    return () => {
      eventTrackingContextForkRef.current = previous
    }
  }, [eventTrackingContext, eventTrackingContextForkRef])

  return {
    show,
    close,
  }
}

import { useCallback, useEffect } from 'react'

import { useEventTracking, useModal } from '../../contexts'
import { LoginCtaModalRef } from '../../types'

type ShowOptions = LoginCtaModalRef

export function useLoginCtaModal() {
  const { loginCtaModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useEventTracking()

  const show = useCallback(
    (options?: ShowOptions) => {
      // TODO: push login cta hash

      if (options) {
        loginCtaModalRef.current = options
      }
    },
    [loginCtaModalRef],
  )

  const close = useCallback(() => {
    // TODO: pop login cta hash

    loginCtaModalRef.current = {}
  }, [loginCtaModalRef])

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

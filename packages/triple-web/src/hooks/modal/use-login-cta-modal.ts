import { useCallback, useEffect } from 'react'

import { useEventTracking, useModal } from '../../contexts'
import { LoginCtaModalRef } from '../../types'

type OpenOptions = LoginCtaModalRef

export function useLoginCtaModal() {
  const { loginCtaModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useEventTracking()

  const open = useCallback(
    (options?: OpenOptions) => {
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
    open,
    close,
  }
}
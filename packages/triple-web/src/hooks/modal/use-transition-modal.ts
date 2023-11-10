import { useCallback, useEffect } from 'react'

import { useEventTracking, useModal } from '../../contexts'
import { TransitionModalRef } from '../../types'

type OpenOptions = TransitionModalRef

export function useTransitionModal() {
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useEventTracking()

  const open = useCallback(
    (options?: OpenOptions) => {
      // TODO: push transition hash

      if (options) {
        transitionModalRef.current = options
      }
    },
    [transitionModalRef],
  )

  const close = useCallback(() => {
    // TODO: pop transition hash

    transitionModalRef.current = {}
  }, [transitionModalRef])

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

import { useCallback, useEffect } from 'react'

import { useEventTracking, useModal } from '../../contexts'
import { TransitionModalRef } from '../../types'

type ShowOptions = TransitionModalRef

export function useTransitionModal() {
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useEventTracking()

  const show = useCallback(
    (options?: ShowOptions) => {
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
    show,
    close,
  }
}

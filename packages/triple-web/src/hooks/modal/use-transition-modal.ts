import { useCallback, useEffect } from 'react'

import { EventTracking, TransitionModalRef } from '../../contexts'

import { useModal } from './use-modal'

type OpenOptions = TransitionModalRef

export function useTransitionModal(eventTrackingContext: EventTracking) {
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()

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

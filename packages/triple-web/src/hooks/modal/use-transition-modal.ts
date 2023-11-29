import { useCallback, useEffect } from 'react'

import { TransitionType } from '../../constants'
import { useEventTracking, useModal } from '../../contexts'
import { TransitionModalRef } from '../../types'
import { useHashRouter } from '../hash-router'

type ShowOptions = TransitionModalRef

export function useTransitionModal() {
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useEventTracking()
  const { addUriHash, removeUriHash } = useHashRouter()

  const show = useCallback(
    (transitionType: TransitionType, options?: ShowOptions) => {
      addUriHash(transitionType)

      if (options) {
        transitionModalRef.current = options
      }
    },
    [addUriHash, transitionModalRef],
  )

  const close = useCallback(() => {
    removeUriHash()

    transitionModalRef.current = {}
  }, [removeUriHash, transitionModalRef])

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

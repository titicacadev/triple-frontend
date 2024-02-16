import { useCallback, useContext, useEffect } from 'react'

import { useHashRouter } from '../hash-router/use-hash-router'
import { EventTrackingContext } from '../event-tracking/context'

import { TransitionType } from './constants'
import { useModal } from './context'
import type { TransitionModalRef } from './types'

type ShowOptions = TransitionModalRef

export function useTransitionModal() {
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useContext(EventTrackingContext)
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

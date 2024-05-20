import { useCallback, useContext, useEffect } from 'react'

import { useHashRouter } from '../hash-router/use-hash-router'
import { EventTrackingContext } from '../event-tracking/context'

import { TransitionType } from './constants'
import { useModal } from './context'
import type { TransitionModalRef } from './types'

type ShowOptions = TransitionModalRef

/**
 * 앱 설치 유도 modal을 관리합니다.
 */
export function useTransitionModal() {
  const { transitionModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useContext(EventTrackingContext)
  const { addUriHash, removeUriHash } = useHashRouter()

  const show = useCallback(
    (transitionType: TransitionType, options?: ShowOptions) => {
      addUriHash(`transition.${transitionType}`)

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

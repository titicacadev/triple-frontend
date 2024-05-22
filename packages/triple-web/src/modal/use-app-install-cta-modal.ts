import { useCallback, useContext, useEffect } from 'react'

import { useHashRouter } from '../hash-router/use-hash-router'
import { EventTrackingContext } from '../event-tracking/context'

import { useModal } from './context'
import type { AppInstallCtaModalRef } from './types'
import { APP_INSTALL_CTA_MODAL_HASH } from './constants'

type ShowOptions = AppInstallCtaModalRef

export function useAppInstallCtaModal() {
  const { appInstallCtaModalRef, eventTrackingContextForkRef } = useModal()
  const eventTrackingContext = useContext(EventTrackingContext)
  const { addUriHash, removeUriHash } = useHashRouter()

  const show = useCallback(
    (options?: ShowOptions) => {
      addUriHash(APP_INSTALL_CTA_MODAL_HASH)

      if (options) {
        appInstallCtaModalRef.current = options
      }
    },
    [addUriHash, appInstallCtaModalRef],
  )

  const close = useCallback(() => {
    removeUriHash()

    appInstallCtaModalRef.current = {}
  }, [removeUriHash, appInstallCtaModalRef])

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

'use client'

import { PropsWithChildren, useEffect } from 'react'
import { setUserId } from 'firebase/analytics'

import { EventTrackingContext } from '../event-tracking/context'
import type { EventTrackingValue } from '../event-tracking/types'
import { firebaseAnalytics } from '../event-tracking/libs/firebase-analytics'
import { trackScreen } from '../event-tracking/utils/track-screen'
import { useSession } from '../session/use-session'

export type EventTrackingProviderProps = EventTrackingValue & PropsWithChildren

export function EventTrackingProvider({
  children,
  page,
  utm,
  onError,
}: EventTrackingProviderProps) {
  const { user } = useSession()

  useEffect(() => {
    if (firebaseAnalytics) {
      setUserId(firebaseAnalytics, user?.uid ?? null)
    }
  }, [user?.uid])

  useEffect(() => {
    trackScreen(page.path, page.label, { ...utm }, { page, utm, onError })
  }, [onError, page, utm])

  return (
    <EventTrackingContext.Provider value={{ page, utm, onError }}>
      {children}
    </EventTrackingContext.Provider>
  )
}

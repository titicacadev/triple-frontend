'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { setUserId } from 'firebase/analytics'

import { EventTrackingContext } from '../event-tracking/context'
import type { EventTrackingValue } from '../event-tracking/types'
import { getFirebaseAnalytics } from '../event-tracking/libs/firebase-analytics'
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
    const firebaseAnalytics = getFirebaseAnalytics()
    if (firebaseAnalytics) {
      setUserId(firebaseAnalytics, user?.uid ?? null)
    }
  }, [user?.uid])

  useEffect(() => {
    trackScreen(page.path, page.label, { ...utm }, { page, utm, onError })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <EventTrackingContext.Provider value={{ page, utm, onError }}>
      {children}
    </EventTrackingContext.Provider>
  )
}

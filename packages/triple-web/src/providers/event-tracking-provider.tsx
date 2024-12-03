'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { initializeAnalytics, setUserId } from 'firebase/analytics'
import { getApp } from 'firebase/app'

import { EventTrackingContext } from '../event-tracking/context'
import type { EventTrackingValue } from '../event-tracking/types'
import { trackScreen } from '../event-tracking/utils/track-screen'
import { useSession } from '../session/use-session'

export type EventTrackingProviderProps = Omit<
  EventTrackingValue,
  'firebaseAnalytics'
> &
  PropsWithChildren

function getFirebaseAnalytics() {
  const app = getApp()
  const analytics = initializeAnalytics(app, {
    config: { send_page_view: false },
  })

  return analytics
}
export function EventTrackingProvider({
  children,
  page,
  utm,
  onError,
}: EventTrackingProviderProps) {
  const firebaseAnalytics = getFirebaseAnalytics()
  const { user } = useSession()

  useEffect(() => {
    if (firebaseAnalytics) {
      setUserId(firebaseAnalytics, user?.uid ?? null)
    }
  }, [firebaseAnalytics, user?.uid])

  useEffect(() => {
    trackScreen(
      page.path,
      page.label,
      { ...utm },
      { page, utm, onError, firebaseAnalytics },
    )
  }, [firebaseAnalytics, onError, page, utm])

  return (
    <EventTrackingContext.Provider
      value={{ page, utm, onError, firebaseAnalytics }}
    >
      {children}
    </EventTrackingContext.Provider>
  )
}

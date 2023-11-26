import { PropsWithChildren, useEffect } from 'react'
import { setUserId } from 'firebase/analytics'

import { EventTrackingContext } from '../contexts'
import { useSession } from '../hooks'
import { firebaseAnalytics } from '../libs'
import { trackScreen } from '../utils'
import { EventTrackingValue } from '../types'

export type EventTrackingProviderProps = EventTrackingValue & PropsWithChildren

export function EventTrackingProvider({
  children,
  page,
  utm,
  onError,
}: EventTrackingProviderProps) {
  const { user } = useSession()

  useEffect(() => {
    setUserId(firebaseAnalytics, user?.uid ?? null)
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

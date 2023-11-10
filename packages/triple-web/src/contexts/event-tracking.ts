import { createContext, useContext } from 'react'

import { EventTrackingValue } from '../types'

export const EventTrackingContext = createContext<
  EventTrackingValue | undefined
>(undefined)

export function useEventTracking() {
  const context = useContext(EventTrackingContext)

  if (context === undefined) {
    throw new Error('EventTrackingContext가 없습니다')
  }

  return context
}

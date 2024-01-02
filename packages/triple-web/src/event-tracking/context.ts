import { createContext, useContext } from 'react'

import type { EventMetadataValue, EventTrackingValue } from './types'

export const EventMetadataContext = createContext<
  EventMetadataValue | undefined
>(undefined)

export function useEventMetadata() {
  return useContext(EventMetadataContext)
}

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

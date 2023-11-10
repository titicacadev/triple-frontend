import { createContext, useContext } from 'react'

export interface EventTracking {
  page: {
    label: string
    path: string
  }
  onError?: (error: Error) => void
}

export const EventTrackingContext = createContext<EventTracking | undefined>(
  undefined,
)

export function useEventTracking() {
  const context = useContext(EventTrackingContext)

  if (context === undefined) {
    throw new Error('EventTrackingContext가 없습니다')
  }

  return context
}

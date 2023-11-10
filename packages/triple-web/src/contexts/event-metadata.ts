import { createContext, useContext } from 'react'

export interface EventMetadata {
  [key: string]: string
}

export const EventMetadataContext = createContext<EventMetadata | undefined>(
  undefined,
)

export function useEventMetadata() {
  return useContext(EventMetadataContext)
}

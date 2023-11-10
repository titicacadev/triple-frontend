import { createContext, useContext } from 'react'

import { EventMetadataValue } from '../types'

export const EventMetadataContext = createContext<
  EventMetadataValue | undefined
>(undefined)

export function useEventMetadata() {
  return useContext(EventMetadataContext)
}

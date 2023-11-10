import { PropsWithChildren, useContext } from 'react'

import { EventMetadataContext } from '../contexts'
import { EventMetadataValue } from '../types'

export interface EventMetadataProviderProps extends PropsWithChildren {
  eventMetadataContext?: EventMetadataValue
}

export function EventMetadataProvider({
  children,
  eventMetadataContext,
}: EventMetadataProviderProps) {
  const parentContext = useContext(EventMetadataContext)

  return (
    <EventMetadataContext.Provider
      value={{ ...parentContext, ...eventMetadataContext }}
    >
      {children}
    </EventMetadataContext.Provider>
  )
}

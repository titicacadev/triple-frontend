import { PropsWithChildren, useContext } from 'react'

import { EventMetadata, EventMetadataContext } from '../contexts'

export interface EventMetadataProviderProps extends PropsWithChildren {
  eventMetadataContext?: EventMetadata
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

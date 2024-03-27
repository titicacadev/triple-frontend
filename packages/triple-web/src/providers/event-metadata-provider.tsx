'use client'

import { PropsWithChildren, useContext } from 'react'

import { EventMetadataContext } from '../event-tracking/context'
import type { EventMetadataValue } from '../event-tracking/types'

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

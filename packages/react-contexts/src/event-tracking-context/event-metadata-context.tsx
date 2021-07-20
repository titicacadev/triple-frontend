import React, { createContext, PropsWithChildren, useContext } from 'react'

import { useEventTrackingContext } from './event-tracking-context'
import { FAParams, GAParams, PixelParams } from './types'

interface EventMetadataContext {
  [key: string]: string
}

const EventMetadataContext = createContext<EventMetadataContext | undefined>(
  undefined,
)

export function EventMetadataProvider({
  children,
  eventMetadataContext,
}: PropsWithChildren<{ eventMetadataContext?: EventMetadataContext }>) {
  const parentEventMetadataContext = useContext(EventMetadataContext)

  return (
    <EventMetadataContext.Provider
      value={{ ...parentEventMetadataContext, ...eventMetadataContext }}
    >
      {children}
    </EventMetadataContext.Provider>
  )
}

function useEventMetadataContext() {
  return useContext(EventMetadataContext)
}

export function useEventTrackerWithMetadata() {
  const { trackEvent } = useEventTrackingContext()
  const eventMetadata = useEventMetadataContext()

  return (prams: {
    ga?: GAParams
    fa?: Partial<FAParams>
    pixel?: PixelParams
  }) => {
    trackEvent({
      ga: getGAWithMetadata(prams.ga, eventMetadata),
      fa: getFAWithMetadata(prams.fa, eventMetadata),
      pixel: prams.pixel,
    })
  }
}

function getFAWithMetadata(
  fa?: Partial<FAParams>,
  eventMetaContext?: EventMetadataContext,
) {
  if (!fa) {
    return
  }

  return {
    ...eventMetaContext,
    ...fa,
  }
}

function getGAWithMetadata(
  ga?: GAParams,
  eventMetaContext?: EventMetadataContext,
) {
  if (!ga) {
    return
  }

  if (eventMetaContext) {
    const arrayOfContext = Object.values(eventMetaContext)
    const [action, label] = ga

    if (label) {
      return [action, [...arrayOfContext, ...label.split('_')].join('_')]
    }
    return [action, [...arrayOfContext].join('_')]
  }

  return [...ga]
}

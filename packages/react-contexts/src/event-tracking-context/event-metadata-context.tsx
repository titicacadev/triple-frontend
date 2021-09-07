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

  return (params: {
    ga?: GAParams
    fa?: Partial<FAParams>
    pixel?: PixelParams
  }) => {
    trackEvent({
      ga: getGAWithMetadata(params.ga, eventMetadata),
      fa: getFAWithMetadata(params.fa, eventMetadata),
      pixel: getPixelWithMetadata(params.pixel, eventMetadata),
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
      return [action, [...arrayOfContext, label].join('_').substr(0, 150)]
    }
    return [action, [...arrayOfContext].join('_').substr(0, 150)]
  }

  return ga
}

function getPixelWithMetadata(
  pixel?: PixelParams,
  eventMetaContext?: EventMetadataContext,
) {
  if (!pixel) {
    return
  }

  const { payload } = pixel
  const payloadWithMetadata = { ...eventMetaContext, ...payload }
  return {
    ...pixel,
    payload: payloadWithMetadata,
  }
}

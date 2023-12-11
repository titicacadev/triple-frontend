import { createContext, PropsWithChildren, useContext } from 'react'

import { useEventTrackingContext } from './event-tracking-context'
import {
  FirebaseAnalyticsParams,
  GoogleAnalyticsParams,
  FacebookPixelParams,
  TiktokPixelEvent,
} from './types'

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
    ga?: GoogleAnalyticsParams
    fa?: Partial<FirebaseAnalyticsParams>
    pixel?: FacebookPixelParams
    tiktokPixel?: TiktokPixelEvent
  }) => {
    trackEvent({
      ga: getGoogleAnalyticsWithMetadata(params.ga, eventMetadata),
      fa: getFirebaseAnalyticsWithMetadata(params.fa, eventMetadata),
      pixel: getFacebookPixelWithMetadata(params.pixel, eventMetadata),
      tiktokPixel: params.tiktokPixel,
    })
  }
}

function getFirebaseAnalyticsWithMetadata(
  fa?: Partial<FirebaseAnalyticsParams>,
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

function getGoogleAnalyticsWithMetadata(
  ga?: GoogleAnalyticsParams,
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

function getFacebookPixelWithMetadata(
  pixel?: FacebookPixelParams,
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

import { useEventMetadata } from './context'
import type { EventMetadataValue } from './types'
import { useTrackEvent } from './use-track-event'
import { TrackEventParams } from './utils/track-event'

export function useTrackEventWithMetadata() {
  const trackEvent = useTrackEvent()
  const eventMetadata = useEventMetadata()

  return (params: TrackEventParams) => {
    trackEvent({
      ga: getGoogleAnalyticsWithMetadata(params.ga, eventMetadata),
      fa: getFirebaseAnalyticsWithMetadata(params.fa, eventMetadata),
      metaPixel: getMetaPixelWithMetadata(params.metaPixel, eventMetadata),
      tiktokPixel: params.tiktokPixel,
    })
  }
}

function getFirebaseAnalyticsWithMetadata(
  fa?: TrackEventParams['fa'],
  eventMetaContext?: EventMetadataValue,
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
  ga?: TrackEventParams['ga'],
  eventMetaContext?: EventMetadataValue,
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

function getMetaPixelWithMetadata(
  metaPixel?: TrackEventParams['metaPixel'],
  eventMetaContext?: EventMetadataValue,
) {
  if (!metaPixel) {
    return
  }

  const { payload } = metaPixel
  const payloadWithMetadata = { ...eventMetaContext, ...payload }
  return {
    ...metaPixel,
    payload: payloadWithMetadata,
  }
}

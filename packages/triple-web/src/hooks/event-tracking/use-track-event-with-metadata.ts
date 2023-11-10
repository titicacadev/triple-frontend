import { EventMetadata, useEventMetadata } from '../../contexts'
import { TrackEventParams } from '../../utils'

import { useTrackEvent } from './use-track-event'

export function useEventTrackerWithMetadata() {
  const trackEvent = useTrackEvent()
  const eventMetadata = useEventMetadata()

  return (params: TrackEventParams) => {
    trackEvent({
      ga: getGoogleAnalyticsWithMetadata(params.ga, eventMetadata),
      fa: getFirebaseAnalyticsWithMetadata(params.fa, eventMetadata),
      pixel: getPixelWithMetadata(params.pixel, eventMetadata),
    })
  }
}

function getFirebaseAnalyticsWithMetadata(
  fa?: TrackEventParams['fa'],
  eventMetaContext?: EventMetadata,
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
  eventMetaContext?: EventMetadata,
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
  pixel?: TrackEventParams['pixel'],
  eventMetaContext?: EventMetadata,
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

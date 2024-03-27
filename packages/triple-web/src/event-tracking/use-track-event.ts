import { useCallback, useContext } from 'react'

import { EventTrackingContext } from './context'
import { TrackEventParams, trackEvent } from './utils/track-event'

export function useTrackEvent() {
  const context = useContext(EventTrackingContext)

  return useCallback(
    (params: TrackEventParams) =>
      context ? trackEvent(params, context) : undefined,
    [context],
  )
}

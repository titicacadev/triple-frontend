import { useCallback } from 'react'

import { useEventTracking } from './context'
import { TrackEventParams, trackEvent } from './utils/track-event'

export function useTrackEvent() {
  const context = useEventTracking()

  return useCallback(
    (params: TrackEventParams) => trackEvent(params, context),
    [context],
  )
}

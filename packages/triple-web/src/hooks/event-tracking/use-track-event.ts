import { useCallback } from 'react'

import { useEventTracking } from '../../contexts'
import { TrackEventParams, trackEvent } from '../../utils'

export function useTrackEvent() {
  const context = useEventTracking()

  return useCallback(
    (params: TrackEventParams) => trackEvent(params, context),
    [context],
  )
}

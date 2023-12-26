import { useCallback } from 'react'

import { useEventTracking } from '../../contexts'
import { type TrackEventParams, trackEvent } from '../../utils'

export type { TrackEventParams }

export function useTrackEvent() {
  const context = useEventTracking()

  return useCallback(
    (params: TrackEventParams) => trackEvent(params, context),
    [context],
  )
}

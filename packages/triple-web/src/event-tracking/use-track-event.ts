import { useCallback, useContext } from 'react'

import { EventTrackingContext } from './context'
import { type TrackEventParams, trackEvent } from './utils/track-event'

/**
 * 이벤트 트래킹을 사용합니다.
 */
export function useTrackEvent() {
  const context = useContext(EventTrackingContext)

  return useCallback(
    (params: TrackEventParams) =>
      context ? trackEvent(params, context) : undefined,
    [context],
  )
}

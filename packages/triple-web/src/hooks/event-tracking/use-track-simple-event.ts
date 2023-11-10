import { useCallback } from 'react'

import { useTrackEvent } from './use-track-event'

export interface TrackSimpleEventParams {
  action?: string
  label?: string
  [key: string]: unknown
}

/**
 * 하나의 파라미터로 GA, FA 이벤트를 기록합니다.
 *
 * @deprecated 여러 이벤트 트래커를 유연하게 대응하는 trackEvent를 사용해주세요
 */
export function useTrackSimpleEvent() {
  const trackEvent = useTrackEvent()

  return useCallback(
    ({ action, label, ...rest }: TrackSimpleEventParams) => {
      trackEvent({
        ga: [action, label],
        fa: {
          action,
          ...rest,
        },
      })
    },
    [trackEvent],
  )
}

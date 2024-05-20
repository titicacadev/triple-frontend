import { useCallback, useContext } from 'react'

import { EventTrackingContext } from './context'
import { trackScreen } from './utils/track-screen'

/**
 * 스크린 뷰 이벤트를 트래킹합니다.
 */
export function useTrackScreen() {
  const context = useContext(EventTrackingContext)

  return useCallback(
    (
      path: string,
      label?: string,
      additionalMetadata?: { [key: string]: string },
    ) =>
      context
        ? trackScreen(path, label, additionalMetadata, context)
        : undefined,
    [context],
  )
}

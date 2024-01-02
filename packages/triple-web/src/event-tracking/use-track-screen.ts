import { useCallback } from 'react'

import { useEventTracking } from './context'
import { trackScreen } from './utils/track-screen'

export function useTrackScreen() {
  const context = useEventTracking()

  return useCallback(
    (
      path: string,
      label?: string,
      additionalMetadata?: { [key: string]: string },
    ) => trackScreen(path, label, additionalMetadata, context),
    [context],
  )
}

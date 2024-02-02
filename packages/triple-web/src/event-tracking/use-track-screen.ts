import { useCallback, useContext } from 'react'

import { EventTrackingContext } from './context'
import { trackScreen } from './utils/track-screen'

export function useTrackScreen() {
  const context = useContext(EventTrackingContext)

  return useCallback(
    (
      path: string,
      label?: string,
      additionalMetadata?: { [key: string]: string },
    ) => trackScreen(path, label, additionalMetadata, context),
    [context],
  )
}

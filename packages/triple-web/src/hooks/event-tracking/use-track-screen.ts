import { useCallback } from 'react'

import { useEventTracking } from '../../contexts'
import { trackScreen } from '../../utils'

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

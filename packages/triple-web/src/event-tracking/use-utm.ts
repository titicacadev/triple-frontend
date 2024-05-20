import { useContext } from 'react'

import { EventTrackingContext } from './context'

/**
 * UTM 값을 가져옵니다.
 */
export function useUtm() {
  const context = useContext(EventTrackingContext)

  if (context) {
    return context.utm
  }

  return {}
}

import { useContext } from 'react'

import { EventTrackingContext } from './context'

export function useUtm() {
  const context = useContext(EventTrackingContext)

  if (context) {
    return context.utm
  }

  return {}
}

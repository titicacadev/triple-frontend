import React from 'react'

import { EventTrackingProvider } from './event-tracking-context'

export function withEventTrackingProvider<P>(
  pageLabel: string,
  Component: React.ComponentType<P>,
  options?: {
    onError?: (error: Error) => void
  },
): React.ComponentType<P> {
  const Page: React.ComponentType<P> = function (props: P) {
    return (
      <EventTrackingProvider pageLabel={pageLabel} {...(options || {})}>
        <Component {...props} />
      </EventTrackingProvider>
    )
  }

  return Page
}

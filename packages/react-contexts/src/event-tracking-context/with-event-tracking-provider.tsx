import React from 'react'

import { EventTrackingProvider } from './event-tracking-context'

export function withEventTrackingProvider<P>(
  pageLabel: string,
  Component: React.ComponentType<P>,
): React.ComponentType<P> {
  const Page: React.ComponentType<P> = function (props: P) {
    return (
      <EventTrackingProvider pageLabel={pageLabel}>
        <Component {...props} />
      </EventTrackingProvider>
    )
  }

  return Page
}

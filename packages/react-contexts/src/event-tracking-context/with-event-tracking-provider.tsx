import { Attributes, ComponentType } from 'react'

import { EventTrackingProvider } from './event-tracking-context'

export function withEventTrackingProvider<P>(
  /**
   * @deprecated options.page.label 을 사용합니다.
   */
  pageLabel: string | undefined,
  Component: ComponentType<P & Attributes>,
  options?: {
    page: { label: string; path: string }
    onError?: (error: Error) => void
  },
): ComponentType<P & Attributes> {
  const Page: ComponentType<P & Attributes> = (props: P & Attributes) => {
    return (
      <EventTrackingProvider pageLabel={pageLabel} {...(options || {})}>
        <Component {...props} />
      </EventTrackingProvider>
    )
  }

  return Page
}

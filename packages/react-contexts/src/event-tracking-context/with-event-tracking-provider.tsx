import { EventTrackingProvider } from './event-tracking-context'

export function withEventTrackingProvider<P>(
  /**
   * @deprecated options.page.label 을 사용합니다.
   */
  pageLabel: string | undefined,
  Component: React.ComponentType<P>,
  options?: {
    page: { label: string; path: string }
    onError?: (error: Error) => void
  },
): React.ComponentType<P> {
  const Page: React.ComponentType<P> = (props: P) => {
    return (
      <EventTrackingProvider pageLabel={pageLabel} {...(options || {})}>
        <Component {...props} />
      </EventTrackingProvider>
    )
  }

  return Page
}

import React, { ComponentType } from 'react'

interface FAParams {
  category: string
  event_name: string
  [key: string]: any
}

type GAParams = (string | undefined)[]

const NOOP = () => {}

interface EventTrackingContextValue {
  trackScreen: EventTrackingProviderProps['trackScreen']
  trackEvent: (params: { ga?: GAParams; fa?: Partial<FAParams> }) => void
  trackSimpleEvent: (params: {
    action?: string
    label?: string
    [key: string]: any
  }) => void
  viewItem: Function
}

const Context = React.createContext<EventTrackingContextValue>({
  trackScreen: NOOP,
  trackEvent: NOOP,
  trackSimpleEvent: NOOP,
  viewItem: NOOP,
})

const DEFAULT_EVENT_NAME = 'user_interaction'

interface EventTrackingProviderProps {
  pageLabel: string
  trackScreen: (path: string) => void
  trackEvent: (params: { ga?: GAParams; fa?: FAParams }) => void
  viewItem: Function
}

interface EventTrackingProviderState {
  pageLabel: string
}

declare global {
  interface Window {
    ga: Function
  }
}

type WrappingComponentBaseProps = EventTrackingContextValue

export class EventTrackingProvider extends React.PureComponent<
  EventTrackingProviderProps,
  EventTrackingProviderState
> {
  state = { pageLabel: this.props.pageLabel || 'Unknown' }

  value: EventTrackingContextValue

  constructor(props: EventTrackingProvider['props']) {
    super(props)

    this.value = {
      viewItem: props.viewItem,
      trackScreen: this.trackScreen,
      trackEvent: this.trackEvent,
      trackSimpleEvent: this.trackSimpleEvent,
    }
  }

  trackScreen: EventTrackingContextValue['trackScreen'] = (path: string) => {
    const {
      props: { trackScreen: nativeTrackScreen },
    } = this

    if (window.ga) {
      window.ga('send', 'pageview')
    } else {
      nativeTrackScreen(path)
    }
  }

  trackEvent: EventTrackingContextValue['trackEvent'] = ({ ga, fa }) => {
    const {
      props: { trackEvent: nativeTrackEvent },
      state: { pageLabel },
    } = this

    if (window.ga && ga) {
      const [action, label] = ga
      window.ga('send', 'event', pageLabel, action, label)
    } else {
      nativeTrackEvent({
        ga: ga && [pageLabel, ...ga],
        fa: fa && {
          category: pageLabel,
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          event_name: DEFAULT_EVENT_NAME,
          ...fa,
        },
      })
    }
  }

  trackSimpleEvent: EventTrackingContextValue['trackSimpleEvent'] = ({
    action,
    label,
    ...rest
  }) => {
    const {
      props: { trackEvent: nativeTrackEvent },
      state: { pageLabel },
    } = this

    if (window.ga) {
      window.ga('send', 'event', pageLabel, action, label)
    } else {
      nativeTrackEvent({
        ga: [pageLabel, action, label].filter((v) => v),
        fa: {
          category: pageLabel,
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          event_name: DEFAULT_EVENT_NAME,
          action,
          ...rest,
        },
      })
    }
  }

  render() {
    const {
      props: { children },
    } = this

    return <Context.Provider value={this.value}>{children}</Context.Provider>
  }
}

export function useEventTrackingContext() {
  return React.useContext(Context)
}

export function withEventTracking<
  P extends Partial<WrappingComponentBaseProps>
>(Component: ComponentType<P>) {
  return function EventTrackingComponent(
    props: Omit<P, keyof WrappingComponentBaseProps>,
  ) {
    return (
      <Context.Consumer>
        {({ trackScreen, trackEvent, trackSimpleEvent, viewItem }) => (
          <Component
            {...({
              ...props,
              trackScreen,
              trackEvent,
              trackSimpleEvent,
              viewItem,
            } as P)}
          />
        )}
      </Context.Consumer>
    )
  }
}

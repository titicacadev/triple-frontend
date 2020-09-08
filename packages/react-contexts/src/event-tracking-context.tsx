import React, { ComponentType } from 'react'
import { DeepPartial } from 'utility-types'
import {
  trackScreen as nativeTrackScreen,
  trackEvent as nativeTrackEvent,
  viewItem as nativeViewItem,
} from '@titicaca/triple-web-to-native-interfaces'

interface FAParams {
  category: string
  event_name: string // eslint-disable-line @typescript-eslint/camelcase
  [key: string]: any
}

type GAParams = (string | undefined)[]

const NOOP = () => {}

interface EventTrackingContextValue {
  trackScreen: (screenPath: string) => void
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
}

interface EventTrackingProviderState {
  pageLabel: string
}

declare global {
  interface Window {
    ga: Function
  }
}

export class EventTrackingProvider extends React.PureComponent<
  EventTrackingProviderProps,
  EventTrackingProviderState
> {
  state = { pageLabel: this.props.pageLabel || 'Unknown' }

  value: EventTrackingContextValue

  constructor(props: EventTrackingProvider['props']) {
    super(props)

    this.value = {
      viewItem: nativeViewItem,
      trackScreen: this.trackScreen,
      trackEvent: this.trackEvent,
      trackSimpleEvent: this.trackSimpleEvent,
    }
  }

  trackScreen: EventTrackingContextValue['trackScreen'] = (path: string) => {
    if (window.ga) {
      window.ga('send', 'pageview')
    } else {
      nativeTrackScreen(path)
    }
  }

  trackEvent: EventTrackingContextValue['trackEvent'] = ({ ga, fa }) => {
    const {
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
          action: action as string,
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

export type WithEventTrackingBaseProps = EventTrackingContextValue

export function withEventTracking<
  P extends DeepPartial<WithEventTrackingBaseProps>
>(Component: ComponentType<P>) {
  return function EventTrackingComponent(
    props: Omit<P, keyof WithEventTrackingBaseProps>,
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

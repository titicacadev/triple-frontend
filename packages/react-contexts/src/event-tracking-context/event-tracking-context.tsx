import React, { ComponentType } from 'react'
import { DeepPartial } from 'utility-types'
import {
  hasAccessibleTripleNativeClients,
  trackScreen as nativeTrackScreen,
  trackEvent as nativeTrackEvent,
  viewItem as nativeViewItem,
} from '@titicaca/triple-web-to-native-interfaces'

import { FAParams, GAParams } from './types'

const NOOP = () => {}

interface EventTrackingContextValue {
  trackScreen: (screenPath: string) => void
  trackEvent: (params: {
    ga?: GAParams
    fa?: Partial<FAParams>
    pixel?: [string, { [key: string]: unknown }]
  }) => void
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
    fbq?: (
      type: 'track' | 'trackCustom',
      action: string,
      payload?: { [key: string]: unknown },
    ) => void
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
    }

    if (window.fbq) {
      window.fbq('track', 'PageView')
    }

    if (hasAccessibleTripleNativeClients()) {
      nativeTrackScreen(path)
    }
  }

  trackEvent: EventTrackingContextValue['trackEvent'] = ({ ga, fa, pixel }) => {
    const {
      state: { pageLabel },
    } = this

    if (window.ga && ga) {
      const [action, label] = ga
      window.ga('send', 'event', pageLabel, action, label)
    }

    if (window.fbq && pixel) {
      window.fbq('trackCustom', ...pixel)
    }

    if (hasAccessibleTripleNativeClients()) {
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
    }

    if (window.fbq) {
      if (!action) {
        console.warn('이벤트 action이 없습니다.')
      } else {
        window.fbq('trackCustom', action, {
          label,
          ...rest,
        })
      }
    }

    if (hasAccessibleTripleNativeClients()) {
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

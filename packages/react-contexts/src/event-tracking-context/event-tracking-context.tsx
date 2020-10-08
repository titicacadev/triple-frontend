import React, { ComponentType } from 'react'
import { DeepPartial } from 'utility-types'
import {
  hasAccessibleTripleNativeClients,
  trackScreen as nativeTrackScreen,
  trackEvent as nativeTrackEvent,
  viewItem as nativeViewItem,
} from '@titicaca/triple-web-to-native-interfaces'

import { FAParams, GAParams, PixelParams } from './types'

const NOOP = () => {}

interface EventTrackingContextValue {
  trackScreen: (screenPath: string) => void
  trackEvent: (params: {
    ga?: GAParams
    fa?: Partial<FAParams>
    /**
     * Facebook Pixel 이벤트 파라미터
     *
     * type을 "track"으로 설정하면 주어진 action만 사용할 수 있습니다.
     * 그리고 type을 생략하면 맞춤 이벤트를 사용합니다.
     */
    pixel?: PixelParams
  }) => void
  /**
   * 하나의 파라미터로 GA, FA, Pixel 이벤트를 기록합니다.
   *
   * 그래서 Pixel은 무조건 맞춤 이벤트를 사용합니다.
   */
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
  onError?: (error: Error) => void
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
    try {
      if (window.ga) {
        window.ga('send', 'pageview')
      }

      if (window.fbq) {
        window.fbq('track', 'PageView')
      }

      if (hasAccessibleTripleNativeClients()) {
        nativeTrackScreen(path)
      }
    } catch (error) {
      const {
        props: { onError },
      } = this

      if (onError) {
        onError(error)
      }
    }
  }

  trackEvent: EventTrackingContextValue['trackEvent'] = ({ ga, fa, pixel }) => {
    const {
      props: { onError },
      state: { pageLabel },
    } = this

    try {
      if (window.ga && ga) {
        const [action, label] = ga
        window.ga('send', 'event', pageLabel, action, label)
      }

      if (window.fbq && pixel) {
        const { type = 'trackCustom', action, payload } = pixel

        window.fbq(type, action, { pageLabel, ...payload })
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
    } catch (error) {
      if (onError) {
        onError(error)
      }
    }
  }

  trackSimpleEvent: EventTrackingContextValue['trackSimpleEvent'] = ({
    action,
    label,
    ...rest
  }) => {
    const {
      props: { onError },
      state: { pageLabel },
    } = this

    try {
      if (window.ga) {
        window.ga('send', 'event', pageLabel, action, label)
      }

      if (window.fbq) {
        if (!action) {
          throw new Error(
            'Facebook Pixel 이벤트 이름으로 사용하는 action이 없습니다.',
          )
        } else {
          window.fbq('trackCustom', action, {
            pageLabel,
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
    } catch (error) {
      if (onError) {
        onError(error)
      }
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

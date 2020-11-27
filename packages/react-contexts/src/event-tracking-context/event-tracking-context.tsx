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
  trackScreen: (screenPath: string, label?: string) => void
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
   * 하나의 파라미터로 GA, FA 이벤트를 기록합니다.
   *
   * @deprecated 여러 이벤트 트래커를 유연하게 대응하는 trackEvent를 사용해주세요
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

declare global {
  interface Window {
    ga?: (
      method: 'send',
      type: 'pageview' | 'event',
      ...data: (string | undefined)[]
    ) => void
    fbq?: (
      type: 'track' | 'trackCustom',
      action: string,
      payload?: { [key: string]: unknown },
    ) => void
  }
}

export class EventTrackingProvider extends React.PureComponent<
  EventTrackingProviderProps
> {
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

  trackScreen: EventTrackingContextValue['trackScreen'] = (
    path: string,
    label?: string,
  ) => {
    try {
      if (window.ga) {
        window.ga('send', 'pageview')
      }

      if (window.fbq && label) {
        window.fbq('trackCustom', `PageView_${label}`, { path })
      }

      if (hasAccessibleTripleNativeClients()) {
        nativeTrackScreen(path, label)
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
      props: { pageLabel, onError },
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
      props: { pageLabel, onError },
    } = this

    try {
      if (window.ga) {
        window.ga('send', 'event', pageLabel, action, label)
      }

      if (hasAccessibleTripleNativeClients()) {
        nativeTrackEvent({
          ga: [pageLabel, action, label].filter((v) => v),
          fa: {
            category: pageLabel,
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

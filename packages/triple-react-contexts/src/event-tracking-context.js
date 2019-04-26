import React, { PureComponent, createContext, useContext } from 'react'

const Context = createContext({ pageLabel: 'Unknown' })

const DEFAULT_EVENT_NAME = 'user_interaction'

export class EventTrackingProvider extends PureComponent {
  state = { pageLabel: this.props.pageLabel || 'Unknown' }

  trackScreen = (path) => {
    const {
      props: { trackScreen: nativeTrackScreen },
    } = this

    if (window.ga) {
      window.ga('send', 'pageview')
    } else {
      nativeTrackScreen(path)
    }
  }

  trackEvent = ({ ga, fa }) => {
    const {
      props: { trackEvent: nativeTrackEvent },
      state: { pageLabel },
    } = this

    if (window.ga && ga) {
      const [action, label] = ga
      window.ga('send', pageLabel, action, label)
    } else {
      nativeTrackEvent({
        ga: ga && [pageLabel, ...ga],
        fa: fa && {
          category: pageLabel,
          event_name: DEFAULT_EVENT_NAME,
          ...fa,
        },
      })
    }
  }

  trackSimpleEvent = ({ action, label, ...rest }) => {
    const {
      props: { trackEvent: nativeTrackEvent },
      state: { pageLabel },
    } = this

    if (window.ga) {
      window.ga('send', pageLabel, action, label)
    } else {
      nativeTrackEvent({
        ga: [pageLabel, action, label].filter((v) => v),
        fa: {
          category: pageLabel,
          event_name: DEFAULT_EVENT_NAME,
          action,
          ...rest,
        },
      })
    }
  }

  render() {
    const {
      props: { viewItem, children },
    } = this

    return (
      <Context.Provider
        value={{
          trackScreen: this.trackScreen,
          trackEvent: this.trackEvent,
          trackSimpleEvent: this.trackSimpleEvent,
          viewItem: viewItem,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export function useEventTrackingContext() {
  return useContext(Context)
}

export function withEventTracking(Component) {
  return function EventTrackingComponent(props) {
    return (
      <Context.Consumer>
        {({ trackScreen, trackEvent, trackSimpleEvent, viewItem }) => (
          <Component
            trackScreen={trackScreen}
            trackEvent={trackEvent}
            trackSimpleEvent={trackSimpleEvent}
            viewItem={viewItem}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}

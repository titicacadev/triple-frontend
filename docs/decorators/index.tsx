import { StoryFn } from '@storybook/react'
import {
  HistoryProvider,
  SessionContextProvider,
  EnvProvider,
  UserAgentProvider,
  EventMetadataProvider,
  EventTrackingProvider,
  DeviceProvider,
} from '@titicaca/react-contexts'
import { TripleClientMetadataProvider } from '@titicaca/react-triple-client-interfaces'
import { GlobalStyle } from '@titicaca/core-elements'
import MockDate from 'mockdate'

export function globalStyleDecorator(Story: StoryFn) {
  return (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
}

export function envProviderDecorator(Story: StoryFn) {
  return (
    <EnvProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      authBasePath="MOCK_AUTH_BASE_PATH"
      facebookAppId=""
      defaultPageTitle=""
      defaultPageDescription=""
      googleMapsApiKey="AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4"
      afOnelinkId=""
      afOnelinkPid=""
      afOnelinkSubdomain=""
    >
      <Story />
    </EnvProvider>
  )
}

export function historyProviderDecorator(Story: StoryFn) {
  return (
    <EnvProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      authBasePath="MOCK_AUTH_BASE_PATH"
      facebookAppId=""
      defaultPageTitle=""
      defaultPageDescription=""
      googleMapsApiKey="AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4"
      afOnelinkId=""
      afOnelinkPid=""
      afOnelinkSubdomain=""
    >
      <SessionContextProvider
        type="browser"
        props={{
          initialUser: undefined,
          initialSessionAvailability: false,
        }}
      >
        <HistoryProvider
          isPublic={false}
          isAndroid={false}
          transitionModalHash="transition.general"
        >
          <Story />
        </HistoryProvider>
      </SessionContextProvider>
    </EnvProvider>
  )
}

export function sessionContextProviderDecorator(Story: StoryFn) {
  return (
    <EnvProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      authBasePath="MOCK_AUTH_BASE_PATH"
      facebookAppId=""
      defaultPageTitle=""
      defaultPageDescription=""
      googleMapsApiKey="AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4"
      afOnelinkId=""
      afOnelinkPid=""
      afOnelinkSubdomain=""
    >
      <SessionContextProvider
        type="browser"
        props={{
          initialUser: undefined,
          initialSessionAvailability: false,
        }}
      >
        <Story />
      </SessionContextProvider>
    </EnvProvider>
  )
}

export function userAgentProviderDecorator(Story: StoryFn) {
  return (
    <UserAgentProvider
      value={{
        isPublic: true,
        isMobile: false,
        os: {},
        app: null,
      }}
    >
      <Story />
    </UserAgentProvider>
  )
}

export function tripleClientMetadataDecorator(Story: StoryFn) {
  return (
    <TripleClientMetadataProvider {...null}>
      <Story />
    </TripleClientMetadataProvider>
  )
}

export function newDateMockingDecorator(Story: StoryFn) {
  MockDate.set('1/1/2022')
  return <Story />
}

export function eventMetadataDecorator(Story: StoryFn) {
  return (
    <EventMetadataProvider>
      <Story />
    </EventMetadataProvider>
  )
}

export function eventTrackingProviderDecorator(Story: StoryFn) {
  return (
    <EventTrackingProvider page={{ label: 'test', path: '/' }}>
      <Story />
    </EventTrackingProvider>
  )
}

export function deviceProviderDecorator(Story: StoryFn) {
  return (
    <DeviceProvider
      value={{ inRegion: false, latitude: null, longitude: null }}
    >
      <Story />
    </DeviceProvider>
  )
}

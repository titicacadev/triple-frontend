import React from 'react'
import { StoryFn } from '@storybook/react'
import {
  HistoryProvider,
  SessionContextProvider,
  EnvProvider,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import { ClientContextProvider } from '@titicaca/react-client-interfaces'

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
        isMobile: false,
        os: {},
      }}
    >
      <Story />
    </UserAgentProvider>
  )
}

export function clientContextProviderDecorator(Story: StoryFn) {
  return (
    <ClientContextProvider {...null}>
      <Story />
    </ClientContextProvider>
  )
}

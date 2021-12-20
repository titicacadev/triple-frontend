import React from 'react'
import { StoryFn } from '@storybook/addons'
import {
  HistoryProvider,
  SessionContextProvider,
  EnvProvider,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import { boolean } from '@storybook/addon-knobs'
import {} from '@titicaca/react-contexts/src/session-context/context'

export function historyProviderDecorator(storyFn: StoryFn<JSX.Element>) {
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
        props={{ initialSessionAvailability: false, initialUser: undefined }}
      >
        <HistoryProvider
          isPublic={false}
          isAndroid={false}
          transitionModalHash="transition.general"
        >
          {storyFn()}
        </HistoryProvider>
      </SessionContextProvider>
    </EnvProvider>
  )
}

export function sessionContextProviderDecorator(storyFn: StoryFn<JSX.Element>) {
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
          initialSessionAvailability: boolean('세션 유무', false),
        }}
      >
        {storyFn()}
      </SessionContextProvider>
    </EnvProvider>
  )
}

export function userAgentProviderDecorator(storyFn: StoryFn<JSX.Element>) {
  return (
    <UserAgentProvider
      value={{
        isPublic: boolean('isPublic', true),
        isMobile: boolean('isMobile', false),
        os: {},
        app: null,
      }}
    >
      {storyFn()}
    </UserAgentProvider>
  )
}

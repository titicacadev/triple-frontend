import React from 'react'
import { StoryFn } from '@storybook/addons'
import {
  HistoryProvider,
  SessionContextProvider,
  EnvProvider,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import { boolean } from '@storybook/addon-knobs'

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
    >
      <HistoryProvider
        isPublic={false}
        isAndroid={false}
        transitionModalHash="transition.general"
      >
        {storyFn()}
      </HistoryProvider>
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
    >
      <SessionContextProvider
        sessionId={
          boolean('hasSessionId', false) ? 'MOCK_SESSION_ID' : undefined
        }
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

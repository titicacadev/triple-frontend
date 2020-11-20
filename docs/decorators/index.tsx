import React from 'react'
import { StoryFn } from '@storybook/addons'
import {
  HistoryProvider,
  SessionContextProvider,
} from '@titicaca/react-contexts'
import { boolean } from '@storybook/addon-knobs'

export function historyProviderDecorator(storyFn: StoryFn<JSX.Element>) {
  return (
    <HistoryProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      isPublic={false}
      isAndroid={false}
      transitionModalHash="transition.general"
    >
      {storyFn()}
    </HistoryProvider>
  )
}

export function sessionContextProviderDecorator(storyFn: StoryFn<JSX.Element>) {
  return (
    <SessionContextProvider
      sessionId={boolean('hasSessionId', false) ? 'MOCK_SESSION_ID' : undefined}
      authBasePath="MOCK_AUTH_BASE_PATH"
    >
      {storyFn()}
    </SessionContextProvider>
  )
}

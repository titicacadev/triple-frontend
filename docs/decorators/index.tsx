import React from 'react'
import { StoryFn } from '@storybook/addons'
import { HistoryProvider } from '@titicaca/react-contexts'

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

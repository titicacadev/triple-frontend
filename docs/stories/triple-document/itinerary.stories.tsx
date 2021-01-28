import React from 'react'
import { ELEMENTS } from '@titicaca/triple-document'
import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/addons'
import { boolean } from "@storybook/addon-knobs";
import { EnvProvider, SessionContextProvider } from '@titicaca/react-contexts'

import mock from '../__mocks__/triple-document.itinerary.json'

const { itinerary: Itinerary } = ELEMENTS

function envProviderDecorator(storyFn: StoryFn<JSX.Element>) {
  return (
    <EnvProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      authBasePath="MOCK_AUTH_BASE_PATH"
      facebookAppId=""
      defaultPageTitle=""
      defaultPageDescription=""
      googleMapsApiKey="AIzaSyBaOSog5Kc4PkNw1JiSIcvz8WHt1Y78lNU"
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

export default {
  title: 'TripleDocument | 추천코스',
  decorators: [envProviderDecorator],
}

export function DocumentItinerary() {
  return (
    <Itinerary
      value={mock.article.source.body[1].value}
      onClickSaveToItinerary={action('onClickSaveToItinerary')}
    />
  )
}

DocumentItinerary.story = {
  name: '추천코스 기본',
}

import React from 'react'
import { ELEMENTS } from '@titicaca/triple-document'
import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/addons'
import { EnvProvider } from '@titicaca/react-contexts'

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
      {storyFn()}
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

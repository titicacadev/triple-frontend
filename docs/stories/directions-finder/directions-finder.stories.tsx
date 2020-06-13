import React from 'react'
import styled from 'styled-components'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'
import { HistoryProvider } from '@titicaca/react-contexts'
import DirectionsFinder from '@titicaca/directions-finder'

const LongPage = styled.div`
  height: 4000px;
`

export default {
  title: 'directions-finder | DirectionsFinder',
}

function BaseDirectionsFinder() {
  return (
    <DirectionsFinder
      onDirectionsClick={action('onDirectionsClick')}
      primaryName={text('primaryName', '도쿄 디즈니 랜드')}
      localName={text('localName', '東京ディズニーランド')}
      localAddress={text('localAddress', '〒279-0031 東京都千葉県浦安市舞浜11')}
      phoneNumber={text('phoneNumber', '+81453305211')}
      isDomestic={boolean('isDomestic', false)}
    />
  )
}

BaseDirectionsFinder.story = {
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <HistoryProvider
        appUrlScheme=""
        webUrlBase=""
        isPublic={false}
        isAndroid={false}
        transitionModalHash="transition.general"
      >
        <LongPage>{storyFn()}</LongPage>
      </HistoryProvider>
    ),
  ],
}

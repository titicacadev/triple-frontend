import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { HistoryProvider } from '@titicaca/react-contexts'
import NearbyPois from '@titicaca/nearby-pois'

storiesOf('Nearby-Pois | NearbyPois', module).add('추천 POI 있음', () => (
  <HistoryProvider
    appUrlScheme="dev-soto"
    webUrlBase="https://triple-dev.titicaca-corp.com"
  >
    <NearbyPois
      poiId="a86a3f55-9f89-4540-a124-f8c4db07ab34"
      geolocation={{
        type: 'Point',
        coordinates: [135.50129726256557, 34.668727308992935],
      }}
      regionId="71476976-cf9a-4ae8-a60f-76e6fb26900d"
      scraps={{}}
      onScrapedChange={action('onScrapedChange')}
    />
  </HistoryProvider>
))

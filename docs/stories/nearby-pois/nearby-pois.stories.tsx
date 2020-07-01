import React from 'react'
import { action } from '@storybook/addon-actions'
import { HistoryProvider } from '@titicaca/react-contexts'
import NearbyPois from '@titicaca/nearby-pois'
import { StoryFn } from '@storybook/addons'

export default {
  title: 'Nearby-Pois | NearbyPois',
}

function HistoryProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <HistoryProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      isPublic={false}
      isAndroid={false}
      transitionModalHash="transition.general"
    >
      <div>{children}</div>
    </HistoryProvider>
  )
}

export function BaseNearbyPois() {
  return (
    <NearbyPois
      poiId="a86a3f55-9f89-4540-a124-f8c4db07ab34"
      geolocation={{
        type: 'Point',
        coordinates: [125.50129726256557, 34.668727308992935],
      }}
      regionId="71476976-cf9a-4ae8-a60f-76e6fb26900d"
      scraps={{}}
      onScrapedChange={action('onScrapedChange')}
    />
  )
}

BaseNearbyPois.story = {
  name: '기본 NearbyPois',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <HistoryProviderWrapper>
        <div>{storyFn()}</div>
      </HistoryProviderWrapper>
    ),
  ],
}

export function NearbyPoisWithRecommended() {
  return (
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
  )
}

NearbyPoisWithRecommended.story = {
  name: '추천 일정이 있는',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <HistoryProviderWrapper>
        <div>{storyFn()}</div>
      </HistoryProviderWrapper>
    ),
  ],
}

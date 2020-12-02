import React from 'react'
import { text, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Container } from '@titicaca/core-elements'
import { MapProvider } from '@titicaca/map'

import { mapOptions } from './mock'

/**
 * FIXME: security issue
 */
const GOOGLE_MAPS_API_KEY = 'AIzaSyA1Shc9dPadNkDCemFqXX8D7DJzT6OA4a8'

export default {
  title: 'Map | Map',
}

export function Map() {
  return (
    <Container width="100vw" height="100vh">
      <MapProvider
        options={mapOptions}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      ></MapProvider>
    </Container>
  )
}

Map.story = {
  name: '기본 맵',
}

export function MapWithProps() {
  return (
    <Container
      width={text('맵 컨테이너 가로 사이즈', '50%')}
      height={number('맵 컨테이너 세로 사이즈', 200)}
    >
      <MapProvider
        options={mapOptions}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      />
    </Container>
  )
}

MapWithProps.story = {
  name: '사이즈 설정',
}

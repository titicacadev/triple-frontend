import React, { useState } from 'react'
import styled from 'styled-components'
// import { text, boolean, number, select, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Container } from '@titicaca/core-elements'
import { MapProvider, getGeometry } from '@titicaca/map'

import HOTELS from '../__mocks__/map/hotel-recommandations.json'

import { RecommendationHotelResourceType } from './types'

export default {
  title: 'Map | Map',
}

export function Map() {
  /** MapProvider 는 기본적으로 width/heigth 이 100%/100%  */
  const MapContainer = styled(Container)`
    position: sticky;
    top: 52px;
    z-index: 3;
    background-color: #ffffff;
    width: 100%;
    height: 180px;
  `

  const [key, setKey] = useState<string>('')
  const coordinates: [
    number,
    number,
  ][] = ((HOTELS as unknown) as RecommendationHotelResourceType[])
    .map(({ hotel }) => hotel)
    .map(
      ({
        source: {
          pointGeolocation: { coordinates },
        },
      }) => coordinates as [number, number],
    )

  const { center, bounds } = getGeometry(coordinates)

  return (
    <MapContainer>
      <input
        type="text"
        defaultValue={key}
        onBlur={(e) => {
          setKey(e.currentTarget.value)
        }}
        size={50}
        placeholder="google map api key"
      />
      <MapProvider
        options={{ center, bounds }}
        onLoad={action('onLoad')}
        googleMapLoadOptions={{
          googleMapsApiKey: key,
        }}
      ></MapProvider>
    </MapContainer>
  )
}

Map.story = {
  name: '기본 맵',
}

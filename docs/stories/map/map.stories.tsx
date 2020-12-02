import React, { useState } from 'react'
import styled from 'styled-components'
import { action } from '@storybook/addon-actions'
import { Container } from '@titicaca/core-elements'
import { MapProvider } from '@titicaca/map'

import { mapOptions } from './mock'

const MapContainer = styled(Container)`
  background-color: #ffffff;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '200px'};
`

export default {
  title: 'Map | Map',
}

export function Map() {
  const [key, setKey] = useState<string>('')

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
      {key ? (
        <MapProvider
          options={mapOptions}
          onLoad={action('onLoad')}
          googleMapLoadOptions={{
            googleMapsApiKey: key,
          }}
        ></MapProvider>
      ) : null}
    </MapContainer>
  )
}

Map.story = {
  name: '기본 맵',
}

export function MapWithProps() {
  const [key, setKey] = useState<string>('')

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

      <Container width="50%" height={200}>
        {key ? (
          <MapProvider
            options={mapOptions}
            onLoad={action('onLoad')}
            googleMapLoadOptions={{
              googleMapsApiKey: key,
            }}
          ></MapProvider>
        ) : null}
      </Container>
    </MapContainer>
  )
}

MapWithProps.story = {
  name: '사이즈 설정',
}

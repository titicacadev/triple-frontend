import React, { useState } from 'react'
import styled from 'styled-components'
import { text, number } from '@storybook/addon-knobs'
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
          onLoad={action('맵 로드 완료 액션')}
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

      <Container
        width={text('맵 컨테이너 가로 사이즈', '50%')}
        height={number('맵 컨테이너 세로 사이즈', 200)}
      >
        {key ? (
          <MapProvider
            options={mapOptions}
            onLoad={action('맵 로드 완료 액션')}
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

import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '@titicaca/core-elements'

import { MapView } from './map-view'
import {
  coordinates,
  polygonLinePath,
  polygonPaths,
  polylinePaths,
} from './mock'
import { DotPolyline, HotelCircleMarker, Polygon, Polyline } from './overlay'

/**
 * 구글 맵 SDK API 키 설정은 아래에서 진행할 수 있습니다.
 * 아래 키는 triple-frontend 적용키로 서비스에서 사용하는 키와 다르고
 * 사용 범위가 *.triple-corp.com/* 으로 제한되어 있습니다.
 *
 * https://console.cloud.google.com/apis/credentials/key/e2f05131-1fe0-48d7-a231-f5f05336a007?folder=&organizationId=&project=titicaca-ci
 */
const GOOGLE_MAPS_API_KEY = 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4'

export default {
  title: 'Map / Map',
  component: MapView,
} as Meta

export const Basic: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <MapView {...args} />
      </Container>
    )
  },

  name: '기본 맵',

  args: {
    coordinates,
    options: {
      zoom: 10,
    },
    googleMapLoadOptions: { googleMapsApiKey: GOOGLE_MAPS_API_KEY },
  },
}

export const WithProps: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          width: '50%',
          height: 200,
        }}
      >
        <MapView {...args} />
      </Container>
    )
  },

  name: '사이즈 설정',

  args: {
    coordinates,
    googleMapLoadOptions: { googleMapsApiKey: GOOGLE_MAPS_API_KEY },
    options: {
      zoom: 9,
    },
    padding: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    },
  },
}

export const WithPolyline: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          width: '100vw',
          height: 200,
        }}
      >
        <MapView {...args}>
          <Polyline path={polylinePaths} strokeColor="#000000" />
        </MapView>
      </Container>
    )
  },

  name: 'Polyline',

  args: {
    coordinates: polylinePaths.map((path) => [path.lng, path.lat]),
    googleMapLoadOptions: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  },
}

export const WithMarker: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          width: '100vw',
          height: 200,
        }}
      >
        <MapView {...args}>
          {polylinePaths.map((path, i) => (
            <HotelCircleMarker
              key={i}
              zIndex={polylinePaths.length - i}
              active={false}
              position={{ ...path }}
              onClick={() => {}}
            >
              {i + 1}
            </HotelCircleMarker>
          ))}

          <Polyline path={polylinePaths} strokeColor="#000000" />
        </MapView>
      </Container>
    )
  },

  name: 'Polyline with CircleMarker',

  args: {
    coordinates: polylinePaths.map((path) => [path.lng, path.lat]),
    googleMapLoadOptions: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  },
}

export const WithCircleMarker: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          width: '50%',
          height: 300,
        }}
      >
        <MapView {...args}>
          <Polygon paths={polygonPaths} strokeColor="#000000" />
        </MapView>
      </Container>
    )
  },

  name: 'Polygon with CircleMarker',

  args: {
    coordinates: polygonPaths.map((path) => [path.lng, path.lat]),
    googleMapLoadOptions: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  },
}

export const WithWithPolyline: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          height: 300,
        }}
      >
        <MapView {...args}>
          <DotPolyline path={polygonLinePath} strokeColor="#000000" />
          <Polygon paths={polygonPaths} fillColor="#000000" fillOpacity={0.2} />
        </MapView>
      </Container>
    )
  },

  name: 'Polygon with Polyline',

  args: {
    coordinates: polygonLinePath.map(({ lat, lng }) => [lng, lat]),
    googleMapLoadOptions: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  },
}

export const WithPolylineAndMarker: StoryObj<typeof MapView> = {
  render: (args) => {
    return (
      <Container
        css={{
          height: 300,
        }}
      >
        <MapView {...args}>
          {polygonPaths.map((path, i) => (
            <HotelCircleMarker
              key={i}
              zIndex={polygonPaths.length - i}
              active={false}
              position={{ ...path }}
              onClick={() => {}}
            >
              {i + 1}
            </HotelCircleMarker>
          ))}

          <DotPolyline path={polygonLinePath} strokeColor="#000000" />
          <Polygon paths={polygonPaths} fillColor="#000000" fillOpacity={0.2} />
        </MapView>
      </Container>
    )
  },

  name: 'Polygon with Polyline, Marker',

  args: {
    coordinates: polygonPaths.map(({ lat, lng }) => [lng, lat]),
    googleMapLoadOptions: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  },
}

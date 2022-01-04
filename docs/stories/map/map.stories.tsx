import React from 'react'
import { Container } from '@titicaca/core-elements'
import MapView, {
  Polyline,
  DotPolyline,
  Polygon,
  HotelCircleMarker,
} from '@titicaca/map'
import { ComponentStory, Meta } from '@storybook/react'

import {
  mapOptions,
  bounds,
  polylineGeometry,
  polylinePaths,
  polygonGeometry,
  polygonLinePath,
  polygonPaths,
} from './mock'

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

export const Basic: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container width="100vw" height="100vh">
      <MapView {...args} />
    </Container>
  )
}
Basic.storyName = '기본 맵'
Basic.args = {
  options: mapOptions,
  googleMapLoadOptions: { googleMapsApiKey: GOOGLE_MAPS_API_KEY },
  bounds,
}
Basic.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

export const WithProps: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container width="50%" height={200}>
      <MapView {...args} />
    </Container>
  )
}
WithProps.storyName = '사이즈 설정'
WithProps.args = {
  options: mapOptions,
  googleMapLoadOptions: { googleMapsApiKey: GOOGLE_MAPS_API_KEY },
  bounds,
  padding: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
}
WithProps.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

export const WithPolyline: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container width="100vw" height={200}>
      <MapView {...args}>
        <Polyline path={polylinePaths} strokeColor="#000000" />
      </MapView>
    </Container>
  )
}
WithPolyline.storyName = 'Polyline'
WithPolyline.args = {
  options: { ...polylineGeometry, zoom: 12 },
  googleMapLoadOptions: {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  },
  bounds,
}
WithPolyline.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

export const WithMarker: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container width="100vw" height={200}>
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
}

WithMarker.storyName = 'Polyline with CircleMarker'
WithMarker.args = {
  options: { ...polylineGeometry, zoom: 12 },
  googleMapLoadOptions: {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  },
  bounds,
}
WithMarker.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

export const WithCircleMarker: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container width="50%" height={300}>
      <MapView {...args}>
        <Polygon paths={polygonPaths} strokeColor="#000000" />
      </MapView>
    </Container>
  )
}

WithCircleMarker.storyName = 'Polygon with CircleMarker'
WithCircleMarker.args = {
  options: { ...polylineGeometry, zoom: 12 },
  googleMapLoadOptions: {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  },
  bounds,
}
WithCircleMarker.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

export const WithWithPolyline: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container height={300}>
      <MapView {...args}>
        <DotPolyline path={polygonLinePath} strokeColor="#000000" />
        <Polygon paths={polygonPaths} fillColor="#000000" fillOpacity={0.2} />
      </MapView>
    </Container>
  )
}
WithWithPolyline.storyName = 'Polygon with Polyline'
WithWithPolyline.args = {
  options: { ...polylineGeometry, zoom: 12 },
  googleMapLoadOptions: {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  },
  bounds,
}
WithWithPolyline.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

export const WithPolylineAndMarker: ComponentStory<typeof MapView> = (args) => {
  return (
    <Container height={300}>
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
}
WithPolylineAndMarker.storyName = 'Polygon with Polyline, Marker'
WithPolylineAndMarker.args = {
  options: { ...polygonGeometry, zoom: 10 },
  googleMapLoadOptions: {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  },
  bounds,
}
WithPolylineAndMarker.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
}

import React from 'react'
import { text, number, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Container } from '@titicaca/core-elements'
import {
  MapProvider,
  Polyline,
  DotPolyline,
  Polygon,
  HotelCircleMarker,
} from '@titicaca/map'

import {
  mapOptions,
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
const GOOGLE_MAPS_API_KEY = 'AIzaSyBaOSog5Kc4PkNw1JiSIcvz8WHt1Y78lNU'

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

export function MapWithPolyline() {
  return (
    <Container width="100vw" height={200}>
      <MapProvider
        options={{ ...polylineGeometry, zoom: number('zoom', 12) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
        <Polyline
          path={polylinePaths}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
      </MapProvider>
    </Container>
  )
}

MapWithPolyline.story = {
  name: 'Polyline',
}

export function PolylineWithMarker() {
  return (
    <Container width="100vw" height={200}>
      <MapProvider
        options={{ ...polylineGeometry, zoom: number('zoom', 12) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
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

        <Polyline
          path={polylinePaths}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
      </MapProvider>
    </Container>
  )
}

PolylineWithMarker.story = {
  name: 'Polyline with CircleMarker',
}

export function PolygonWithMarker() {
  return (
    <Container
      width={text('맵 컨테이너 가로 사이즈', '50%')}
      height={number('맵 컨테이너 세로 사이즈', 300)}
    >
      <MapProvider
        options={{ ...polygonGeometry, zoom: number('zoom', 10) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
        <Polygon
          paths={polygonPaths}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
      </MapProvider>
    </Container>
  )
}

PolygonWithMarker.story = {
  name: 'Polygon with CircleMarker',
}

export function PolygonWithPolyline() {
  return (
    <Container height={300}>
      <MapProvider
        options={{ ...polygonGeometry, zoom: number('zoom', 10) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
        <DotPolyline
          path={polygonLinePath}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
        <Polygon
          paths={polygonPaths}
          fillColor={select(
            'polygon color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
          fillOpacity={select('polygon opacity', [1, 0.7, 0.5, 0.2], 0.2)}
        />
      </MapProvider>
    </Container>
  )
}

PolygonWithPolyline.story = {
  name: 'Polygon with Polyline',
}

export function PolygonWithPolylineAndMarker() {
  return (
    <Container height={300}>
      <MapProvider
        options={{ ...polygonGeometry, zoom: number('zoom', 10) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
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

        <DotPolyline
          path={polygonLinePath}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
        <Polygon
          paths={polygonPaths}
          fillColor={select(
            'polygon color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
          fillOpacity={select('polygon opacity', [1, 0.7, 0.5, 0.2], 0.2)}
        />
      </MapProvider>
    </Container>
  )
}

PolygonWithPolylineAndMarker.story = {
  name: 'Polygon with Polyline, Marker',
}

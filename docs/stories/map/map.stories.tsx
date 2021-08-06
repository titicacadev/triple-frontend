import React from 'react'
import { text, number, select, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Container } from '@titicaca/core-elements'
import MapView, {
  Polyline,
  DotPolyline,
  Polygon,
  HotelCircleMarker,
} from '@titicaca/map'

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
}

export function Map() {
  return (
    <Container width="100vw" height="100vh">
      <MapView
        options={mapOptions}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
        bounds={object('동서남북 경계', bounds)}
      />
    </Container>
  )
}

Map.storyName = '기본 맵'

export function MapWithProps() {
  return (
    <Container
      width={text('맵 컨테이너 가로 사이즈', '50%')}
      height={number('맵 컨테이너 세로 사이즈', 200)}
    >
      <MapView
        options={mapOptions}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
        padding={object('맵 내부 여백', {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
        })}
        bounds={object('동서남북 경계', bounds)}
      />
    </Container>
  )
}

MapWithProps.storyName = '사이즈 설정'

export function MapWithPolyline() {
  return (
    <Container width="100vw" height={200}>
      <MapView
        options={{ ...polylineGeometry, zoom: number('zoom', 12) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
        bounds={object('동서남북 경계', bounds)}
      >
        <Polyline
          path={polylinePaths}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
      </MapView>
    </Container>
  )
}

MapWithPolyline.storyName = 'Polyline'

export function PolylineWithMarker() {
  return (
    <Container width="100vw" height={200}>
      <MapView
        options={{ ...polylineGeometry, zoom: number('zoom', 12) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
        bounds={object('동서남북 경계', bounds)}
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
      </MapView>
    </Container>
  )
}

PolylineWithMarker.storyName = 'Polyline with CircleMarker'

export function PolygonWithMarker() {
  return (
    <Container
      width={text('맵 컨테이너 가로 사이즈', '50%')}
      height={number('맵 컨테이너 세로 사이즈', 300)}
    >
      <MapView
        options={{ ...polygonGeometry, zoom: number('zoom', 10) }}
        onLoad={action('맵 로드 완료 액션')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
        bounds={object('동서남북 경계', bounds)}
      >
        <Polygon
          paths={polygonPaths}
          strokeColor={select(
            'line color',
            ['red', 'blue', 'green'],
            '#000000',
          )}
        />
      </MapView>
    </Container>
  )
}

PolygonWithMarker.storyName = 'Polygon with CircleMarker'

export function PolygonWithPolyline() {
  return (
    <Container height={300}>
      <MapView
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
      </MapView>
    </Container>
  )
}

PolygonWithPolyline.storyName = 'Polygon with Polyline'

export function PolygonWithPolylineAndMarker() {
  return (
    <Container height={300}>
      <MapView
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
      </MapView>
    </Container>
  )
}

PolygonWithPolylineAndMarker.storyName = 'Polygon with Polyline, Marker'

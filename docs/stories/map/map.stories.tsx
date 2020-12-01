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
    <Container width="100vw" height={300}>
      <MapProvider
        options={{ ...polygonGeometry, zoom: 10 }}
        onLoad={action('onLoad')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
        {/* {polylinePaths.map((path, i) => (
            <HotelCircleMarker
              key={i}
              zIndex={polylinePaths.length - i}
              active={false}
              position={{ ...path }}
              onClick={() => {}}
            >
              {i + 1}
            </HotelCircleMarker>
          ))} */}

        <Polygon paths={polygonPaths} />
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
        options={{ ...polygonGeometry, zoom: 10 }}
        onLoad={action('onLoad')}
        googleMapLoadOptions={{
          googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        }}
      >
        {/* {polylinePaths.map((path, i) => (
            <HotelCircleMarker
              key={i}
              zIndex={polylinePaths.length - i}
              active={false}
              position={{ ...path }}
              onClick={() => {}}
            >
              {i + 1}
            </HotelCircleMarker>
          ))} */}

        <DotPolyline path={polygonLinePath} />
        <Polygon paths={polygonPaths} />
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
        options={{ ...polygonGeometry, zoom: 10 }}
        onLoad={action('onLoad')}
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

        <DotPolyline path={polygonLinePath} />
        <Polygon paths={polygonPaths} />
      </MapProvider>
    </Container>
  )
}

PolygonWithPolylineAndMarker.story = {
  name: 'Polygon with Polyline, Marker',
}

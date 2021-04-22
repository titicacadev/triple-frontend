import React from 'react'
import styled from 'styled-components'
import { Container, Image } from '@titicaca/core-elements'

export type PoiType = 'attraction' | 'restaurant' | 'hotel'

const Marker = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
  width: 30px;
  height: 30px;
`

const MARKER_SOURCES: { [key: string]: string } = {
  restaurant: 'https://assets.triple.guide/images/img-map-pin-food@4x.png',
  hotel: 'https://assets.triple.guide/images/img-map-pin-hotel@4x.png',
  attraction: 'https://assets.triple.guide/images/img-map-pin-sight@4x.png',
}

export default function StaticMap({
  type,
  lat,
  lon,
  zoom = 16,
  frame = 'mini',
  mapSize = '320x120',
  mapScale = '2',
  markerImage,
  onClick,
}: {
  type?: PoiType
  lat: number | string
  lon: number | string
  zoom?: number | string
  frame?: Parameters<typeof Image.FixedRatioFrame>['0']['frame']
  mapSize?: string
  mapScale?: string
  markerImage?: string
  onClick?: (e: React.SyntheticEvent) => void
}) {
  return (
    <Container position="relative" onClick={onClick}>
      <Image>
        <Image.FixedRatioFrame frame={frame}>
          <Image.Img
            src={`/api/maps/static-map?size=${mapSize}&scale=${mapScale}&center=${lat}%2C${lon}&zoom=${zoom}`}
          />
        </Image.FixedRatioFrame>
      </Image>
      <Marker src={markerImage || (type && MARKER_SOURCES[type])} />
    </Container>
  )
}

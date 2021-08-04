import React from 'react'
import styled, { css } from 'styled-components'
import {
  Container,
  Image,
  formatMarginPadding,
  MEDIA_FRAME_OPTIONS,
  marginMixin,
} from '@titicaca/core-elements'
import { FrameRatioAndSizes } from '@titicaca/type-definitions'

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

const StaticMapContainer = styled.div<{ frame?: FrameRatioAndSizes }>`
  width: 100%;
  position: relative;
  background: '#f5f5f5';
  float: none;
  border-radius: 6px;
  overflow: hidden;

  ${marginMixin};

  ${({ frame }) =>
    frame
      ? css`
          ${formatMarginPadding({ top: MEDIA_FRAME_OPTIONS[frame] }, 'padding')}
        `
      : css`
          @media (max-width: 768px) {
            ${formatMarginPadding(
              { top: MEDIA_FRAME_OPTIONS['small'] },
              'padding',
            )}
          }

          @media (min-width: 769px) {
            ${formatMarginPadding(
              { top: MEDIA_FRAME_OPTIONS['medium'] },
              'padding',
            )}
          }
        `}
`

const StaticMapImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
  z-index: 0;

  position: absolute;
  top: 0;
`

const MARKER_SOURCES: { [key: string]: string } = {
  restaurant: 'https://assets.triple.guide/images/img_map_pin_food@4x.png',
  hotel: 'https://assets.triple.guide/images/img_map_pin_hotel@4x.png',
  attraction: 'https://assets.triple.guide/images/img_map_pin_sight@4x.png',
  tna: 'https://assets.triple.guide/images/img_map_pin_tna@4x.png',
}

export default function StaticMap({
  type,
  lat,
  lon,
  zoom = 12,
  frame,
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
      <StaticMapContainer frame={frame}>
        <StaticMapImage
          src={`/api/maps/static-map?size=${mapSize}&scale=${mapScale}&center=${lat}%2C${lon}&zoom=${zoom}`}
          srcSet={`/api/maps/static-map?size=315x190&scale=${mapScale}&center=${lat}%2C${lon}&zoom=${zoom} 768w`}
        />
      </StaticMapContainer>
      <Marker src={markerImage || (type && MARKER_SOURCES[type])} />
    </Container>
  )
}

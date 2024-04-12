import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Container, Image, marginMixin } from '@titicaca/kint5-core-elements'

export type PoiType = 'attraction' | 'restaurant' | 'hotel'
export interface ResponsiveVariant {
  mapSize: string
  viewport: string
  mapScale?: string
  zoom?: number
}

const Marker = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
  width: 30px;
  height: 30px;
`

const StaticMapContainer = styled.div`
  width: 100%;
  position: relative;
  background: #f5f5f5;
  float: none;
  border-radius: 16px;
  overflow: hidden;
  padding-top: 64.1%;
  ${marginMixin};
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

const StaticMapPicture = styled.picture`
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

const IMAGE_SRC_BASE_URL = 'https://triple.guide/api/maps/static-map'

function StaticMap({
  type,
  lat,
  lon,
  zoom = 16,
  mapSize = '320x120',
  mapScale = '2',
  markerImage,
  responsiveVariants,
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
  responsiveVariants?: ResponsiveVariant[]
  onClick?: (e: SyntheticEvent) => void
}) {
  const srcSet = responsiveVariants
    ?.map(
      ({
        mapSize,
        viewport,
        mapScale: responsiveMapScale = 2,
        zoom: responsiveZoom = 13,
      }) => {
        return `${IMAGE_SRC_BASE_URL}?size=${mapSize}&scale=${responsiveMapScale}&center=${lat}%2C${lon}&zoom=${responsiveZoom} ${viewport}`
      },
    )
    .join(', ')

  return (
    <Container position="relative" onClick={onClick} css={{ margin: '0 16px' }}>
      <StaticMapContainer>
        <StaticMapPicture>
          {srcSet ? (
            <source media="(min-width: 600px)" srcSet={srcSet} />
          ) : null}
          <StaticMapImage
            src={`${IMAGE_SRC_BASE_URL}?size=${mapSize}&scale=${mapScale}&center=${lat}%2C${lon}&zoom=${zoom}`}
          />
        </StaticMapPicture>
      </StaticMapContainer>
      <Marker src={markerImage || (type && MARKER_SOURCES[type])} />
    </Container>
  )
}

export default StaticMap

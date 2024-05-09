import { ComponentType, SVGProps, SyntheticEvent } from 'react'
import styled from 'styled-components'
import {
  Container,
  Image,
  ThumbnailBorder,
  marginMixin,
} from '@titicaca/kint5-core-elements'

import {
  AttractionMarker,
  FestaMarker,
  ProductMarker,
  RestaurantMarker,
} from './marker-icons'

export type MarkerType = 'attraction' | 'restaurant' | 'festa' | 'product'
export interface ResponsiveVariant {
  mapSize: string
  viewport: string
  mapScale?: string
  zoom?: number
}

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
  border-radius: 16px;
  object-fit: cover;
  z-index: 0;
  position: absolute;
  top: 0;
`

const StaticMapPicture = styled.picture`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  z-index: 0;
  position: absolute;
  top: 0;
`

const MARKERS: { [key in MarkerType]: ComponentType<SVGProps<SVGSVGElement>> } =
  {
    attraction: AttractionMarker,
    restaurant: RestaurantMarker,
    festa: FestaMarker,
    product: ProductMarker,
  }

function StaticMap({
  markerType,
  lat,
  lon,
  zoom = 16,
  mapSize = '320x120',
  mapScale = '2',
  responsiveVariants,
  onClick,
}: {
  markerType?: MarkerType
  lat: number | string
  lon: number | string
  zoom?: number | string
  frame?: Parameters<typeof Image.FixedRatioFrame>['0']['frame']
  mapSize?: string
  mapScale?: string
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
        return `/api/maps/static-map?size=${mapSize}&scale=${responsiveMapScale}&center=${lat}%2C${lon}&zoom=${responsiveZoom} ${viewport}`
      },
    )
    .join(', ')

  const MapMarker = MARKERS[markerType ?? 'attraction']

  return (
    <Container position="relative" onClick={onClick} css={{ margin: '0 16px' }}>
      <StaticMapContainer>
        <StaticMapPicture>
          {srcSet ? (
            <source media="(min-width: 600px)" srcSet={srcSet} />
          ) : null}
          <StaticMapImage
            src={`/api/maps/static-map?size=${mapSize}&scale=${mapScale}&center=${lat}%2C${lon}&zoom=${zoom}`}
          />
        </StaticMapPicture>
        <ThumbnailBorder css={{ borderRadius: 16 }} />
      </StaticMapContainer>
      <div
        css={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <MapMarker />
      </div>
    </Container>
  )
}

export default StaticMap

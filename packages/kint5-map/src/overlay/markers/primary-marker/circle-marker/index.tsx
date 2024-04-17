import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
} from 'react'
import { OverlayViewProps, OverlayView } from '@react-google-maps/api'
import { Container, MapMarkerIcon, Text } from '@titicaca/kint5-core-elements'

import { CirclePin, MarkerBaseProps } from './circle-marker-base'

// tna 추가예정
export type CircleType = 'attraction' | 'restaurant' | 'hotel'

export interface CircleMarkerProps
  extends MarkerBaseProps,
    Omit<OverlayViewProps, 'mapPaneName'> {
  onClick?: (e: MouseEvent) => void
}

/** 마커 종류의 따른 css 값 */
export const CIRCLE_MARKER: {
  [key in CircleType]: {
    color: string
    imageUrl: string
  }
} = {
  attraction: {
    color: 'var(--color-purple)',
    imageUrl:
      'https://assets.triple.guide/images/img-map-pin-attraction-on@3x.png',
  },
  restaurant: {
    color: 'var(--color-vermilion)',
    imageUrl:
      'https://assets.triple.guide/images/img-map-pin-restaurant-on@3x.png',
  },
  hotel: {
    color: 'var(--color-purple)',
    imageUrl: 'https://assets.triple.guide/images/img-map-pin-hotel-on@3x.png',
  },
}

export function CircleMarker({
  position,
  color,
  zIndex = 1,
  active = false,
  alwaysClickable = false,
  width = 28,
  height = 28,
  onLoad,
  onClick,
  children,
  ...overlayViewProps
}: PropsWithChildren<CircleMarkerProps>) {
  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      onClick && onClick(e)
    },
    [onClick],
  )

  return (
    <OverlayView
      {...overlayViewProps}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      position={position}
      onLoad={onLoad}
    >
      <CirclePin
        zIndex={zIndex}
        width={width}
        height={height}
        alwaysClickable={alwaysClickable}
        active={active}
        color={color}
        onClick={handleClick}
      >
        <Container
          css={{ position: 'absolute', zIndex: 1, top: -22, left: -5 }}
        >
          <MapMarkerIcon color={color} />
          <Text
            css={{
              position: 'absolute',
              top: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#FFF',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {children}
          </Text>
        </Container>
        <div
          css={{
            width: 14,
            height: 14,
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            css={{
              width: 8,
              height: 8,
              backgroundColor: '#FFF',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </CirclePin>
    </OverlayView>
  )
}

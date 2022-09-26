import { MouseEvent, PropsWithChildren, useCallback } from 'react'
import { OverlayViewProps, OverlayView } from '@react-google-maps/api'

import { Circle, CirclePin, MarkerBaseProps } from './circle-marker-base'

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
  src,
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
  const handleClick = useCallback(
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
        src={src}
        onClick={handleClick}
      >
        <Circle>{children}</Circle>
      </CirclePin>
    </OverlayView>
  )
}

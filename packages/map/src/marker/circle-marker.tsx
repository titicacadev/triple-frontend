import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { OverlayView, OverlayViewProps } from '@react-google-maps/api'

import { Circle, CirclePin, MarkerBaseProps } from './circle-marker-base'

export interface CircleMarkerProps
  extends MarkerBaseProps,
    Omit<OverlayViewProps, 'mapPaneName'> {
  onClick?: (e: MouseEvent) => void
}

export function CircleMarker({
  color,
  src,
  zIndex = 1,
  active = false,
  pointEvents = false,
  width = 28,
  height = 28,
  onLoad,
  onClick,
  children,
  ...overlayViewProps
}: PropsWithChildren<CircleMarkerProps>) {
  const overlayViewRef = useRef<OverlayView>(null)

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
      ref={overlayViewRef}
      onLoad={onLoad}
    >
      {/* TODO: active/inactive 상태에 따른 컴포넌트를 갖도록 개선 */}
      <CirclePin
        zIndex={zIndex}
        width={width}
        height={height}
        pointEvents={pointEvents}
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

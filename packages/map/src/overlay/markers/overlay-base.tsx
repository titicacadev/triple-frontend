import {
  Container,
  LayeringMixinProps,
  layeringMixin,
} from '@titicaca/core-elements'
import styled from 'styled-components'
import React, { PropsWithChildren } from 'react'
import { OverlayView, OverlayViewProps } from '@react-google-maps/api'

interface OverlayMarkerProps
  extends Omit<OverlayViewProps, 'mapPaneName' | 'position'> {
  position: google.maps.LatLng | google.maps.LatLngLiteral
}

export const OverlayWrapper = styled(Container)<LayeringMixinProps>`
  width: 100%;
  position: absolute;
  ${layeringMixin(5)}
`

export function OverlayMarker({
  onLoad,
  position,
  children,
  ...overlayViewProps
}: PropsWithChildren<OverlayMarkerProps>) {
  return (
    <OverlayView
      {...overlayViewProps}
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      onLoad={onLoad}
    >
      {children}
    </OverlayView>
  )
}

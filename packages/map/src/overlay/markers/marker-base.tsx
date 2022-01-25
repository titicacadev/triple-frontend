import {
  Container,
  LayeringMixinProps,
  layeringMixin,
} from '@titicaca/core-elements'
import styled from 'styled-components'
import React, { PropsWithChildren } from 'react'
import { OverlayView, OverlayViewProps } from '@react-google-maps/api'

interface MarkerBaseProps
  extends Omit<OverlayViewProps, 'mapPaneName' | 'position'> {
  position: google.maps.LatLng | google.maps.LatLngLiteral
}

export const MarkerBaseWrapper = styled(Container)<LayeringMixinProps>`
  width: 100%;
  position: absolute;
  ${layeringMixin(5)}
`

export function MarkerBase({
  onLoad,
  position,
  children,
  ...overlayViewProps
}: PropsWithChildren<MarkerBaseProps>) {
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

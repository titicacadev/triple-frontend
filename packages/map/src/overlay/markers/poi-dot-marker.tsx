import React, {
  MouseEvent,
  useRef,
  useCallback,
  useEffect,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'
import { OverlayView, OverlayViewProps } from '@react-google-maps/api'

import { BubbleMarker, DotMarker } from './primary-marker'
import {
  CIRCLE_MARKER,
  CircleType,
  MarkerBaseProps,
} from './primary-marker/circle-marker/circle-marker-base'

export interface DotWithPopOverMarkerProps
  extends Pick<MarkerBaseProps, 'zIndex'>,
    Omit<OverlayViewProps, 'mapPaneName'> {
  type: CircleType
  active: boolean
  bubbleContent: React.ReactNode
  activeContent?: React.ReactNode
  inActiveContent?: React.ReactNode
  withDot?: boolean
  onClick?: (e: MouseEvent) => void
  onBubbleClick?: (e: MouseEvent) => void
}

/**
 * 말풍선 텍스트 및 poi dot marker를 렌더링하기 위한 컴포넌트
 */
export function PoiDotMarker({
  children,
  ...props
}: PropsWithChildren<DotWithPopOverMarkerProps>) {
  return <DotWithPopOverMarker {...props}>{children}</DotWithPopOverMarker>
}

function DotWithPopOverMarker({
  type,
  active,
  withDot,
  activeContent,
  inActiveContent,
  bubbleContent,
  zIndex,
  onClick,
  onBubbleClick,
  onLoad,
  children,
  ...overlayViewProps
}: PropsWithChildren<DotWithPopOverMarkerProps>) {
  const overlayViewRef = useRef() as React.RefObject<OverlayView>
  const adjustZindex = useCallback(() => {
    const containerEl = overlayViewRef?.current?.containerRef?.current

    if (!containerEl) {
      return
    }

    const weight = active ? 100 : 0
    const applyingZindex = (zIndex || 0) + weight
    containerEl.style.zIndex = String(applyingZindex)
  }, [active, overlayViewRef, zIndex])

  const handleLoad = useCallback(
    (overlay: google.maps.OverlayView) => {
      adjustZindex()

      onLoad && onLoad(overlay)
    },
    [adjustZindex, onLoad],
  )

  useEffect(() => {
    adjustZindex()
  }, [zIndex, overlayViewRef, active, adjustZindex])

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onClick && onClick(e)
    },
    [onClick],
  )

  const handleBubbleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onBubbleClick && onBubbleClick(e)
    },
    [onBubbleClick],
  )

  const color = CIRCLE_MARKER[type].color

  return (
    <OverlayView
      {...overlayViewProps}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      ref={overlayViewRef}
      onLoad={handleLoad}
    >
      <>
        {active ? (
          <BubbleMarker onClick={handleBubbleClick}>
            {bubbleContent}
          </BubbleMarker>
        ) : null}

        {withDot ? (
          <DotMarker active={active} color={color} onClick={handleClick}>
            {children}
          </DotMarker>
        ) : null}

        {active && activeContent ? activeContent : null}

        {!active && inActiveContent ? inActiveContent : null}
      </>
    </OverlayView>
  )
}

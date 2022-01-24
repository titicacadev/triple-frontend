import React, {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { OverlayView } from '@react-google-maps/api'

import { BubbleMarkerProps, SmallBubbleMarker } from '../bubble-marker'

export function SmallCircleMarker({
  id: poiId,
  type: poiType,
  zIndex = 1,
  active = false,
  linkText,
  onLoad,
  onClick,
  onBubbleClick,
  children,
  color,
  ...overlayViewProps
}: PropsWithChildren<BubbleMarkerProps>) {
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

  return (
    <OverlayView
      {...overlayViewProps}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      ref={overlayViewRef}
      onLoad={handleLoad}
    >
      <SmallBubbleMarker
        id={poiId}
        type={poiType}
        color={color}
        linkText={linkText}
        active={active}
        onClick={handleClick}
        onBubbleClick={handleBubbleClick}
      />
    </OverlayView>
  )
}

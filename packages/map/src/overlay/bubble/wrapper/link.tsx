import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { OverlayView } from '@react-google-maps/api'

import { BubbleBaseProps } from '../bubble-base'

export function LinkBubbleWrapper({
  id: poiId,
  type: poiType,
  zIndex = 1,
  active = false,
  linkText,
  onLoad,
  onClick,
  onBubbleClick,
  children,
  ...overlayViewProps
}: PropsWithChildren<Omit<BubbleBaseProps, 'color'>>) {
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

  return (
    <OverlayView
      {...overlayViewProps}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      ref={overlayViewRef}
      onLoad={handleLoad}
    >
      {children}
    </OverlayView>
  )
}

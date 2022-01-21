import React, {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { OverlayView } from '@react-google-maps/api'
import { ExternalLink } from '@titicaca/router'

import {
  BubbleBox,
  BubbleMarkerProps,
  BubbleMarkerContainer,
  BubbleText,
  BubbleCircle,
} from './bubble-marker-base'

export default function SmallCircleMarker({
  id: poiId,
  type: poiType,
  zIndex = 1,
  active = false,
  bubbleText,
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
      <>
        {active && bubbleText && (
          <BubbleBox onClick={handleBubbleClick}>
            <ExternalLink href={`/${poiType}s/${poiId}`} target="new" noNavbar>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <BubbleText>{bubbleText}</BubbleText>
              </a>
            </ExternalLink>
          </BubbleBox>
        )}
        <BubbleMarkerContainer onClick={handleClick} active={active}>
          <BubbleCircle color={color}>{children}</BubbleCircle>
        </BubbleMarkerContainer>
      </>
    </OverlayView>
  )
}

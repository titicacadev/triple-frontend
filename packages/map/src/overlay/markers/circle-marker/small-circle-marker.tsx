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
  BubbleCircle,
  BubbleMarkerContainer,
  BubbleMarkerProps,
  LinkLabel,
  NavigateToPoiDetailLink,
} from '../bubble-marker'

import { CIRCLE_MARKER } from './circle-marker-base'

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
  ...overlayViewProps
}: PropsWithChildren<Omit<BubbleMarkerProps, 'color'>>) {
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
      <BubbleMarker
        id={poiId}
        color={CIRCLE_MARKER[poiType].color}
        type={poiType}
        linkText={linkText}
        active={active}
        onClick={handleClick}
        onBubbleClick={handleBubbleClick}
      />
    </OverlayView>
  )
}

function BubbleMarker({
  id: poiId,
  type: poiType,
  color,
  active,
  linkText,
  onClick,
  onBubbleClick,
  children,
}: PropsWithChildren<
  Omit<BubbleMarkerProps, 'imageUrl' | 'onClick' | 'onBubbleClick'> & {
    onClick: MouseEventHandler<HTMLDivElement>
    onBubbleClick: MouseEventHandler<HTMLDivElement>
  }
>) {
  return (
    <>
      {active && linkText && (
        <NavigateToPoiDetailLink onClick={onBubbleClick}>
          <ExternalLink href={`/${poiType}s/${poiId}`} target="new" noNavbar>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <LinkLabel>{linkText}</LinkLabel>
            </a>
          </ExternalLink>
        </NavigateToPoiDetailLink>
      )}
      <BubbleMarkerContainer onClick={onClick} active={active}>
        <BubbleCircle color={color}>{children}</BubbleCircle>
      </BubbleMarkerContainer>
    </>
  )
}

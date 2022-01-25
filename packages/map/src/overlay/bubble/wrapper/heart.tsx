import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { OverlayView } from '@react-google-maps/api'
import styled, { css } from 'styled-components'
import { Required } from 'utility-types'

import { BubbleBaseProps, BubbleCircle } from '../bubble-base'

const withActive = ({
  color,
  active = false,
}: {
  color: string
  active?: boolean
}) =>
  active
    ? css`
        left: 6px;
        top: 5px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: transparent;
      `
    : css`
        left: 0;
        top: 0;
        width: 28px;
        height: 28px;
        line-height: 28px;
        background-color: ${color};
        box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
      `

export const HeartPin = styled.div<
  Pick<BubbleBaseProps, 'active' | 'color' | 'imageUrl'> &
    Required<Pick<BubbleBaseProps, 'onAnimationEnd'>>
>`
  position: absolute;
  z-index: 1;
  animation-duration: 400ms;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  will-change: transform;
  transform-origin: 21px 50px;
  @keyframes active {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  ${({ imageUrl, active = false }) =>
    active
      ? css`
          left: -21px;
          top: -50px;
          background: url(${imageUrl}) no-repeat 0 0;
          background-size: 42px 50px;
          width: 42px;
          height: 50px;
        `
      : css`
          left: -14px;
          top: -14px;
          width: 28px;
          height: 28px;
        `}

  ${BubbleCircle} {
    ${(props) => withActive(props)}
  }
`

export function HeartBubbleWrapper({
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
}: PropsWithChildren<BubbleBaseProps>) {
  const overlayViewRef = useRef() as React.RefObject<OverlayView>
  const adjustZindex = useCallback(() => {
    const containerEl = overlayViewRef?.current?.containerRef?.current

    /** FIXME:
     * map onload 이후에 동적으로 변경되는 마커의 경우 이 시점에 containerEl 이 null 이여서
     * z-index 를 설정할 수가 없음,
     */
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

  const circlePinRef = useRef() as React.RefObject<HTMLDivElement>

  useEffect(() => {
    if (!circlePinRef.current) {
      return
    }

    const { current: circlePinEl } = circlePinRef

    function animate() {
      circlePinEl.style.animationName = active ? 'active' : ''
    }

    animate()
  }, [active, circlePinRef, zIndex])

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

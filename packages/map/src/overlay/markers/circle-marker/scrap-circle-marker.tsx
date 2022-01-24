import React, {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import styled, { css } from 'styled-components'
import { OverlayView } from '@react-google-maps/api'

import {
  BubbleCircle,
  BubbleMarkerProps,
  ScrapBubbleMarker,
} from '../bubble-marker'

import { CIRCLE_MARKER, CircleType } from './circle-marker-base'

const Icon = styled.svg`
  width: ${(props) => props.width || 36}px;
  height: ${(props) => props.height || 36}px;
`

const withActive = ({
  type,
  active = false,
}: {
  type: CircleType
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
        background-color: ${CIRCLE_MARKER[type].color};
        box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
      `

const CirclePin = styled.div<Pick<BubbleMarkerProps, 'active' | 'type'>>`
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
  ${({ type, active = false }) =>
    active
      ? css`
          left: -21px;
          top: -50px;
          background: url(${CIRCLE_MARKER[type].imageUrl}) no-repeat 0 0;
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

export function ScrapCircleMarker({
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
}: PropsWithChildren<BubbleMarkerProps>) {
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

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onClick && onClick(e)
    },
    [onClick],
  )

  const handleAnimationEnd = (e: React.SyntheticEvent) => {
    const circlePinEl = e.target as HTMLElement

    if (!circlePinEl) {
      return
    }

    circlePinEl.style.animationName = ''
  }

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
      {active && linkText ? (
        <ScrapBubbleMarker
          id={poiId}
          type={poiType}
          color={CIRCLE_MARKER[poiType].color}
          linkText={linkText}
          active={active}
          onClick={handleClick}
          onBubbleClick={handleBubbleClick}
        />
      ) : (
        <CirclePin
          type={poiType}
          ref={circlePinRef}
          active={active}
          color={CIRCLE_MARKER[poiType].color}
          onClick={handleClick}
          onAnimationEnd={handleAnimationEnd}
        >
          <BubbleCircle color={CIRCLE_MARKER[poiType].color}>
            {!active && (
              <Icon viewBox="0 0 34 34" width={24} height={22}>
                <path
                  fill="none"
                  fillRule="evenodd"
                  stroke="var(--color-white)"
                  strokeLinejoin="round"
                  strokeWidth="1.65"
                  d="M17 11.229C17.877 9.683 19.55 8 22.005 8 24.994 8 27 10.426 27 13.374c0 5.83-5.768 9.873-10 12.626-4.232-2.753-10-6.796-10-12.626C7 10.426 9.006 8 11.995 8 14.45 8 16.123 9.683 17 11.229z"
                />
              </Icon>
            )}
          </BubbleCircle>
        </CirclePin>
      )}
    </OverlayView>
  )
}

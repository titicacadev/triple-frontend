import React, {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import styled, { css } from 'styled-components'
import { OverlayView } from '@react-google-maps/api'
import { ExternalLink } from '@titicaca/router'

import {
  BubbleBox,
  BubbleCircle,
  BubbleMarkerContainer,
  BubbleMarkerProps,
  BubbleText,
} from './bubble-marker-base'

const Icon = styled.svg`
  width: ${(props) => props.width || 36}px;
  height: ${(props) => props.height || 36}px;
`

const withActive = ({
  color = 'var(--color-purple)',
  size: { width = 28, height = 28 } = {},
  active = false,
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
        width: ${width}px;
        height: ${height}px;
        line-height: ${height}px;
        background-color: ${color};
        box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
      `

const CirclePin = styled.div<
  Pick<BubbleMarkerProps, 'color' | 'width' | 'height' | 'active'>
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
  ${({
    color = 'var(--color-purple)',
    width = 28,
    height = 28,
    active = false,
  }) => {
    let typeOfColor = 'attraction'
    switch (color) {
      case 'var(--color-vermilion)':
        typeOfColor = 'restaurant'
        break
      case 'var(--color-purple)':
      default:
        typeOfColor = 'attraction'
        break
    }
    return active
      ? css`
          left: -21px;
          top: -50px;
          background: url(https://assets.triple-dev.titicaca-corp.com/images/img-map-pin-${typeOfColor}-on@3x.png)
            no-repeat 0 0;
          background-size: 42px 50px;
          width: 42px;
          height: 50px;
        `
      : css`
          left: -${width / 2}px;
          top: -${height / 2}px;
          width: ${width}px;
          height: ${height}px;
        `
  }}
  ${BubbleCircle} {
    ${(props) => withActive(props)}
  }
`

export default function ScrapCircleMarker({
  id: poiId,
  type: poiType,
  width = 28,
  height = 28,
  margin = 3,
  zIndex = 1,
  active = false,
  bubbleText,
  color,
  onLoad,
  onClick,
  onBubbleClick,
  children,
  ...overlayViewProps
}: PropsWithChildren<BubbleMarkerProps>) {
  const overlayViewRef = useRef() as React.RefObject<OverlayView>
  const adjestZindex = useCallback(() => {
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
      adjestZindex()

      onLoad && onLoad(overlay)
    },
    [adjestZindex, onLoad],
  )

  useEffect(() => {
    adjestZindex()
  }, [zIndex, overlayViewRef, active, adjestZindex])

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
      {active && bubbleText ? (
        <>
          <BubbleBox
            margin={margin}
            width={13}
            height={13}
            onClick={handleBubbleClick}
          >
            <ExternalLink href={`/${poiType}s/${poiId}`} target="new" noNavbar>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <BubbleText>{bubbleText}</BubbleText>
              </a>
            </ExternalLink>
          </BubbleBox>

          <BubbleMarkerContainer
            onClick={handleClick}
            active={active}
            width={13}
            height={13}
            margin={margin}
          >
            <BubbleCircle width={13} height={13} margin={margin} color={color}>
              {children}
            </BubbleCircle>
          </BubbleMarkerContainer>
        </>
      ) : (
        <CirclePin
          ref={circlePinRef}
          active={active}
          color={color}
          width={width}
          height={height}
          onClick={handleClick}
          onAnimationEnd={handleAnimationEnd}
        >
          <BubbleCircle
            width={width}
            height={height}
            margin={margin}
            color={color}
          >
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

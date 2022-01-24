import React, { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react'
import { OverlayViewProps } from '@react-google-maps/api'
import styled, { css } from 'styled-components'
import { ExternalLink } from '@titicaca/router'

import { MarkerBaseProps } from './circle-marker/circle-marker-base'

export interface BubbleMarkerProps
  extends Pick<MarkerBaseProps, 'active' | 'zIndex'>,
    Omit<OverlayViewProps, 'mapPaneName'> {
  id: string
  type: string
  color?: string
  linkText?: string | null
  onClick?: (e: MouseEvent) => void
  onBubbleClick?: (e: MouseEvent) => void
}

const BUBBLE_HEIGHT = 32

const BubbleMarkerContainer = styled.div<Pick<BubbleMarkerProps, 'active'>>`
  position: relative;
  ${({ active }) =>
    css`
      left: -8px;
      top: -${8 + (active ? BUBBLE_HEIGHT : 0)}px;
      width: 32px;
      height: 32px;
      pointer-events: ${active ? 'none' : 'auto'};
    `}
`

const BubbleCircle = styled.div<Pick<BubbleMarkerProps, 'color'>>`
  position: absolute;
  z-index: 1;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
  ${({ color = 'var(--color-purple)' }) =>
    css`
      left: 3px;
      top: 3px;
      width: 13px;
      height: 13px;
      background-color: ${color};
    `}
  > svg {
    padding-top: 4px;
  }
`

const NavigateToPoiDetailLink = styled.div`
  position: relative;
  background: #ffffff;
  height: ${BUBBLE_HEIGHT}px;
  top: -${13 + BUBBLE_HEIGHT}px;
  left: calc(-50% + 1px);
  border-radius: 16px;
  line-height: ${BUBBLE_HEIGHT}px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  :after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: #ffffff00;
    border-top-color: #ffffff;
    border-width: 7px;
    margin-left: -7px;
  }

  a > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
    color: black;
  }
`

export function ScrapBubbleMarker({
  id: poiId,
  type: poiType,
  color,
  active,
  linkText,
  onClick,
  onBubbleClick,
  children,
}: PropsWithChildren<
  Omit<BubbleMarkerProps, 'onClick' | 'onBubbleClick'> & {
    onClick: MouseEventHandler<HTMLDivElement>
    onBubbleClick: MouseEventHandler<HTMLDivElement>
  }
>) {
  return (
    <>
      <NavigateToPoiDetailLink onClick={onClick}>
        <ExternalLink href={`/${poiType}s/${poiId}`} target="new" noNavbar>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <div>{linkText}</div>
          </a>
        </ExternalLink>
      </NavigateToPoiDetailLink>

      <BubbleMarkerContainer onClick={onBubbleClick} active={active}>
        <BubbleCircle color={color}>{children}</BubbleCircle>
      </BubbleMarkerContainer>
    </>
  )
}

export function SmallBubbleMarker({
  id: poiId,
  type: poiType,
  color,
  active,
  linkText,
  onClick,
  onBubbleClick,
  children,
}: PropsWithChildren<
  Omit<BubbleMarkerProps, 'onClick' | 'onBubbleClick'> & {
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
              <div>{linkText}</div>
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

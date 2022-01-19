import { OverlayViewProps } from '@react-google-maps/api'
import React from 'react'
import styled, { css } from 'styled-components'

import { MarkerBaseProps } from '../circle-marker/circle-marker-base'

export interface BubbleMarkerProps
  extends Pick<MarkerBaseProps, 'width' | 'height' | 'active' | 'zIndex'>,
    Omit<OverlayViewProps, 'mapPaneName'> {
  id: string
  type: string
  color?: string
  margin?: number
  bubbleText?: string | null
  onClick?: (e: React.SyntheticEvent) => void
  onBubbleClick?: (e: React.SyntheticEvent) => void
}

const BUBBLE_HEIGHT = 32

export const BubbleMarkerContainer = styled.div<
  Pick<BubbleMarkerProps, 'width' | 'height' | 'margin' | 'active'>
>`
  position: relative;
  ${({ width = 13, height = 13, margin = 3, active }) =>
    css`
      left: -${(width + margin) / 2}px;
      top: -${(height + margin) / 2 + (active ? BUBBLE_HEIGHT : 0)}px;
      width: ${width + margin * 2}px;
      height: ${height + margin * 2}px;
      pointer-events: ${active ? 'none' : 'auto'};
    `}
`

export const BubbleCircle = styled.div<
  Pick<BubbleMarkerProps, 'color' | 'width' | 'height' | 'margin'>
>`
  position: absolute;
  z-index: 1;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
  ${({ color = 'var(--color-purple)', width = 13, height = 13, margin = 3 }) =>
    css`
      left: ${margin}px;
      top: ${margin}px;
      width: ${width}px;
      height: ${height}px;
      background-color: ${color};
    `}
  > svg {
    padding-top: 4px;
  }
`

export const BubbleBox = styled.div<
  Pick<BubbleMarkerProps, 'width' | 'height' | 'margin'>
>`
  position: relative;
  background: #ffffff;
  height: ${BUBBLE_HEIGHT}px;
  ${({ height = 13 }) => css`
    top: -${height + BUBBLE_HEIGHT}px;
    left: calc(-50% + 1px);
  `}
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
`

export const BubbleText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
  color: black;
`

import React, { PropsWithChildren, MouseEventHandler } from 'react'
import styled from 'styled-components'
import * as CSS from 'csstype'

import { GlobalSizes, MarginPadding } from '../../commons'
import { marginMixin, safariStackingContextWorkaround } from '../../mixins'

import { useImageState } from './context'

const IMAGE_HEIGHT_OPTIONS: Partial<Record<GlobalSizes, string>> = {
  mini: '80px',
  small: '110px',
  medium: '200px',
  large: '400px',
}

const FixedDimensionsFrameContainer = styled.div<{
  size?: GlobalSizes
  width?: number
  height?: number
  borderRadius: number
  floated?: CSS.Property.Float
  margin?: MarginPadding
}>`
  background-color: #f5f5f5;
  overflow: hidden;

  font-size: 0;
  position: relative;

  width: ${({ width }) => (width && `${width}px`) || '100%'};
  height: ${({ height, size }) =>
    (height && `${height}px`) || (size ? IMAGE_HEIGHT_OPTIONS[size] : '')};

  ${({ borderRadius }) => `border-radius: ${borderRadius}px;`}

  float: ${({ floated }) => floated || 'none'};

  ${marginMixin}

  /**
   * overflow: hidden과 border-radius 사용 시 사파리에서 발생하는 버그를 위한  CSS 추가
   */
  ${safariStackingContextWorkaround}
`

export default function ImageFixedDimensionsFrame({
  size,
  width,
  height,
  floated,
  margin,
  onClick,
  children,
}: PropsWithChildren<{
  size?: GlobalSizes
  width?: number
  height?: number
  floated?: CSS.Property.Float
  margin?: MarginPadding
  onClick?: MouseEventHandler
}>) {
  const { borderRadius } = useImageState()

  return (
    <FixedDimensionsFrameContainer
      size={size}
      width={width}
      height={height}
      floated={floated}
      margin={margin}
      borderRadius={borderRadius}
      onClick={onClick}
    >
      {children}
    </FixedDimensionsFrameContainer>
  )
}

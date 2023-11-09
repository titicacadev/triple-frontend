import { PropsWithChildren, MouseEventHandler } from 'react'
import styled from 'styled-components'
import * as CSS from 'csstype'

import { GlobalSizes, MarginPadding } from '../../commons'
import { marginMixin, borderRadiusMixin } from '../../mixins'

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
  font-size: 0;
  position: relative;
  width: ${({ width }) => (width && `${width}px`) || '100%'};
  height: ${({ height, size }) =>
    (height && `${height}px`) || (size ? IMAGE_HEIGHT_OPTIONS[size] : '')};
  float: ${({ floated }) => floated || 'none'};

  ${marginMixin}
  ${borderRadiusMixin}
`

export function ImageFixedDimensionsFrame({
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

import React from 'react'
import styled from 'styled-components'

import { GlobalSizes } from '../../commons'
import ImageFrameBase from './image-frame-base'
import ImageContent from './image-content'
import { ImageProps } from './types'

export interface ImageFrameWithFixedDimensionsProps {
  height?: number
  size?: GlobalSizes
  width?: number
}

const IMAGE_HEIGHT_OPTIONS: Partial<Record<GlobalSizes, string>> = {
  mini: '80px',
  small: '110px',
  medium: '200px',
  large: '400px',
}

// eslint-disable-next-line no-unexpected-multiline
const ImageFrameWithFixedDimensions = styled(ImageFrameBase)<
  ImageFrameWithFixedDimensionsProps
>`
  height: ${({ height, size }) =>
    (height && `${height}px`) || (size ? IMAGE_HEIGHT_OPTIONS[size] : '')};
  width: ${({ width }) => (width && `${width}px`) || '100%'};
`

export default function FixedDimensionsImage({
  height,
  frame,
  size,
  width,
  onClick,
  floated,
  margin,
  borderRadius,
  asPlaceholder,
  src,
  sourceUrl,
  ImageSource,
  overlay,
  overlayPadding,
  overlayType,
  withLinkIndicator,
  alt,
}: ImageProps & ImageFrameWithFixedDimensionsProps) {
  return (
    <ImageFrameWithFixedDimensions
      size={size}
      onClick={onClick}
      floated={floated}
      width={width}
      height={height}
      margin={margin}
      borderRadius={borderRadius}
      asPlaceholder={asPlaceholder}
      src={src}
    >
      {asPlaceholder ? null : (
        <ImageContent
          imageUrl={src}
          borderRadius={borderRadius}
          sourceUrl={sourceUrl}
          ImageSource={ImageSource}
          overlay={overlay}
          overlayPadding={overlayPadding}
          overlayType={overlayType}
          withLinkIndicator={withLinkIndicator}
          frame={frame}
          alt={alt || ''}
        />
      )}
    </ImageFrameWithFixedDimensions>
  )
}

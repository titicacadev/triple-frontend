import React from 'react'
import styled from 'styled-components'

import { FrameRatioAndSizes, MEDIA_FRAME_OPTIONS } from '../../commons'
import { formatMarginPadding } from '../../mixins'
import ImageFrameBase from './image-frame-base'
import ImageContent from './image-content'
import { ImageProps } from './types'

const ImageFrameWithFixedRatio = styled(ImageFrameBase)<{
  frame?: FrameRatioAndSizes
}>`
  ${({ frame }) =>
    frame !== 'original' &&
    formatMarginPadding(
      { top: MEDIA_FRAME_OPTIONS[frame || 'small'] },
      'padding',
    )}
  width: 100%;
`

export default function FixedRatioImage({
  frame,
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
}: ImageProps) {
  return (
    <ImageFrameWithFixedRatio
      frame={frame}
      onClick={onClick}
      floated={floated}
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
    </ImageFrameWithFixedRatio>
  )
}

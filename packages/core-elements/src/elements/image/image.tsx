import React, { PropsWithChildren } from 'react'

import { ImageStateContextProvider } from './context'
import ImageImg from './img'
import ImageSourceUrl from './source-url'
import ImageOverlay from './overlay'
import ImageLinkIndicator from './link-indicator'
import ImageFixedRatioFrame from './fixed-ratio-frame'
import ImageFixedDimensionsFrame from './fixed-dimensions-frame'
import ImageCircular from './circular'
import ImagePlaceholder from './placeholder'

export default function Image({
  borderRadius,
  children,
}: PropsWithChildren<{
  borderRadius?: number
  // quality?: number
  // priority?: boolean
  // loading?: 'lazy' | 'eager'
  // unoptimized?: boolean
}>) {
  return (
    <ImageStateContextProvider borderRadius={borderRadius}>
      {children}
    </ImageStateContextProvider>
  )
}

Image.FixedRatioFrame = ImageFixedRatioFrame
Image.FixedDimensionsFrame = ImageFixedDimensionsFrame

Image.Img = ImageImg
Image.Placeholder = ImagePlaceholder

Image.SourceUrl = ImageSourceUrl
Image.Overlay = ImageOverlay
Image.LinkIndicator = ImageLinkIndicator

Image.Circular = ImageCircular

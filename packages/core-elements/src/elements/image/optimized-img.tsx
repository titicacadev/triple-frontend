import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import IntersectionObserver from '@titicaca/intersection-observer'
import { generateImageUrl, Version, Quality } from '@titicaca/content-utilities'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'

export interface OptimizedImgProps {
  placeholderSrc?: string
  mediaUrlBase?: string
  cloudinaryBucket?: string
  cloudinaryId: string
  version?: Version
  quality?: Quality
  format?: string
  loading?: 'lazy' | 'eager'
  deviceSizes?: number[]
}

const Img = styled.img<{
  borderRadius: number
  dimmed?: boolean
  absolute: boolean
}>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  object-fit: cover;
  opacity: ${({ dimmed }) => (dimmed ? 80 : 100)}%;

  ${({ absolute }) =>
    absolute &&
    `
    position: absolute;
    top: 0;
  `}
  z-index: 1;
`

export default function ImageOptimizedImg({
  mediaUrlBase = 'https://media.triple.guide',
  cloudinaryBucket = 'triple-cms',
  cloudinaryId,
  version = 'full',
  quality = 'original',
  format = 'jpeg',
  deviceSizes = [640, 768, 1024, 1080, 1280],
}: Omit<Parameters<typeof Img>[0], 'borderRadius' | 'dimmed' | 'absolute'> &
  OptimizedImgProps) {
  const { borderRadius, overlayMounted } = useImageState()

  const transformation = `${mediaUrlBase}/${cloudinaryBucket}/c_limit,f_auto,h_1024,w_1024/e_blur:1000,q_2/${cloudinaryId}.${format}`

  const [imgAttributes, setImgAttributes] = useState({
    src: transformation,
    srcSet: '',
    sizes: '',
  })

  const absolute = useContentAbsolute()

  const handleLazyLoad = useCallback(
    (event, unobserve) => {
      if (event.isIntersecting) {
        unobserve()
      }

      const srcSet = deviceSizes
        .sort((a, b) => a - b)
        .map(
          (width) =>
            `${generateImageUrl({
              mediaUrlBase,
              cloudinaryBucket,
              cloudinaryId,
              version,
              quality,
              format,
              width,
              height: width,
            })} ${width}w`,
        )
        .join(', ')

      setImgAttributes((prev) => ({
        ...prev,
        ...(event.isIntersecting && {
          src: generateImageUrl({
            mediaUrlBase,
            cloudinaryBucket,
            cloudinaryId,
            version,
            quality,
            format,
          }),
          srcSet,
          sizes: '100vw',
        }),
      }))
    },
    [
      cloudinaryBucket,
      cloudinaryId,
      deviceSizes,
      format,
      mediaUrlBase,
      quality,
      version,
    ],
  )

  return (
    <IntersectionObserver
      rootMargin="-100px"
      threshold={0.5}
      onChange={handleLazyLoad}
    >
      <Img
        {...imgAttributes}
        borderRadius={borderRadius}
        dimmed={overlayMounted}
        absolute={absolute}
        decoding="async"
      />
    </IntersectionObserver>
  )
}

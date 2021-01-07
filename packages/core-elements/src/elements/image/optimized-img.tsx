import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import IntersectionObserver from '@titicaca/intersection-observer'
import { generateImageUrl, Version, Quality } from '@titicaca/content-utilities'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'
import { Placeholder } from './placeholder'

interface OptimizedImgProps {
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
`

export default function ImageOptimizedImg({
  placeholderSrc = 'https://assets.triple.guide/images/ico-blank-see@3x.png',
  mediaUrlBase = 'https://media.triple.guide',
  cloudinaryBucket = 'triple-cms',
  cloudinaryId,
  version = 'full',
  quality = 'original',
  format = 'jpeg',
  loading = 'lazy',
  deviceSizes = [640, 768, 1024, 1080, 1280],
}: Omit<Parameters<typeof Img>[0], 'borderRadius' | 'dimmed' | 'absolute'> &
  OptimizedImgProps) {
  const { borderRadius, overlayMounted } = useImageState()

  const [isVisible, setIsVisible] = useState(false)
  const [imgAttributes, setImgAttributes] = useState({
    src: '',
    sizes: '100vw',
    srcset: '',
  })

  const absolute = useContentAbsolute()

  const url = generateImageUrl({
    mediaUrlBase,
    cloudinaryBucket,
    cloudinaryId,
    version,
    quality,
    format,
  })

  const srcset = deviceSizes
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
          width: width,
          height: width,
        })} ${width}w`,
    )
    .join(', ')

  const isLazy = loading === 'lazy' || typeof loading === 'undefined'

  const handleLazyLoad = useCallback(
    (event, unobserve) => {
      if (event.isIntersecting) {
        unobserve()
      }

      setIsVisible(!isLazy || event.isIntersecting)

      setImgAttributes((prev) => ({
        ...prev,
        src: url,
        srcset,
      }))
    },
    [isLazy, srcset, url],
  )

  return (
    <IntersectionObserver rootMargin="200px" onChange={handleLazyLoad}>
      {isVisible || !isLazy ? (
        <Img
          {...imgAttributes}
          borderRadius={borderRadius}
          dimmed={overlayMounted}
          absolute={absolute}
          decoding="async"
        />
      ) : (
        <Placeholder src={placeholderSrc} absolute={absolute} />
      )}
    </IntersectionObserver>
  )
}

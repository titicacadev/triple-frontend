import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import IntersectionObserver from '@titicaca/intersection-observer'
import { generateImageUrl } from '@titicaca/content-utilities'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'
import { Placeholder } from './placeholder'

type Version = 'full' | 'large' | 'smallSquare'
type Quality =
  | 'original'
  | 'size-optimized-v0'
  | 'quality-optimized-v0'
  | 'high-v0'
  | 'high-v1'
  | 'high-v2'

const deviceSizes = [640, 768, 1024, 1080, 1280]

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
  placeholderSrc = 'https://assets.triple.guide/images/ico-popup-gallery@4x.png',
  mediaUrlBase = 'https://media.triple.guide',
  cloudinaryBucket = 'triple-cms',
  cloudinaryId,
  version = 'large',
  quality = 'original',
  format = 'jpeg',
  loading = 'lazy',
}: Omit<Parameters<typeof Img>[0], 'borderRadius' | 'dimmed' | 'absolute'> & {
  placeholderSrc?: string
  mediaUrlBase?: string
  cloudinaryBucket?: string
  cloudinaryId: string
  version?: Version
  quality?: Quality
  format?: string
  loading?: 'lazy' | 'eager'
}) {
  const { borderRadius, overlayMounted } = useImageState()

  const [isVisible, setIsVisible] = useState(false)
  const [imgAttributes, setImgAttributes] = useState({
    src: '',
    sizes: '100vw',
    srcSet: '',
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
      }))
    },
    [isLazy, url],
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

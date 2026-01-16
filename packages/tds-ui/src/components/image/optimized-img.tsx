import { useCallback, useState } from 'react'
import { styled } from 'styled-components'
import { InView } from 'react-intersection-observer'
import { generateImageUrl, Version, Quality } from '@titicaca/content-utilities'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'
import { Placeholder } from './placeholder'

export interface OptimizedImgProps {
  mediaUrlBase?: string
  cloudinaryBucket?: string
  cloudinaryId: string
  version?: Version
  quality?: Quality
  format?: string
  deviceSizes?: number[]
  width?: number
  height?: number
  progressiveMode?: 'semi' | 'steep'
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
  z-index: 0;
`

export function ImageOptimizedImg({
  mediaUrlBase = 'https://media.triple.guide',
  cloudinaryBucket = 'triple-cms',
  cloudinaryId,
  version = 'full',
  quality = 'original',
  format = 'jpeg',
  deviceSizes = [640, 768, 1024, 1080, 1280],
  width = 1024,
  height = 1024,
  progressiveMode,
}: Omit<Parameters<typeof Img>[0], 'borderRadius' | 'dimmed' | 'absolute'> &
  OptimizedImgProps) {
  const { borderRadius, overlayMounted } = useImageState()

  const [isLoad, setIsLoad] = useState(false)
  const [imgAttributes, setImgAttributes] = useState<{
    src?: string
    srcSet?: string
    sizes?: string
  }>({
    src: generateImageUrl({
      mediaUrlBase,
      cloudinaryBucket,
      cloudinaryId,
      version,
      quality,
      format,
      width,
      height,
      ...(progressiveMode && { progressiveMode }),
    }),
  })

  const absolute = useContentAbsolute()

  const handleLazyLoad = useCallback(
    (inView: boolean) => {
      if (inView) {
        const srcSet = deviceSizes
          .sort((a, b) => a - b)
          .map(
            (deviceWidth) =>
              `${generateImageUrl({
                mediaUrlBase,
                cloudinaryBucket,
                cloudinaryId,
                version,
                quality,
                format,
                width: deviceWidth,
                height: deviceWidth,
              })} ${deviceWidth}w`,
          )
          .join(', ')

        setIsLoad(true)

        setImgAttributes((prev) => ({
          ...prev,
          srcSet,
          sizes: '100vw',
        }))
      }
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
    <InView rootMargin="200px" triggerOnce onChange={handleLazyLoad}>
      {!isLoad ? (
        <Placeholder absolute={absolute} />
      ) : (
        <Img
          {...imgAttributes}
          borderRadius={borderRadius}
          dimmed={overlayMounted}
          absolute={absolute}
        />
      )}
    </InView>
  )
}

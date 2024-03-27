import {
  FrameRatioAndSizes,
  GlobalSizes,
  ImageMeta,
} from '@titicaca/type-definitions'
import { MouseEvent, ReactNode } from 'react'
import { useFlickingCarousel } from '@titicaca/tds-ui'

import { ImageSource } from '../image-source'

import { ImageContent } from './image-content'
import { VideoContent } from './video-content'
import type { CarouselImageMeta } from './types'

interface Props {
  medium: ImageMeta
  optimized?: boolean
  height?: number
  globalSize?: GlobalSizes
  globalFrame?: FrameRatioAndSizes
  overlay?: ReactNode
  ImageSource?: typeof ImageSource
  onClick?: (e?: MouseEvent, image?: CarouselImageMeta) => void
}

export function Content({
  medium,
  optimized,
  height,
  globalSize,
  globalFrame,
  overlay,
  ImageSource,
  onClick,
}: Props) {
  const { flickingRef } = useFlickingCarousel()
  const isVideo = medium.type === 'video'

  const handleClick = (event?: MouseEvent, media?: CarouselImageMeta) => {
    !flickingRef.current?.isPlaying() && onClick?.(event, media)
  }

  if (isVideo) {
    return (
      <VideoContent
        medium={medium}
        height={height}
        globalSize={globalSize}
        globalFrame={globalFrame}
        overlay={overlay}
        onClick={(event) => handleClick(event, medium)}
      />
    )
  }

  return (
    <ImageContent
      medium={medium}
      optimized={optimized}
      height={height}
      globalSize={globalSize}
      globalFrame={globalFrame}
      overlay={overlay}
      ImageSource={ImageSource}
      onImageClick={(event) => handleClick(event, medium)}
    />
  )
}

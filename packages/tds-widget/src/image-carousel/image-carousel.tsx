import { MouseEvent, ReactNode, useRef } from 'react'
import { GlobalSizes, FrameRatioAndSizes } from '@titicaca/type-definitions'
import Flicking from '@egjs/react-flicking'

import { ImageSource } from '../image-source'

import Carousel, { CarouselProps } from './carousel'
import { CarouselImageMeta, RendererParams } from './types'
import { PageLabel } from './page-label'
import { Content } from './content'

interface ImageCarouselProps extends Omit<CarouselProps, 'pageLabelRenderer'> {
  images: CarouselImageMeta[]
  size?: GlobalSizes
  height?: number
  frame?: FrameRatioAndSizes
  ImageSource?: typeof ImageSource
  onImageClick?: (e?: MouseEvent, image?: CarouselImageMeta) => void
  showMoreRenderer?: (params: RendererParams) => ReactNode
  pageLabelRenderer?: (params: RendererParams) => ReactNode
  displayedTotalCount?: number
  optimized?: boolean
}

/**
 * [egjs-flicking](https://github.com/naver/egjs-flicking)을 기반으로 제작된 이미지 캐러셀입니다.
 */
export function ImageCarousel({
  images,
  size: globalSize,
  frame: globalFrame,
  height,
  ImageSource,
  onImageClick,
  showMoreRenderer,
  pageLabelRenderer = (props) => PageLabel(props),
  displayedTotalCount,
  optimized,
  margin,
  borderRadius,
  defaultIndex,
  onMoveStart,
  onMove,
  onMoveEnd,
}: ImageCarouselProps) {
  const flickingRef = useRef<Flicking>(null)

  const totalCount = displayedTotalCount ?? images.length

  const handleContentClick = (
    event?: MouseEvent,
    media?: CarouselImageMeta,
  ) => {
    !flickingRef.current?.isPlaying() && onImageClick?.(event, media)
  }

  return (
    <Carousel
      flickingRef={flickingRef}
      pageLabelRenderer={({ currentIndex }) =>
        pageLabelRenderer({ currentIndex, totalCount })
      }
      margin={margin}
      height={height}
      borderRadius={borderRadius}
      defaultIndex={defaultIndex}
      onMoveStart={onMoveStart}
      onMove={onMove}
      onMoveEnd={onMoveEnd}
    >
      {images.map((image, index) => {
        const overlay = showMoreRenderer
          ? showMoreRenderer({ currentIndex: index, totalCount })
          : null

        return (
          <Content
            key={image.id}
            flickingRef={flickingRef}
            medium={image}
            globalFrame={globalFrame}
            globalSize={globalSize}
            height={height}
            optimized={optimized}
            overlay={overlay}
            ImageSource={ImageSource}
            onClick={(event) => handleContentClick(event, image)}
          />
        )
      })}
    </Carousel>
  )
}

import { MouseEvent, ReactNode, useRef } from 'react'
import { ImageSourceType } from '@titicaca/core-elements'
import { GlobalSizes, FrameRatioAndSizes } from '@titicaca/type-definitions'
import Flicking from '@egjs/react-flicking'

import Carousel, { CarouselProps } from './carousel'
import { CarouselImageMeta, RendererParams } from './types'
import { PageLabel } from './page-label'
import Content from './content'

interface ImageCarouselProps extends Omit<CarouselProps, 'pageLabelRenderer'> {
  images: CarouselImageMeta[]
  size?: GlobalSizes
  height?: number
  frame?: FrameRatioAndSizes
  ImageSource?: ImageSourceType
  onImageClick?: (e?: MouseEvent, image?: CarouselImageMeta) => void
  showMoreRenderer?: (params: RendererParams) => ReactNode
  pageLabelRenderer?: (params: RendererParams) => ReactNode
  displayedTotalCount?: number
  optimized?: boolean
}

function ImageCarousel({
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
    flickingRef.current?.isPlaying() && onImageClick?.(event, media)
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
            medium={image}
            globalFrame={globalFrame}
            globalSize={globalSize}
            height={height}
            optimized={optimized}
            overlay={overlay}
            ImageSource={ImageSource}
            onClick={handleContentClick}
          />
        )
      })}
    </Carousel>
  )
}

export default ImageCarousel

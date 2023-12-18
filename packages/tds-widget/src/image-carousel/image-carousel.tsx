import { MouseEvent, ReactNode, useState } from 'react'
import { GlobalSizes, FrameRatioAndSizes } from '@titicaca/type-definitions'
import { FlickingCarousel } from '@titicaca/tds-ui'
import type { FlickingEvent, FlickingOptions } from '@egjs/flicking'

import { ImageSource } from '../image-source'

import { CarouselImageMeta, RendererParams } from './types'
import { PageLabel } from './page-label'
import Content from './content'

interface ImageCarouselBaseProps {
  images: CarouselImageMeta[]
  displayedTotalCount?: number
  currentPage?: number
  options: {
    size?: GlobalSizes
    height?: number
    frame?: FrameRatioAndSizes
    optimized?: boolean
  }
  onImageClick?: (e?: MouseEvent, image?: CarouselImageMeta) => void
}

interface ImageCarouselRendererProps {
  imageSourceRenderer?: typeof ImageSource
  showMoreRenderer?: (params: RendererParams) => ReactNode
  pageLabelRenderer?: (params: RendererParams) => ReactNode
}

interface FlickingEvents {
  onMoveStart?: (e: FlickingEvent) => void
  onMove?: (e: FlickingEvent) => void
  onMoveEnd?: (e: FlickingEvent) => void
  options?: Partial<FlickingOptions>
}

type ImageCarouselProps = ImageCarouselBaseProps &
  ImageCarouselRendererProps &
  FlickingEvents

const FLICKING_OPTIONS = {
  zIndex: 1,
  defaultIndex: 0,
  autoResize: true,
  horizontal: true,
  bounce: 0,
  duration: 100,
}

/**
 * [egjs-flicking](https://github.com/naver/egjs-flicking)을 기반으로 제작된 이미지 캐러셀입니다.
 */
function ImageCarousel({
  images,
  displayedTotalCount,
  currentPage,
  options: { size: globalSize, height, frame: globalFrame, optimized },
  showMoreRenderer,
  pageLabelRenderer = (props) => PageLabel(props),
  imageSourceRenderer = (props) => ImageSource(props),
  onImageClick,
  onMoveStart,
  onMove,
  onMoveEnd,
  ...cssProps
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(currentPage || 0)

  // check: https://github.com/titicacadev/triple-frontend/pull/213
  const totalCount = displayedTotalCount ?? images.length

  const handleMoveStart = (e: FlickingEvent) => {
    onMoveStart?.(e)
  }

  const handleMove = (e: FlickingEvent) => {
    onMove?.(e)
  }

  const handleMoveEnd = (e: FlickingEvent) => {
    setCurrentIndex(e.index)

    onMoveEnd?.(e)
  }

  const PageLabelElement = ({ currentIndex, totalCount }: RendererParams) =>
    pageLabelRenderer({ currentIndex, totalCount })

  return (
    <FlickingCarousel
      onMoveStart={handleMoveStart}
      onMove={handleMove}
      onMoveEnd={handleMoveEnd}
      options={FLICKING_OPTIONS}
      {...cssProps}
    >
      <FlickingCarousel.PageLabel
        labelElement={
          <PageLabelElement
            currentIndex={currentIndex}
            totalCount={totalCount}
          />
        }
      />
      <FlickingCarousel.Content>
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
              ImageSource={imageSourceRenderer}
              onClick={onImageClick}
            />
          )
        })}
      </FlickingCarousel.Content>
    </FlickingCarousel>
  )
}

export default ImageCarousel

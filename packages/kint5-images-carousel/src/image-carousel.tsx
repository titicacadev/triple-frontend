import { MouseEvent, forwardRef } from 'react'
import { Ratio } from '@titicaca/kint5-core-elements'
import { SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react'
import { ImageMeta } from '@titicaca/type-definitions'

import { Content } from './content'
import { Carousel } from './carousel'

interface ImageCarouselProps extends SwiperProps {
  className?: string
  images: ImageMeta[]
  frame?: Ratio
  displayedTotalCount?: number
  noPageLabel?: boolean
  onImageClick?: (e?: MouseEvent, image?: ImageMeta, index?: number) => void
}

export const ImageCarousel = forwardRef<SwiperRef, ImageCarouselProps>(
  function ImageCarouselImpl(
    {
      className,
      images,
      frame,
      displayedTotalCount,
      noPageLabel,
      onImageClick,
      ...props
    },
    forwardedRef,
  ) {
    const totalCount = displayedTotalCount ?? images.length

    return (
      <Carousel
        ref={forwardedRef}
        {...props}
        totalCount={totalCount}
        noPageLabel={noPageLabel}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <Content
              image={image}
              frame={frame}
              onClick={(event) => onImageClick?.(event, image, index)}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    )
  },
)

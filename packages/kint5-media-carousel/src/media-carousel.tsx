import { MouseEvent, forwardRef } from 'react'
import { Ratio } from '@titicaca/kint5-core-elements'
import { SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { Content } from './content'
import { Carousel } from './carousel'
import { MediumMeta } from './types'

type OnMediumClickFn = (args: {
  event?: MouseEvent
  medium?: MediumMeta
  index?: number
}) => void

interface MediaCarouselProps extends SwiperProps {
  className?: string
  media: MediumMeta[]
  frame?: Ratio
  displayedTotalCount?: number
  noPageLabel?: boolean
  onMediumClick?: OnMediumClickFn
}

export const MediaCarousel = forwardRef<SwiperRef, MediaCarouselProps>(
  function MediaCarouselImpl(
    {
      className,
      media,
      frame = '1:1',
      displayedTotalCount,
      noPageLabel,
      onMediumClick,
      ...props
    },
    forwardedRef,
  ) {
    const totalCount = displayedTotalCount ?? media.length

    return (
      <Carousel
        ref={forwardedRef}
        {...props}
        totalCount={totalCount}
        noPageLabel={noPageLabel}
      >
        {media.map((medium, index) => (
          <SwiperSlide key={medium.id}>
            <Content
              medium={medium}
              frame={frame}
              onClick={
                onMediumClick
                  ? (event) => onMediumClick({ event, medium, index })
                  : undefined
              }
            />
          </SwiperSlide>
        ))}
      </Carousel>
    )
  },
)

import styled from 'styled-components'
import { Swiper, SwiperProps, SwiperRef } from 'swiper/react'
import { forwardRef, useState } from 'react'

import { PageLabel } from './page-label'

export interface CarouselProps extends SwiperProps {
  totalCount: number
  noPageLabel?: boolean
}

const CarouselContainer = styled.div`
  position: relative;
`

const TopRightControl = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

export const Carousel = forwardRef<SwiperRef, CarouselProps>(
  function CarouselImpl(
    {
      children,
      totalCount,
      noPageLabel,
      initialSlide = 0,
      onSlideChange,
      ...props
    },
    forwardedRef,
  ) {
    const [currentIndex, setCurrentIndex] = useState<number>(initialSlide)

    const handleChanged: SwiperProps['onSlideChange'] = (swiper) => {
      onSlideChange?.(swiper)
      setCurrentIndex(swiper.activeIndex)
    }

    return (
      <CarouselContainer>
        <Swiper
          ref={forwardedRef}
          onSlideChange={handleChanged}
          initialSlide={initialSlide}
          {...props}
        >
          {children}
        </Swiper>

        {!noPageLabel ? (
          <TopRightControl>
            <PageLabel currentIndex={currentIndex} totalCount={totalCount} />
          </TopRightControl>
        ) : null}
      </CarouselContainer>
    )
  },
)

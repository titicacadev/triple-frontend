import { useImagesContext } from '@titicaca/react-contexts'

import CarouselSection, { CarouselSectionProps } from './carousel-section'

type ImageCarouselProps = Pick<
  CarouselSectionProps,
  | 'permanentlyClosed'
  | 'currentBusinessHours'
  | 'todayBusinessHours'
  | 'onBusinessHoursClick'
  | 'onImageClick'
  | 'onCtaClick'
  | 'onPlaceholderClick'
  | 'optimized'
  | 'borderRadius'
  | 'height'
  | 'guestMode'
>

export default function ImageCarousel(props: ImageCarouselProps) {
  const {
    images,
    loading,
    total,
    actions: { fetch },
  } = useImagesContext()

  return (
    <CarouselSection
      images={images}
      loading={loading}
      totalImagesCount={total}
      onImagesFetch={fetch}
      {...props}
    />
  )
}

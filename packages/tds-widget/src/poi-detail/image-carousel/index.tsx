import { usePoiDetailImages } from '../images-provider'

import { CarouselSectionProps, CarouselSection } from './carousel-section'

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
  | 'type'
>

export function PoiDetailImageCarousel(props: ImageCarouselProps) {
  const {
    images,
    loading,
    total,
    actions: { fetch },
  } = usePoiDetailImages()

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

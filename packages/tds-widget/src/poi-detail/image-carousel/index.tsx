import { CarouselSectionProps, CarouselSection } from './carousel-section'
import { usePoiDetailImageCarousel } from './provider'

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
  } = usePoiDetailImageCarousel()

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

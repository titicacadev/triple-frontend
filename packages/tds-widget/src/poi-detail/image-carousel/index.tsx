import CarouselSection, { CarouselSectionProps } from './carousel-section'
import { useImageCarousel } from './provider'

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
>

export default function ImageCarousel(props: ImageCarouselProps) {
  const {
    images,
    loading,
    total,
    actions: { fetch },
  } = useImageCarousel()

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

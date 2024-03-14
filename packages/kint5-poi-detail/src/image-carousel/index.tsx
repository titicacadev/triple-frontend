import CarouselSection, { CarouselSectionProps } from './carousel-section'

type ImageCarouselProps = Pick<
  CarouselSectionProps,
  | 'permanentlyClosed'
  | 'currentBusinessHours'
  | 'todayBusinessHours'
  | 'onBusinessHoursClick'
  | 'onPlaceholderClick'
  | 'optimized'
  | 'borderRadius'
  | 'height'
  | 'poiType'
  | 'noPageLabel'
  | 'images'
  | 'loading'
>

export default function ImageCarousel({
  images,
  loading,
  ...rest
}: ImageCarouselProps) {
  return (
    <CarouselSection
      images={images}
      loading={loading}
      totalImagesCount={images.length}
      onImagesFetch={() => {}}
      {...rest}
    />
  )
}

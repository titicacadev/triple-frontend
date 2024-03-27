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
  | 'noPageLabel'
  | 'images'
>

export default function ImageCarousel({ images, ...rest }: ImageCarouselProps) {
  return (
    <CarouselSection
      images={images}
      totalImagesCount={images.length}
      onImagesFetch={() => {}}
      {...rest}
    />
  )
}

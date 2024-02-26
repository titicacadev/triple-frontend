import { useImagesContext } from '@titicaca/react-contexts'

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
      totalImagesCount={
        loading && total === 0 ? -1 : Math.max(total, images.length)
      }
      onImagesFetch={fetch}
      {...props}
    />
  )
}

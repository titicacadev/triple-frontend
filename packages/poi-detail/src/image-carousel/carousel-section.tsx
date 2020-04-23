import React from 'react'
import { Section } from '@titicaca/core-elements'

import Carousel from './carousel'
import Placeholder from './placeholder'
import { BusinessHoursNote, PermanentlyClosedNote } from './note'

export default function CarouselSection({
  images,
  currentBusinessHours,
  todayBusinessHours,
  permanentlyClosed,
  onPlaceholderClick,
  onBusinessHoursClick,
  ...props
}: {
  currentBusinessHours?: string
  todayBusinessHours?: string
  permanentlyClosed?: boolean
  onBusinessHoursClick?: () => void
  onPlaceholderClick: () => void
} & Parameters<typeof Carousel>['0']) {
  return (
    <Section>
      {images.length > 0 ? (
        <Carousel images={images} {...props} />
      ) : (
        <Placeholder onClick={onPlaceholderClick} />
      )}
      {!permanentlyClosed && onBusinessHoursClick ? (
        <BusinessHoursNote
          currentBusinessHours={currentBusinessHours}
          todayBusinessHours={todayBusinessHours}
          onClick={onBusinessHoursClick}
        />
      ) : null}
      {permanentlyClosed ? <PermanentlyClosedNote /> : null}
    </Section>
  )
}

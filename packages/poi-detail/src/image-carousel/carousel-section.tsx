import React from 'react'
import { Section, MarginPadding } from '@titicaca/core-elements'

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
  margin,
  ...props
}: {
  currentBusinessHours?: string
  todayBusinessHours?: string
  permanentlyClosed?: boolean
  onBusinessHoursClick?: () => void
  onPlaceholderClick: () => void
  margin: MarginPadding
} & Parameters<typeof Carousel>['0']) {
  return (
    <Section
      minWidth={320}
      maxWidth={780}
      padding={{ left: 20, right: 20 }}
      margin={margin}
    >
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

import React from 'react'
import { Section, MarginPadding } from '@titicaca/core-elements'

import Carousel from './carousel'
import Placeholder from './placeholder'
import { BusinessHoursNote, PermanentlyClosedNote } from './note'

export default function CarouselSection({
  images,
  loading,
  currentBusinessHours,
  todayBusinessHours,
  permanentlyClosed,
  onPlaceholderClick,
  onBusinessHoursClick,
  margin,
  padding = { left: 20, right: 20 },
  borderRadius,
  ...props
}: {
  loading: boolean
  currentBusinessHours?:
    | string
    | { from: number; to: number; dayOfWeek: number }
  todayBusinessHours?: string
  permanentlyClosed?: boolean
  onBusinessHoursClick?: () => void
  onPlaceholderClick: () => void
  margin?: MarginPadding
  padding?: MarginPadding
  height?: number
} & Parameters<typeof Carousel>['0']) {
  return (
    <Section minWidth={320} maxWidth={768} padding={padding} margin={margin}>
      {images.length > 0 ? (
        <Carousel images={images} borderRadius={borderRadius} {...props} />
      ) : (
        <Placeholder onClick={onPlaceholderClick} noContent={loading} />
      )}
      {!permanentlyClosed && onBusinessHoursClick ? (
        <BusinessHoursNote
          bottomBorderRadius={borderRadius}
          currentBusinessHours={currentBusinessHours}
          todayBusinessHours={todayBusinessHours}
          onClick={onBusinessHoursClick}
        />
      ) : null}
      {permanentlyClosed ? (
        <PermanentlyClosedNote bottomBorderRadius={borderRadius} />
      ) : null}
    </Section>
  )
}

import { Section, Container } from '@titicaca/core-elements'
import { CSSProps } from '@titicaca/core-elements/lib/css'
import { css } from 'styled-components'

import Carousel, { CarouselProps } from './carousel'
import Placeholder from './placeholder'
import { BusinessHoursNote, PermanentlyClosedNote } from './note'

export interface CarouselSectionProps extends CarouselProps {
  loading: boolean
  currentBusinessHours?:
    | string
    | {
        from: number
        to: number
        dayOfWeek: number
      }
  todayBusinessHours?: string
  permanentlyClosed?: boolean
  onBusinessHoursClick?: () => void
  onPlaceholderClick: () => void
  height?: number
}

export default function CarouselSection({
  images,
  loading,
  currentBusinessHours,
  todayBusinessHours,
  permanentlyClosed,
  onPlaceholderClick,
  onBusinessHoursClick,
  borderRadius,
  css: cssProp,
  ...props
}: CarouselSectionProps & CSSProps) {
  return (
    <Section
      css={css(
        {
          minWidth: 320,
          maxWidth: 768,
          paddingLeft: 20,
          paddingRight: 20,
        },
        cssProp,
      )}
    >
      <Container position="relative">
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
      </Container>
    </Section>
  )
}

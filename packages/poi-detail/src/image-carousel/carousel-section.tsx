import { Section, Container } from '@titicaca/core-elements'

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
  /** true인 경우, 로그인이 필요한 일부 동작을 막고, 트리플앱으로 연결되는 루트를 차단합니다 */
  guestMode?: boolean
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
  guestMode,
  ...props
}: CarouselSectionProps) {
  return (
    <Section
      css={{
        minWidth: 320,
        maxWidth: 768,
        paddingLeft: 20,
        paddingRight: 20,
      }}
      {...props}
    >
      <Container position="relative">
        {images.length > 0 ? (
          <Carousel images={images} borderRadius={borderRadius} {...props} />
        ) : (
          <Placeholder
            onClick={onPlaceholderClick}
            noContent={loading}
            guestMode={guestMode}
          />
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

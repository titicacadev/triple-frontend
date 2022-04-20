import { Container, FlexBox, Text } from '@titicaca/core-elements'

import { TimeIcon, RightArrowIcon } from './business-hours-icons'

export default function BusinessHoursNote({
  currentBusinessHours,
  todayBusinessHours,
  onClick,
}: {
  currentBusinessHours?: null | { from: number; to: number; dayOfWeek: number }
  todayBusinessHours?: string
  onClick: () => void
}) {
  return (
    <>
      {currentBusinessHours ? null : (
        <Container margin={{ top: 5 }}>
          <FlexBox flex onClick={onClick} alignItems="center">
            <TimeIcon />

            <Text
              size={13}
              bold
              lineHeight="16px"
              color="red"
              margin={{ left: 4 }}
            >
              {todayBusinessHours
                ? `영업준비중 ${todayBusinessHours}`
                : '휴무일'}
            </Text>

            <RightArrowIcon />
          </FlexBox>
        </Container>
      )}
    </>
  )
}

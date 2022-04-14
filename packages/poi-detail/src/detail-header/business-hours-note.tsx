import { FlexBox, Text } from '@titicaca/core-elements'

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
    <FlexBox flex onClick={onClick} margin={{ top: 14 }} alignItems="center">
      <TimeIcon />

      <Text size={13} bold lineHeight="16px" color="red" margin={{ left: 4 }}>
        {currentBusinessHours
          ? `영업중 ${todayBusinessHours || ''}`
          : todayBusinessHours
          ? `영업준비중 ${todayBusinessHours}`
          : '휴무일'}
      </Text>

      <RightArrowIcon />
    </FlexBox>
  )
}

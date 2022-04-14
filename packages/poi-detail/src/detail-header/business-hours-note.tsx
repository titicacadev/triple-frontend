import { FlexBox, Text } from '@titicaca/core-elements'

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
    <FlexBox flex onClick={onClick} margin={{ top: 14 }}>
      {/* TODO : Alert Icon */}

      <Text size={13} bold lineHeight="16px" color="red">
        {currentBusinessHours
          ? `영업중 ${todayBusinessHours || ''}`
          : todayBusinessHours
          ? `영업준비중 ${todayBusinessHours}`
          : '휴무일'}
      </Text>

      {/* TODO : Right Arrow Icon */}
    </FlexBox>
  )
}

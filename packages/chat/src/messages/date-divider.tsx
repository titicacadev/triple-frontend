import { Text } from '@titicaca/core-elements'
import { format } from 'date-fns'

export function DateDivider({ date }: { date: Date }) {
  return (
    <Text textAlign="center" size={11} color="gray700" margin={{ top: 30 }}>
      {format(date, 'yyyy년 MM월 dd일')}
    </Text>
  )
}

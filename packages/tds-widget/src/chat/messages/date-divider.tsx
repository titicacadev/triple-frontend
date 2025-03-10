import { Text } from '@titicaca/tds-ui'
import { format } from 'date-fns'

export function DateDivider({ date, ...props }: { date: Date }) {
  return (
    <Text
      textAlign="center"
      size={11}
      color="gray700"
      margin={{ top: 30 }}
      {...props}
    >
      {format(date, 'yyyy년 MM월 dd일')}
    </Text>
  )
}

import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/tds-ui'

export function Comment({ children }: PropsWithChildren<unknown>) {
  return (
    <Text size="large" color="gray" lineHeight={1.5}>
      {children}
    </Text>
  )
}

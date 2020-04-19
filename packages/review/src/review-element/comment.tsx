import React, { PropsWithChildren } from 'react'
import { Text } from '@titicaca/core-elements'

export default function Comment({ children }: PropsWithChildren<{}>) {
  return (
    <Text size="large" color="gray" lineHeight={1.5}>
      {children}
    </Text>
  )
}

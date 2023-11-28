import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/kint5-core-elements'

export default function Comment({ children }: PropsWithChildren<unknown>) {
  return <Text css={{ fontSize: 16, lineHeight: 1.5 }}>{children}</Text>
}

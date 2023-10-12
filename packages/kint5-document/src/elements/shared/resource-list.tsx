import { PropsWithChildren } from 'react'
import { List } from '@titicaca/kint5-core-elements'

export default function ResourceList({ children }: PropsWithChildren<unknown>) {
  return <List margin={{ top: 20 }}>{children}</List>
}

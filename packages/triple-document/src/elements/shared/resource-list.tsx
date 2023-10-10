import { PropsWithChildren } from 'react'
import { List } from '@titicaca/tds-ui'

export default function ResourceList({ children }: PropsWithChildren<unknown>) {
  return <List margin={{ top: 20, left: 30, right: 30 }}>{children}</List>
}

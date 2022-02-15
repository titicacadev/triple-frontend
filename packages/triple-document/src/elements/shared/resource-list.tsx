import { List } from '@titicaca/core-elements'

export default function ResourceList({
  children,
}: React.PropsWithChildren<unknown>) {
  return <List margin={{ top: 20, left: 30, right: 30 }}>{children}</List>
}

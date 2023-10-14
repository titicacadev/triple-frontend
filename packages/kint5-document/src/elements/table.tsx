import {
  Container,
  ContainerProps,
  Table as TableView,
  TableProps,
} from '@titicaca/kint5-core-elements'

export default function Table({
  value: { table },
  ...props
}: {
  value: { table: TableProps }
} & ContainerProps) {
  return (
    <Container
      {...props}
      css={{
        margin: '20px 0',
      }}
    >
      <TableView {...table} />
    </Container>
  )
}

import {
  Container,
  ContainerProps,
  Table as TableView,
  TableProps,
} from '@titicaca/core-elements'

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
        margin: '20px 30px 20px 30px',
      }}
    >
      <TableView {...table} />
    </Container>
  )
}

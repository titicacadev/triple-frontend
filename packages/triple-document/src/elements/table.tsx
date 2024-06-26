import {
  Container,
  ContainerProps,
  Table as TableView,
  TableProps,
} from '@titicaca/tds-ui'

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
        margin: '20px 30px',
      }}
    >
      <TableView {...table} />
    </Container>
  )
}

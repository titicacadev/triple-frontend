import React from 'react'
import {
  Container,
  ContainerProps,
  Table as TableView,
  TableProps,
} from '@titicaca/core-elements'

export default function Table({
  value,
  ...props
}: {
  value: TableProps
} & ContainerProps) {
  return (
    <Container margin={{ top: 20, bottom: 20, left: 30, right: 30 }} {...props}>
      <TableView {...value} />
    </Container>
  )
}

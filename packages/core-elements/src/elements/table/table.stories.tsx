import SAMPLE from '../../mocks/table.sample.json'

import { Table, TableProps } from './table'

export default {
  title: 'core-elements / Table',
  component: Table,
}

export const Horizontal = () => {
  return <Table {...(SAMPLE[0].table as TableProps)} />
}
Horizontal.storyName = '가로 테이블'

export const Vertical = () => {
  return <Table {...(SAMPLE[0].table as TableProps)} />
}
Vertical.storyName = '세로 테이블'

import SAMPLE from '../../mocks/table.sample.json'

import { Table, TableProps } from './table'

export default {
  title: 'tds-ui / Table',
  component: Table,
}

export const Horizontal = {
  render: () => {
    return <Table {...(SAMPLE[0].table as TableProps)} />
  },

  name: '가로 테이블',
}

export const Vertical = {
  render: () => {
    return <Table {...(SAMPLE[0].table as TableProps)} />
  },

  name: '세로 테이블',
}

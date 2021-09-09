import React from 'react'
import { Table } from '@titicaca/core-elements'

import SAMPLE from '../__mocks__/table.sample.json'

export default {
  title: 'Core-Elements / Table',
  component: Table,
}

export const Horizontal = () => {
  return <Table {...SAMPLE[0].table} />
}
Horizontal.storyName = '가로 테이블'

export const Vertical = () => {
  return <Table {...SAMPLE[0].table} />
}
Vertical.storyName = '세로 테이블'

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Table } from '@titicaca/core-elements'
import SAMPLE from './table.sample.json'

storiesOf('Table', module)
  .add('가로 테이블', () => <Table {...SAMPLE[0]} />)
  .add('세로 테이블', () => <Table {...SAMPLE[1]} />)

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Table } from '@titicaca/core-elements'
import SAMPLE from '../__mocks__/table.sample.json'

storiesOf('Core-Elements | Table', module)
  .add('가로 테이블', () => <Table {...SAMPLE[0]} />)
  .add('세로 테이블', () => <Table {...SAMPLE[1]} />)

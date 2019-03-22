import React from 'react'

import { storiesOf } from '@storybook/react'

import { RangePicker } from '@titicaca/triple-design-system/elements/date-picker'

storiesOf('RangePicker', module)
  .add('일반', () => <RangePicker />)
  .add('선택됨', () => (
    <RangePicker
      from="2019-03-15"
      to="2019-06-15"
      startDate="2019-03-20"
      endDate="2019-04-15"
    />
  ))
  .add('선택불가', () => (
    <RangePicker
      from="2019-03-15"
      to="2019-06-15"
      blockedDates={['2019-03-20']}
    />
  ))

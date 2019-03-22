import React from 'react'

import { storiesOf } from '@storybook/react'

import { DayPicker } from '@titicaca/triple-design-system/elements/date-picker'

storiesOf('DayPicker', module)
  .add('일반', () => <DayPicker />)
  .add('선택됨', () => (
    <DayPicker from="2019-03-15" to="2019-06-15" date="2019-03-20" />
  ))
  .add('선택불가', () => (
    <DayPicker
      from="2019-03-15"
      to="2019-06-15"
      blockedDates={['2019-03-20']}
    />
  ))

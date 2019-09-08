import React from 'react'
import { storiesOf } from '@storybook/react'

import { DayPicker, RangePicker } from '@titicaca/date-picker'

const today = new Date()
const endDate = new Date()
const afterDate = new Date()
const specificDate = new Date()

endDate.setDate(today.getDate() + 5)
afterDate.setDate(today.getDate() + 20)
specificDate.setDate(today.getDate() + 3)

storiesOf('DayPicker', module)
  .add('DayPicker - 일반', () => <DayPicker />)
  .add('DayPicker - 선택됨', () => <DayPicker day={today.toString()} />)
  .add('DayPicker - 선택불가', () => (
    <DayPicker
      day={today.toString()}
      beforeBlock={today}
      afterBlock={afterDate}
      disabledDays={[specificDate.toString()]}
    />
  ))
  .add('RangePicker - 일반', () => <RangePicker />)
  .add('RangePicker - 선택됨', () => (
    <RangePicker startDate={today.toString()} endDate={endDate} />
  ))
  .add('RangePicker - 선택불가', () => (
    <RangePicker
      beforeBlock={today}
      afterBlock={afterDate}
      disabledDays={[specificDate.toString()]}
    />
  ))

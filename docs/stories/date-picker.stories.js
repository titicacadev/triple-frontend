import React from 'react'
import { storiesOf } from '@storybook/react'

import { DayPicker, RangePicker } from '@titicaca/date-picker'

const today = new Date()
const endDate = new Date()
const afterDate = new Date()
const specificDate = new Date()
const nowYearMonth = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
const publicHolidays = [
  new Date(`${nowYearMonth}-01`),
  new Date(`${nowYearMonth}-25`),
  new Date(`${nowYearMonth}-26`),
  new Date(`${nowYearMonth}-27`),
]

endDate.setDate(today.getDate() + 5)
afterDate.setDate(today.getDate() + 20)
specificDate.setDate(today.getDate() + 3)

storiesOf('DatePicker', module)
  .add('DayPicker - 일반', () => <DayPicker />)
  .add('DayPicker - 선택됨', () => <DayPicker day={today.toString()} />)
  .add('DayPicker - 선택불가', () => (
    <DayPicker
      day={today.toString()}
      beforeBlock={today}
      afterBlock={afterDate}
      disabledDays={[specificDate.toString()]}
      height="300px"
    />
  ))
  .add('DayPicker - 휴일', () => (
    <DayPicker
      publicHolidays={publicHolidays}
      day={today.toString()}
      beforeBlock={today}
      afterBlock={afterDate}
      disabledDays={[specificDate.toString()]}
      height="300px"
    />
  ))
  .add('RangePicker - 일반', () => <RangePicker />)
  .add('RangePicker - 선택됨', () => (
    <RangePicker startDate={today.toString()} endDate={endDate.toString()} />
  ))
  .add('RangePicker - 선택불가', () => (
    <RangePicker
      beforeBlock={today}
      afterBlock={afterDate}
      disabledDays={[specificDate.toString()]}
    />
  ))
  .add('RangePicker - 휴일', () => (
    <RangePicker
      publicHolidays={publicHolidays}
      beforeBlock={today}
      afterBlock={afterDate}
      disabledDays={[specificDate.toString()]}
    />
  ))

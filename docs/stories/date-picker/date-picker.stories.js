import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import {
  date,
  array,
  text,
  number,
  button,
  boolean,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { DayPicker, RangePicker } from '@titicaca/date-picker'

/**
 * 유효한 날짜인지 확인하는 함수
 */
function checkValidDate(date) {
  return new Date(date).toString() !== 'Invalid Date'
}

/**
 * ISO8601 날짜 포맷으로 되었는지 확인하는 함수
 */
function checkValidISODateFormat(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

/**
 * 한자리수 숫자를 0으로 채워 두자리로 만들어주는 함수
 */
function formatPaddedNumber(num) {
  if (num < 10) {
    return `0${num}`
  }
  return num.toString()
}

/**
 * YYYY-MM-DD 형식으로 포맷팅하는 함수
 */
function formatDate(date) {
  return `${date.getFullYear()}-${formatPaddedNumber(
    date.getMonth() + 1,
  )}-${formatPaddedNumber(date.getDate())}`
}

/**
 * prop에 undefined를 넣을 수 있게 해주는 react hook
 */
function useOptionalKnob({
  name,
  knob,
  initialVisibility,
  initialValue,
  extraKnobParams,
}) {
  return boolean(`${name} 활성화`, initialVisibility || false)
    ? knob(name, initialValue, ...(extraKnobParams || []))
    : undefined
}

const today = new Date()

const initialAfterBlock = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 20,
)

const initialDisabledDates = [new Date(), new Date()]
  .map((date, index) => date.setDate(date.getDate() + index + 1))
  .map((offset) => new Date(offset))
  .map(formatDate)

const initialHolidays = [
  new Date().setDate(1),
  new Date().setDate(12),
  new Date().setDate(25),
]
  .map((offset) => new Date(offset))
  .map((date) => formatDate(date))

storiesOf('date-picker | DatePicker', module)
  .add('DayPicker', () => {
    const [selectedDate, setSelectedDate] = useState(null)
    const beforeBlock = useOptionalKnob({
      name: 'beforeBlock',
      knob: date,
      initialValue: today,
    })
    const afterBlock = useOptionalKnob({
      name: 'afterBlock',
      knob: date,
      initialValue: initialAfterBlock,
    })
    const disabledDays = useOptionalKnob({
      name: 'disabledDays',
      knob: array,
      initialValue: initialDisabledDates,
      extraKnobParams: ['\n'],
    })

    button('날짜 선택 리셋', () => {
      setSelectedDate(null)
    })

    return (
      <DayPicker
        day={selectedDate}
        onDateChange={(date) => {
          action('날짜 선택')(date)
          setSelectedDate(date)
        }}
        beforeBlock={beforeBlock ? new Date(beforeBlock) : undefined}
        afterBlock={afterBlock ? new Date(afterBlock) : undefined}
        disabledDays={
          disabledDays
            ? disabledDays
                .filter(checkValidISODateFormat)
                .filter(checkValidDate)
            : undefined
        }
        height={text('높이', '300px')}
        publicHolidays={array('공휴일', initialHolidays, '\n')
          .filter(checkValidDate)
          .map((date) => new Date(date))}
        numberOfMonths={number('표시할 개월 수', 3)}
      />
    )
  })
  .add('RangePicker', () => {
    const [{ startDate, endDate }, setDateRange] = useState({
      startDate: null,
      endDate: null,
    })

    const beforeBlock = useOptionalKnob({
      name: 'beforeBlock',
      knob: date,
      initialValue: today,
    })
    const afterBlock = useOptionalKnob({
      name: 'afterBlock',
      knob: date,
      initialValue: initialAfterBlock,
    })
    const disabledDays = useOptionalKnob({
      name: 'disabledDays',
      knob: array,
      initialValue: initialDisabledDates,
      extraKnobParams: ['\n'],
    })

    button('날짜 선택 리셋', () => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
    })

    return (
      <RangePicker
        startDate={startDate}
        endDate={endDate}
        onDatesChange={({ startDate, endDate, nights }) => {
          action('날짜 선택')({ startDate, endDate, nights })
          setDateRange({ startDate, endDate })
        }}
        beforeBlock={beforeBlock ? new Date(beforeBlock) : undefined}
        afterBlock={afterBlock ? new Date(afterBlock) : undefined}
        disabledDays={
          disabledDays
            ? disabledDays
                .filter(checkValidISODateFormat)
                .filter(checkValidDate)
            : undefined
        }
        publicHolidays={array('공휴일', initialHolidays, '\n')
          .filter(checkValidDate)
          .map((date) => new Date(date))}
        numberOfMonths={number('표시할 개월 수', 3)}
        height={text('높이', '300px')}
        sameFromTo={boolean('sameFromTo 활성화')}
      />
    )
  })

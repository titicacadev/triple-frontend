import * as React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import DayPicker, { DayModifiers } from 'react-day-picker'

import 'moment/locale/ko'
import MomentLocaleUtils from 'react-day-picker/moment'
import { GetGlobalColor } from '@titicaca/core-elements'
import { formatMonthTitle } from './utils'

import PickerFrame from './picker-frame'

const DayContainer = styled.div<{ height?: string }>`
  .DayPicker {
    height: ${({ height }) => height || '300px'};
  }

  .DayPicker-Month {
    padding: 40px 0 0 0;
  }
  .DayPicker-Day--today:before {
    top: 30px;
    left: 0px;
  }
  .DayPicker-Day--selected {
    z-index: 0;
    color: rgb(${GetGlobalColor('white')}) !important;
  }
  .DayPicker-Day--selected:after {
    z-index: -1;
    display: block;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(${GetGlobalColor('blue')});
    content: '';
    border-radius: 100%;
  }
  .DayPicker-Day--sunday:before {
    padding-left: 6px;
  }
  .DayPicker-Day--saturday:before {
    box-sizing: border-box;
    padding-right: 9px;
  }
  .DayPicker-Day--selected.DayPicker-Day--sunday:before,
  .DayPicker-Day--selected.DayPicker-Day--sunday:after {
    padding-left: 0px;
    left: calc(50%);
    transform: translate(calc(-50% + 5px), -50%);
  }
  .DayPicker-Day--selected.DayPicker-Day--saturday:before,
  .DayPicker-Day--selected.DayPicker-Day--saturday:after {
    padding-right: 0px;
    left: calc(50%);
    transform: translate(calc(-50% - 5px), -50%);
  }
`

function DatePicker({
  day,
  beforeBlock,
  afterBlock,
  numberOfMonths = 3,
  onDateChange,
  disabledDays = [],
  height,
}: {
  day: string
  beforeBlock: Date
  afterBlock: Date
  numberOfMonths: number
  onDateChange: Function
  disabledDays?: string[]
  height?: string
}) {
  const selectedDay = day && moment(day).toDate()

  return (
    <PickerFrame>
      <DayContainer height={height}>
        <DayPicker
          locale="ko"
          weekdaysShort={['일', '월', '화', '수', '목', '금', '토']}
          localeUtils={{ ...MomentLocaleUtils, formatMonthTitle }}
          selectedDays={selectedDay}
          onDayClick={(day: Date, modifiers: DayModifiers): void => {
            if (modifiers.disabled) {
              return
            }
            onDateChange(day)
          }}
          numberOfMonths={numberOfMonths}
          modifiers={{
            sunday: (day) => day.getDay() === 0,
            saturday: (day) => day.getDay() === 6,
          }}
          disabledDays={[
            ...(disabledDays.length > 0
              ? disabledDays.map((date) => moment(date).toDate())
              : []),
            {
              before: beforeBlock,
              after: afterBlock,
            },
          ]}
        />
      </DayContainer>
    </PickerFrame>
  )
}

export default DatePicker

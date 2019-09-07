import * as React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import DayPicker, { DayModifiers } from 'react-day-picker'

import 'moment/locale/ko'
import MomentLocaleUtils from 'react-day-picker/moment'
import { GetGlobalColor } from '@titicaca/triple-design-system'
import { formatMonthTitle } from './utils'

import PickerFrame from './picker-frame'

const DayContainer = styled.div`
  border: 1px solid rgba(${GetGlobalColor('gray')}, 0.1);
  .DayPicker {
    height: 256px;
  }
  .DayPicker-Month {
    padding: 40px 0 0 0;
    border-spacing: 0 15px;
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
    left: calc(50%);
    transform: translate(calc(-50% + 5px), -50%);
  }
  .DayPicker-Day--selected.DayPicker-Day--saturday:before,
  .DayPicker-Day--selected.DayPicker-Day--saturday:after {
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
}: {
  day: string
  beforeBlock: Date
  afterBlock: Date
  numberOfMonths: number
  onDateChange: Function
  disabledDays: Array<string>
}) {
  const selectedDay = day && moment(day).toDate()

  return (
    <PickerFrame>
      <DayContainer>
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

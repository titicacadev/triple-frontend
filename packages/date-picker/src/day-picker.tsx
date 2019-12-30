import * as React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import DayPicker, {
  DayModifiers,
  BeforeModifier,
  AfterModifier,
} from 'react-day-picker'

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
  publicHolidays,
}: {
  day: string | null
  onDateChange: (date: Date) => void
  beforeBlock?: Date
  afterBlock?: Date
  numberOfMonths?: number
  disabledDays?: string[]
  height?: string
  publicHolidays?: Date[]
}) {
  const selectedDay = day ? moment(day).toDate() : null

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
            publicHolidays,
            sunday: (day) => day.getDay() === 0,
            saturday: (day) => day.getDay() === 6,
          }}
          disabledDays={[
            ...disabledDays.map((date) => moment(date).toDate()),
            beforeBlock || afterBlock
              ? ({
                  before: beforeBlock,
                  after: afterBlock,
                } as BeforeModifier | AfterModifier) // HACK: before, after 중 하나만 존재할 때 undefiend 속성값을 허용하지 않아 타입 체크를 우회.
              : undefined,
          ]}
        />
      </DayContainer>
    </PickerFrame>
  )
}

export default DatePicker

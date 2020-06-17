import * as React from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import styled from 'styled-components'
import DayPicker, {
  DayModifiers,
  BeforeModifier,
  AfterModifier,
  Modifiers,
} from 'react-day-picker'
import { getColor } from '@titicaca/color-palette'

import PickerFrame from './picker-frame'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from './constants'

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
    color: rgba(${getColor('white')}) !important;
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
    background-color: rgba(${getColor('blue')});
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
  disabledDays: disabledDaysFromProps,
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
  const selectedDay = React.useMemo(
    () => (day ? moment(day).toDate() : undefined),
    [day],
  )
  const modifiers: Partial<Modifiers> = React.useMemo(
    () => ({
      publicHolidays,
      sunday: (day) => day.getDay() === 0,
      saturday: (day) => day.getDay() === 6,
    }),
    [publicHolidays],
  )
  const disabledDays = React.useMemo(
    () => [
      ...(disabledDaysFromProps || []).map((date) => moment(date).toDate()),
      beforeBlock || afterBlock
        ? ({
            before: beforeBlock,
            after: afterBlock,
          } as BeforeModifier | AfterModifier) // HACK: before, after 중 하나만 존재할 때 undefiend 속성값을 허용하지 않아 타입 체크를 우회.
        : undefined,
    ],
    [afterBlock, beforeBlock, disabledDaysFromProps],
  )

  const handleDayClick = React.useCallback(
    (day: Date, modifiers: DayModifiers): void => {
      if (modifiers.disabled) {
        return
      }
      onDateChange(day)
    },
    [onDateChange],
  )

  return (
    <PickerFrame>
      <DayContainer height={height}>
        <DayPicker
          locale={LOCALE}
          weekdaysShort={WEEKDAY_SHORT_LABEL}
          localeUtils={LOCALE_UTILS}
          selectedDays={selectedDay}
          onDayClick={handleDayClick}
          numberOfMonths={numberOfMonths}
          modifiers={modifiers}
          disabledDays={disabledDays}
        />
      </DayContainer>
    </PickerFrame>
  )
}

export default DatePicker

import * as React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import DayPicker, {
  DayModifiers,
  BeforeModifier,
  AfterModifier,
  Modifiers,
} from 'react-day-picker'

import PickerFrame, { generateSelectedCircleStyle } from './picker-frame'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from './constants'

const MemoDayPicker = React.memo(DayPicker)

const DayContainer = styled(PickerFrame)`
  ${generateSelectedCircleStyle('.DayPicker-Day--selected')}
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
    <DayContainer
      height={height || '300px'}
      sideSpacing={10}
      monthPadding="40px 0 0 0"
    >
      <MemoDayPicker
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
  )
}

export default DatePicker

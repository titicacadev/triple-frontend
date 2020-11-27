import * as React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import DayPicker, { DayModifiers, Modifiers } from 'react-day-picker'

import PickerFrame, { generateSelectedCircleStyle } from './picker-frame'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from './constants'
import useDisabledDays, { DislableDaysProps } from './use-disabled-days'
import { usePublicHolidays } from './use-public-holidays'

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
}: DislableDaysProps & {
  day: string | null
  onDateChange: (date: Date) => void
  numberOfMonths?: number
  height?: string
  publicHolidays?: Date[]
}) {
  const disabledDays = useDisabledDays({
    disabledDays: disabledDaysFromProps,
    beforeBlock,
    afterBlock,
  })

  const updatePublicHolidays = usePublicHolidays({
    numberOfMonths,
  })

  const selectedDay = React.useMemo(
    () => (day ? moment(day).toDate() : undefined),
    [day],
  )
  const modifiers: Partial<Modifiers> = React.useMemo(
    () => ({
      publicHolidays: publicHolidays || updatePublicHolidays,
      sunday: (day) => day.getDay() === 0,
      saturday: (day) => day.getDay() === 6,
    }),
    [publicHolidays, updatePublicHolidays],
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

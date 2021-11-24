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

const DateContainer = styled.div`
  position: relative;
`

const ContentContainer = styled.div`
  position: absolute;
  top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
`

function DatePicker({
  day,
  beforeBlock,
  afterBlock,
  numberOfMonths = 3,
  onDateChange,
  disabledDays: disabledDaysFromProps,
  height,
  publicHolidays: publicHolidaysFromProps,
  hideTodayLabel = false,
  canChangeMonth = false,
  renderDays,
}: DislableDaysProps & {
  day: string | null
  onDateChange: (date: Date) => void
  renderDays?: Record<string, React.ReactNode>
  numberOfMonths?: number
  hideTodayLabel?: boolean
  height?: string
  canChangeMonth?: boolean
  /**
   * @deprecated TF에서 공휴일을 Fetch하고 있습니다.
   */
  publicHolidays?: Date[]
}) {
  const disabledDays = useDisabledDays({
    disabledDays: disabledDaysFromProps,
    beforeBlock,
    afterBlock,
  })

  const publicHolidays = usePublicHolidays({
    numberOfMonths,
  })

  const selectedDay = React.useMemo(
    () => (day ? moment(day).toDate() : undefined),
    [day],
  )
  const modifiers: Partial<Modifiers> = React.useMemo(
    () => ({
      publicHolidays: publicHolidaysFromProps || publicHolidays,
      sunday: (day) => day.getDay() === 0,
      saturday: (day) => day.getDay() === 6,
    }),
    [publicHolidaysFromProps, publicHolidays],
  )

  const renderDay = React.useCallback(
    (day: Date, _: DayModifiers) => {
      const convertedDay = day.getDate()
      const date = day.toISOString().split('T')[0]
      return (
        <DateContainer>
          <div>{convertedDay}</div>
          {renderDays?.[date] && (
            <ContentContainer>{renderDays?.[date]}</ContentContainer>
          )}
        </DateContainer>
      )
    },
    [renderDays],
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
      hideTodayLabel={hideTodayLabel}
      canChangeMonth={canChangeMonth}
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
        canChangeMonth={canChangeMonth}
        renderDay={renderDay}
      />
    </DayContainer>
  )
}

export default DatePicker

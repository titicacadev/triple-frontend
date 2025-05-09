import moment from 'moment'
import { styled } from 'styled-components'
import ReactDayPicker, { DayModifiers, Modifiers } from 'react-day-picker'
import { memo, ReactNode, useMemo, useCallback } from 'react'

import { PickerFrame, generateSelectedCircleStyle } from './picker-frame'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from './constants'
import useDisabledDays, { DisableDaysProps } from './use-disabled-days'
import { usePublicHolidays } from './use-public-holidays'

const MemoDayPicker = memo(ReactDayPicker)

const DayContainer = styled(PickerFrame)`
  ${generateSelectedCircleStyle('.DayPicker-Day--selected')}
`

const DateContainer = styled.div`
  position: relative;
`

const DayInfoContainer = styled.div`
  position: absolute;
  top: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
`

export function DayPicker({
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
  renderDayInfo,
  fromMonth,
  toMonth,
}: DisableDaysProps & {
  day: string | null
  onDateChange: (date: Date) => void
  renderDayInfo?: Record<string, ReactNode>
  numberOfMonths?: number
  hideTodayLabel?: boolean
  height?: string
  canChangeMonth?: boolean
  fromMonth?: string
  toMonth?: string
  /**
   * @deprecated TF에서 공휴일을 Fetch하고 있습니다.
   */
  publicHolidays?: Date[]
}) {
  const hasRangeMonth = fromMonth && toMonth
  const diffRangeMonth = moment(toMonth).diff(moment(fromMonth), 'months', true)
  const hasRangeMonthDiff = Math.ceil(diffRangeMonth) > 1

  const disabledDays = useDisabledDays({
    disabledDays: disabledDaysFromProps,
    beforeBlock,
    afterBlock,
  })

  const publicHolidays = usePublicHolidays({
    numberOfMonths,
  })

  const selectedDay = useMemo(
    () => (day ? moment(day).toDate() : undefined),
    [day],
  )

  const formattedFromMonth = useMemo(
    () => (fromMonth ? moment(fromMonth).toDate() : undefined),
    [fromMonth],
  )

  const formattedToMonth = useMemo(
    () =>
      toMonth
        ? hasRangeMonthDiff
          ? moment(toMonth).toDate()
          : moment(toMonth).add(1, 'month').toDate()
        : undefined,
    [hasRangeMonthDiff, toMonth],
  )

  const modifiers: Partial<Modifiers> = useMemo(
    () => ({
      publicHolidays: publicHolidaysFromProps || publicHolidays,
      sunday: (day) => day.getDay() === 0,
      saturday: (day) => day.getDay() === 6,
    }),
    [publicHolidaysFromProps, publicHolidays],
  )

  const renderDay = useCallback(
    (day: Date, _: DayModifiers) => {
      const convertedDay = day.getDate()
      const date = day.toISOString().split('T')[0]
      return (
        <DateContainer>
          <div>{convertedDay}</div>
          {renderDayInfo?.[date] && (
            <DayInfoContainer>{renderDayInfo?.[date]}</DayInfoContainer>
          )}
        </DateContainer>
      )
    },
    [renderDayInfo],
  )

  const handleDayClick = useCallback(
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
      $height={height || '300px'}
      $sideSpacing={10}
      $monthPadding="40px 0 0 0"
      $hideTodayLabel={hideTodayLabel}
      $canChangeMonth={canChangeMonth}
    >
      <MemoDayPicker
        locale={LOCALE}
        weekdaysShort={WEEKDAY_SHORT_LABEL}
        localeUtils={LOCALE_UTILS}
        selectedDays={selectedDay}
        onDayClick={handleDayClick}
        numberOfMonths={
          hasRangeMonth
            ? hasRangeMonthDiff
              ? diffRangeMonth + 1
              : 1
            : numberOfMonths
        }
        modifiers={modifiers}
        disabledDays={disabledDays}
        canChangeMonth={canChangeMonth}
        month={hasRangeMonth ? formattedFromMonth : undefined}
        fromMonth={formattedFromMonth}
        toMonth={formattedToMonth}
        renderDay={renderDay}
      />
    </DayContainer>
  )
}

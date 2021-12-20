import * as React from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import DayPicker, { DayModifiers, Modifiers } from 'react-day-picker'

import { isValidDate, generatePaddedRange } from './utils'
import PickerFrame, {
  generateSelectedStyle,
  rangeStyle,
  generateDateLabelStyle,
  SelectorStyle,
} from './picker-frame'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from './constants'
import useDisabledDays, { DislableDaysProps } from './use-disabled-days'
import { usePublicHolidays } from './use-public-holidays'

const MemoDayPicker = React.memo(DayPicker)

const RangeContainer = styled(PickerFrame)<{
  selectedAll: boolean
  enableSameDay?: boolean
  startDateLabel?: string
  endDateLabel?: string
  sameDateLabel?: string
  selectorStyle?: SelectorStyle
}>`
  ${({ selectorStyle }) => css`
    ${generateSelectedStyle({
      selector: '.DayPicker-Day--from,.DayPicker-Day--to',
      selectorStyle,
    })}
  `}

  ${({ selectedAll, startDateLabel, endDateLabel, sameDateLabel }) =>
    selectedAll &&
    css`
      ${rangeStyle}

      ${startDateLabel &&
      generateDateLabelStyle('.DayPicker-Day--from', startDateLabel)}

      ${endDateLabel &&
      generateDateLabelStyle('.DayPicker-Day--to', endDateLabel)}

      ${sameDateLabel &&
      generateDateLabelStyle(
        '.DayPicker-Day--from.DayPicker-Day--to',
        sameDateLabel,
      )}
    `}
`

function getInitialMonth() {
  return moment().startOf('day').toDate()
}

function RangePicker({
  startDate,
  endDate,
  startDateLabel,
  endDateLabel,
  sameDateLabel,
  onDatesChange,
  numberOfMonths = 25,
  disabledDays: disabledDaysFromProps,
  beforeBlock,
  afterBlock,
  height,
  publicHolidays: publicHolidaysFromProps,
  enableSameDay,
  hideTodayLabel = false,
  selectorStyle,
}: DislableDaysProps & {
  startDate: string | null
  endDate: string | null
  startDateLabel?: string
  endDateLabel?: string
  sameDateLabel?: string
  hideTodayLabel?: boolean
  onDatesChange: (params: {
    startDate: string | null
    endDate: string | null
    nights: number
  }) => void
  numberOfMonths?: number
  height?: string
  /**
   * @deprecated TF에서 공휴일을 Fetch하고 있습니다.
   */
  publicHolidays?: Date[]
  enableSameDay?: boolean
  selectorStyle?: SelectorStyle
}) {
  const disabledDays = useDisabledDays({
    disabledDays: disabledDaysFromProps,
    beforeBlock,
    afterBlock,
  })

  const publicHolidays = usePublicHolidays({
    numberOfMonths,
  })

  const initialMonth = React.useMemo(getInitialMonth, [])

  const from = React.useMemo(
    () => (startDate ? moment(startDate).toDate() : undefined),
    [startDate],
  )
  const to = React.useMemo(
    () => (endDate ? moment(endDate).toDate() : undefined),
    [endDate],
  )
  const selectedDays = React.useMemo(
    () =>
      [from, from && to ? { from, to } : undefined].filter(
        (day): day is Date | { from: Date; to: Date } => !!day,
      ),
    [from, to],
  )
  const modifiers: Partial<Modifiers> = React.useMemo(
    () => ({
      publicHolidays: publicHolidaysFromProps || publicHolidays,
      sunday: (day) => day.getDay() === 0,
      saturday: (day) => day.getDay() === 6,
      from,
      to,
      'included-range': from && to ? generatePaddedRange(from, to) : [],
    }),
    [from, publicHolidaysFromProps, to, publicHolidays],
  )

  const handleDayClick = React.useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.disabled) {
        return
      }

      const { from: nextFrom, to: nextTo } = DayPicker.DateUtils.addDayToRange(
        day,
        {
          // HACK: 코드는 falsy값을 처리할 수 있게되어있지만, 타입 정의가 잘못되어있음
          from: from as any,
          to: to as any,
        },
      )

      if (
        !enableSameDay &&
        nextFrom &&
        nextTo &&
        moment(nextFrom).startOf('day').isSame(moment(nextTo).startOf('day'))
      ) {
        return
      }

      if (!isValidDate(nextTo) || (from && to)) {
        onDatesChange({
          startDate: moment(day).format('YYYY-MM-DD'),
          endDate: null,
          nights: 0,
        })
        return
      }

      onDatesChange({
        startDate: nextFrom ? moment(nextFrom).format('YYYY-MM-DD') : null,
        endDate: nextTo ? moment(nextTo).format('YYYY-MM-DD') : null,
        nights: nextTo && nextFrom ? moment(nextTo).diff(nextFrom, 'days') : 0,
      })
    },
    [enableSameDay, from, onDatesChange, to],
  )

  return (
    <RangeContainer
      height={height || '395px'}
      sideSpacing={6}
      monthPadding="32px 0 30px 0"
      selectedAll={!!(startDate && endDate)}
      enableSameDay={enableSameDay}
      startDateLabel={startDateLabel}
      endDateLabel={endDateLabel}
      sameDateLabel={sameDateLabel}
      hideTodayLabel={hideTodayLabel}
      selectorStyle={selectorStyle}
    >
      <MemoDayPicker
        locale={LOCALE}
        weekdaysShort={WEEKDAY_SHORT_LABEL}
        localeUtils={LOCALE_UTILS}
        initialMonth={initialMonth}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
        numberOfMonths={numberOfMonths}
        modifiers={modifiers}
        disabledDays={disabledDays}
      />
    </RangeContainer>
  )
}

export default RangePicker

import * as React from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import DayPicker, { DayModifiers, Modifiers } from 'react-day-picker'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { usePublicHolidays } from '../use-public-holidays'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from '../constants'
import useDisabledDays, { DislableDaysProps } from '../use-disabled-days'
import {
  isValidDate,
  formatMonthTitle,
  generatePaddedRange,
  generateRangeStyle,
  generateDateLabelStyle,
} from '../utils'

import PickerFrame, { generateSelectedStyle } from './picker-frame'

const MemoDayPicker = React.memo(DayPicker)

const RangeContainer = styled(PickerFrame)<{
  selectedAll: boolean
  enableSameDay?: boolean
  startDateLabel?: string
  endDateLabel?: string
  sameDateLabel?: string
}>`
  ${({ selectedAll, startDateLabel, endDateLabel }) => css`
    ${generateSelectedStyle({ selectedAll })}

    ${selectedAll && generateRangeStyle()}


    ${startDateLabel &&
    generateDateLabelStyle({
      selector: '.DayPicker-Day--from',
      label: startDateLabel,
      fontSize: '10px',
      color: 'var(---color-white)',
      fontWeight: 500,
    })}

      ${endDateLabel &&
    generateDateLabelStyle({
      selector: '.DayPicker-Day--to',
      label: endDateLabel,
      fontSize: '10px',
      color: 'var(---color-white)',
      fontWeight: 500,
    })}
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
  enableSameDay,
  hideTodayLabel = false,
  renderDay,
  onMonthIntersect,
  threshold,
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
  enableSameDay?: boolean
  renderDay?: (date: Date, modifiers?: DayModifiers) => React.ReactNode
  threshold?: number
  onMonthIntersect?: (date: Date) => void
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
      publicHolidays,
      sunday: (day) => day.getDay() === 0,
      saturday: (day) => day.getDay() === 6,
      from,
      to,
      'included-range': from && to ? generatePaddedRange(from, to) : [],
    }),
    [from, to, publicHolidays],
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
        renderDay={renderDay}
        captionElement={({ date, locale }) => (
          <StaticIntersectionObserver
            threshold={threshold}
            onChange={({ isIntersecting }) =>
              isIntersecting && onMonthIntersect && onMonthIntersect(date)
            }
          >
            <div
              className="DayPicker-Caption"
              role="heading"
              aria-live="polite"
            >
              {formatMonthTitle(date, locale)}
            </div>
          </StaticIntersectionObserver>
        )}
      />
    </RangeContainer>
  )
}

export default RangePicker

import moment from 'moment'
import { styled, css } from 'styled-components'
import DayPicker, { DayModifiers, Modifiers } from 'react-day-picker'
import { memo, ReactElement, ReactNode, useCallback, useMemo } from 'react'

import { usePublicHolidays } from '../use-public-holidays'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from '../constants'
import useDisabledDays, { DisableDaysProps } from '../use-disabled-days'
import { isValidDate, generatePaddedRange } from '../utils'
import { rangeMixin, dateLabelMixin } from '../mixins'

import { PickerFrameV2, generateSelectedStyle } from './picker-frame'

const MemoDayPicker = memo(DayPicker)

const RangeContainer = styled(PickerFrameV2)<{
  $selectedAll: boolean
  $enableSameDay?: boolean
  $startDateLabel?: string
  $endDateLabel?: string
  $sameDateLabel?: string
}>`
  ${({ $selectedAll, $startDateLabel, $endDateLabel }) => css`
    ${generateSelectedStyle({ selectedAll: $selectedAll })}

    ${$selectedAll && rangeMixin({})}

    ${$startDateLabel &&
    dateLabelMixin({
      selector: '.DayPicker-Day--from',
      label: $startDateLabel,
      fontSize: '10px',
      color: 'var(---color-white)',
      fontWeight: 500,
    })}

      ${$endDateLabel &&
    dateLabelMixin({
      selector: '.DayPicker-Day--to',
      label: $endDateLabel,
      fontSize: '10px',
      color: 'var(---color-white)',
      fontWeight: 500,
    })}
  `}
`

function getInitialMonth() {
  return moment().startOf('day').toDate()
}

export function RangePickerV2({
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
  renderCaptionElement,
  publicHolidays: publicHolidaysFromProps,
}: DisableDaysProps & {
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
  publicHolidays?: Date[]
  renderDay?: (date: Date, modifiers?: DayModifiers) => ReactNode
  renderCaptionElement?: ({
    date,
    locale,
  }: {
    date: Date
    locale: string
  }) => ReactElement
}) {
  const disabledDays = useDisabledDays({
    disabledDays: disabledDaysFromProps,
    beforeBlock,
    afterBlock,
  })

  const publicHolidays = usePublicHolidays({
    numberOfMonths,
    skip: !!publicHolidaysFromProps,
  })

  const initialMonth = useMemo(getInitialMonth, [])

  const from = useMemo(
    () => (startDate ? moment(startDate).toDate() : undefined),
    [startDate],
  )
  const to = useMemo(
    () => (endDate ? moment(endDate).toDate() : undefined),
    [endDate],
  )
  const selectedDays = useMemo(
    () =>
      [from, from && to ? { from, to } : undefined].filter(
        (day): day is Date | { from: Date; to: Date } => !!day,
      ),
    [from, to],
  )
  const modifiers: Partial<Modifiers> = useMemo(
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

  const handleDayClick = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.disabled) {
        return
      }

      const { from: nextFrom, to: nextTo } = DayPicker.DateUtils.addDayToRange(
        day,
        {
          from,
          to,
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
      $height={height || '395px'}
      $sideSpacing={6}
      $monthPadding="32px 0 30px 0"
      $selectedAll={!!(startDate && endDate)}
      $enableSameDay={enableSameDay}
      $startDateLabel={startDateLabel}
      $endDateLabel={endDateLabel}
      $sameDateLabel={sameDateLabel}
      $hideTodayLabel={hideTodayLabel}
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
        captionElement={renderCaptionElement}
      />
    </RangeContainer>
  )
}

import * as React from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import DayPicker, {
  DayModifiers,
  BeforeModifier,
  AfterModifier,
  Modifiers,
} from 'react-day-picker'
import 'moment/locale/ko'
import { getColor } from '@titicaca/color-palette'

import { isValidDate, generatePaddedRange } from './utils'
import PickerFrame from './picker-frame'
import { LOCALE, WEEKDAY_SHORT_LABEL, LOCALE_UTILS } from './constants'

const RangeContainer = styled.div<{
  height?: string
  selectedAll: boolean
  enableSameDay?: boolean
  startDateLabel?: string
  endDateLabel?: string
  sameDateLabel?: string
}>`
  .DayPicker {
    height: ${({ height }) => height || '395px'};
  }
  .DayPicker-Day--sunday {
    padding-left: 6px !important;
  }
  .DayPicker-Day--saturday {
    padding-right: 6px !important;
  }
  .DayPicker-Weekday:first-child {
    padding-left: 6px;
  }
  .DayPicker-Weekday:last-child {
    padding-right: 6px;
  }
  .DayPicker-Day--from,
  .DayPicker-Day--to {
    z-index: 0;
    color: rgba(${getColor('white')}) !important;
  }
  ${({ selectedAll }) =>
    selectedAll &&
    css`
      .DayPicker-Day--selected {
        background: rgba(${getColor('blue100')});
      }
      .DayPicker-Day--from {
        background: -webkit-linear-gradient(
          right,
          rgba(${getColor('blue100')}) 50%,
          #fafafa 50%
        );
      }
      .DayPicker-Day--to {
        background: -webkit-linear-gradient(
          right,
          #fafafa 50%,
          rgba(${getColor('blue100')}) 50%
        );
      }
    `}
  .DayPicker-Day--from:before,
  .DayPicker-Day--to:before {
    background: none;
  }
  .DayPicker-Day--from:after,
  .DayPicker-Day--to:after {
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
  .DayPicker-Day--sunday:after {
    left: calc(50%);
    transform: translate(calc(-50% + 3px), -50%);
  }
  .DayPicker-Day--saturday:after {
    left: calc(50%);
    transform: translate(calc(-50% - 3px), -50%);
  }

  ${({ startDateLabel, selectedAll }) =>
    startDateLabel &&
    selectedAll &&
    css`
    .DayPicker-Day--from:before {
      content: '${startDateLabel || ''}';
      color: rgba(${getColor('blue')});
      position: absolute;
      top: 35px;
      left: 0px;
      display: inline-block;
      font-size: 11px;
      width: 100%;
      transform: translateY(0px);
      background-color: transparent;
      height: auto !important;
    }
  `}
  ${({ endDateLabel, selectedAll }) =>
    endDateLabel &&
    selectedAll &&
    css`
    .DayPicker-Day--to:before {
      content: '${endDateLabel || ''}';
      color: rgba(${getColor('blue')});
      position: absolute;
      top: 35px;
      left: 0px;
      display: inline-block;
      font-size: 11px;
      width: 100%;
      transform: translateY(0px);
      background-color: transparent;
      height: auto !important;
    }
  `}
  .DayPicker-Day--from.DayPicker-Day--to {
    background: none;
    ${({ sameDateLabel }) => css`
      &:before {
        content: '${sameDateLabel || ''}';
      }
    `}
  }

  .DayPicker-Day--outside {
    background: none;
  }
  .DayPicker-Day--outside.DayPicker-Day--included-range {
    background: rgba(${getColor('blue100')});
  }
`

function getInitialMonth() {
  return moment().add(1, 'day').startOf('day').toDate()
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
  publicHolidays,
  enableSameDay,
}: {
  startDate: string | null
  endDate: string | null
  startDateLabel?: string
  endDateLabel?: string
  sameDateLabel?: string
  beforeBlock?: Date
  afterBlock?: Date
  onDatesChange: (params: {
    startDate: string | null
    endDate: string | null
    nights: number
  }) => void
  numberOfMonths?: number
  disabledDays?: string[]
  height?: string
  publicHolidays?: Date[]
  enableSameDay?: boolean
}) {
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
    [from, publicHolidays, to],
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
        !isValidDate(to) &&
        moment(day)
          .startOf('day')
          .isSame(moment(from as any).startOf('day'))
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
        startDate: nextFrom && moment(nextFrom).format('YYYY-MM-DD'),
        endDate: nextTo && moment(nextTo).format('YYYY-MM-DD'),
        nights: nextTo && nextFrom ? moment(nextTo).diff(nextFrom, 'days') : 0,
      })
    },
    [enableSameDay, from, onDatesChange, to],
  )

  return (
    <PickerFrame>
      <RangeContainer
        selectedAll={!!(startDate && endDate)}
        height={height}
        enableSameDay={enableSameDay}
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
        sameDateLabel={sameDateLabel}
      >
        <DayPicker
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
    </PickerFrame>
  )
}

export default RangePicker

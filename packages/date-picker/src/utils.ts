import moment from 'moment'
import { css } from 'styled-components'

export function isValidDate(d: unknown): boolean {
  return d instanceof Date && !isNaN(d.getTime())
}

export function generatePaddedRange(from: Date, to: Date): Date[] {
  if (from.getMonth() === to.getMonth()) {
    return []
  }

  const dates = []

  const currentDate = moment(from)
  const endDate = moment(to)

  while (currentDate.diff(endDate) < 0) {
    const firstDayOfNextMonth = currentDate
      .clone()
      .add(1, 'month')
      .startOf('month')

    if (firstDayOfNextMonth.diff(endDate) <= 0) {
      const currentWeekday = currentDate.clone().endOf('month').startOf('week')

      const endOfWeek = firstDayOfNextMonth.endOf('week')

      while (currentWeekday.diff(endOfWeek) < 0) {
        dates.push(currentWeekday.toDate())
        currentWeekday.add(1, 'day')
      }
    }

    currentDate.add(1, 'month')
  }

  return dates
}

export function generateTodayStyle({
  top = '30px',
  fontSize = '11px',
  fontWeight,
}: {
  top?: string
  fontSize?: string
  fontWeight?: number
}) {
  return css`
    .DayPicker-Day--today:not(.DayPicker-Day--selected):not(.DayPicker-Day--outside) {
      color: var(--color-blue);

      &:before {
        top: ${top};
        left: 0;
        content: '오늘';
        position: absolute;
        display: inline-block;
        font-size: ${fontSize};
        width: 100%;
        color: var(--color-blue);
        ${fontWeight && `font-weight : ${fontWeight};`}
      }

      &.DayPicker-Day--sunday,
      &.DayPicker-Day--saturday,
      &.DayPicker-Day--publicHolidays {
        color: var(--color-blue);

        &:before {
          color: var(--color-red);
        }
      }

      &.DayPicker-Day--disabled {
        color: var(--color-gray500);

        &:before {
          color: var(--color-gray500);
        }
      }
    }
  `
}

export function generateRangeStyle() {
  return css`
    .DayPicker-Day--selected {
      background: var(--color-blue100);
    }

    .DayPicker-Day--from {
      background: linear-gradient(
        to right,
        #fafafa 50%,
        var(--color-blue100) 50%
      );
    }

    .DayPicker-Day--to {
      background: linear-gradient(
        to left,
        #fafafa 50%,
        var(--color-blue100) 50%
      );
    }

    .DayPicker-Day--from.DayPicker-Day--to {
      background: none;
    }

    .DayPicker-Day--outside {
      background: none;

      &.DayPicker-Day--included-range {
        background: var(--color-100);
      }
    }
  `
}

export function generateDateLabelStyle({
  selector,
  label,
  top = '35px',
  fontSize = '11px',
  fontWeight,
}: {
  selector: string
  label: string
  top?: string
  fontSize?: string
  fontWeight?: number
}) {
  return css`
    ${selector} {
      &:not(.DayPicker-Day--outside):before {
        color: var(--color-white);
        position: absolute;
        top: ${top};
        left: 0px;
        display: inline-block;
        font-size: ${fontSize};
        ${fontWeight && `font-weight : ${fontWeight};`}
        width: 100%;
        transform: translateY(0px);
        background-color: transparent;
        height: auto !important;
        content: '${label}';
      }
    }
  `
}

export const sideSpacingMixin = css<{ sideSpacing: number }>`
  ${({ sideSpacing }) => `
    .DayPicker-Weekday {
      &:first-child {
        padding-left: ${sideSpacing}px;
      }
      &:last-child {
        padding-right: ${sideSpacing}px;
      }
    }

    .DayPicker-Day {
      &--sunday {
        padding-left: ${sideSpacing}px !important;

        &:before {
          /* date label */
          transform: translate(${sideSpacing / 2}px) !important;
        }

        &:after {
          /* Select circle */
          transform: translate(calc(-50% + ${
            sideSpacing / 2
          }px), -50%) !important;
        }
      }

      &--saturday {
        padding-right: ${sideSpacing}px !important;

        &:before {
          /* date label */
          transform: translate(${(sideSpacing / 2) * -1}px) !important;
        }

        &:after {
          /* Select circle */
          transform: translate(
            calc(-50% + ${(sideSpacing / 2) * -1}px),
            -50%
          ) !important;
        }
      }
    }
  `}
`

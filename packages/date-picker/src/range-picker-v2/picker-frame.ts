import styled, { css } from 'styled-components'

const sideSpacingMixin = css<{ sideSpacing: number }>`
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

export function generateSelectedStyle({
  selectedAll,
}: {
  selectedAll: boolean
}) {
  return css`
    .DayPicker-Day--from,
    .DayPicker-Day--to {
      z-index: 0;
      color: var(--color-white) !important;

      &:before {
        top: 28px !important;
      }

      &:after {
        z-index: -1;
        display: block;
        width: calc(100% - 1px);
        height: 45px;
        position: absolute;
        top: 50%;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--color-blue);
        ${!selectedAll && `border-radius: 4px;`}
        content: '';
      }

      &.DayPicker-Day--outside {
        &:before,
        &:after {
          content: none;
        }
      }
    }

    ${selectedAll &&
    css`
      .DayPicker-Day--from:after {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      .DayPicker-Day--to:after {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    `}
  `
}

const todayStyle = css`
  .DayPicker-Day--today:not(.DayPicker-Day--selected):not(.DayPicker-Day--outside) {
    color: var(--color-blue);

    &:before {
      top: 28px;
      left: 0;
      content: '오늘';
      position: absolute;
      display: inline-block;
      font-size: 10px;
      font-weight: 500;
      width: 100%;
      color: var(--color-blue);
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

export const rangeStyle = css`
  .DayPicker-Day--selected {
    background: var(--color-blue100);
  }

  .DayPicker-Day--from {
    background: linear-gradient(
      to right,
      #fafafa 50%,
      var(--color-blue100) 50%
    );
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .DayPicker-Day--to {
    background: linear-gradient(to left, #fafafa 50%, var(--color-blue100) 50%);
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

export function generateDateLabelStyle(selector: string, label: string) {
  return css`
    ${selector} {
      &:not(.DayPicker-Day--outside):before {
        color: var(--color-white);
        position: absolute;
        top: 45px;
        left: 0px;
        display: inline-block;
        font-size: 10px;
        font-weight: 500 !important;
        width: 100%;
        transform: translateY(0px);
        background-color: transparent;
        height: auto !important;
        content: '${label}';
      }
    }
  `
}

interface PickerFrameProps {
  height: string
  sideSpacing: number
  monthPadding: string
  hideTodayLabel: boolean
}

const PickerFrame = styled.div<PickerFrameProps>`
  border-top: 1px solid var(--color-gray100);
  border-bottom: 1px solid var(--color-gray100);

  .DayPicker {
    overflow: auto;
    color: #3a3a3a;
    font-weight: bold;
    font-size: 14px;
    background: #fafafa;

    ${({ height }) => `height: ${height};`}

    .DayPicker-wrapper {
      max-width: 768px;
      margin: 0 auto;
    }

    .DayPicker-Month {
      position: relative;
      display: table;
      text-align: center;
      width: 100%;
      border-spacing: 0 25px;
      user-select: none;
      box-sizing: border-box;

      ${({ monthPadding }) => `padding: ${monthPadding};`}

      .DayPicker-Caption {
        position: absolute;
        top: 25px;
        left: 20px;
        color: #222;

        > div {
          font-size: 14px;
          font-weight: 600;
        }
      }

      .DayPicker-Weekdays {
        display: table-row-group;

        .DayPicker-WeekdaysRow {
          display: table-row;

          .DayPicker-Weekday {
            display: table-cell;
            color: #8b9898;
            text-align: center;

            abbr {
              text-decoration: none;
              color: var(--color-gray500);
              font-size: 12px;
            }
          }
        }
      }

      .DayPicker-Body {
        display: table-row-group;

        .DayPicker-Week {
          display: table-row;
          height: 45px;

          ${({ hideTodayLabel }) => !hideTodayLabel && todayStyle}

          .DayPicker-Day {
            position: relative;
            display: table-cell;

            width: 2%;
            padding: 6px 0 4px;
            outline: none;

            &--sunday,
            &--saturday,
            &--publicHolidays {
              color: var(--color-red);
            }

            &--disabled {
              color: var(--color-gray500);
            }
          }
        }
      }
    }

    ${sideSpacingMixin}

    /* unknown class */
    .DayPicker-WeekNumber {
      position: relative;
      display: table-cell;
      padding: 9px 0;
      width: 2%;
      vertical-align: middle;
      outline: none;
    }
  }
`
export default PickerFrame

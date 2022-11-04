import styled, { css } from 'styled-components'

import { todayMixin, sideSpacingMixin } from '../mixins'

export function generateSelectedStyle({
  selectedAll,
}: {
  selectedAll: boolean
}) {
  return css`
    /* stylelint-disable selector-class-pattern */
    .DayPicker-Day--from,
    .DayPicker-Day--to {
      z-index: 0;
      color: var(--color-white) !important;

      &::before {
        top: 28px !important;
      }

      &::after {
        z-index: -1;
        display: block;
        width: calc(100% - 1px);
        height: 45px;
        position: absolute;
        top: 50%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--color-blue);
        ${!selectedAll && `border-radius: 4px;`}

        content: '';
      }

      &.DayPicker-Day--outside {
        &::before,
        &::after {
          content: none;
        }
      }
    }

    ${selectedAll &&
    css`
      .DayPicker-Day--from::after {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      .DayPicker-Day--to::after {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    `}
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

          ${({ hideTodayLabel }) =>
            !hideTodayLabel &&
            todayMixin({
              top: '28px',
              fontSize: '10px',
              fontWeight: 500,
            })}

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
  }
`
export default PickerFrame

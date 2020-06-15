import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

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

export function generateSelectedCircleStyle(selector: string) {
  return css`
    ${selector} {
      z-index: 0;
      color: rgba(${getColor('white')}) !important;

      &:before {
        top: 35px !important;
      }

      &:after {
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
    }
  `
}

const todayStyle = css`
  .DayPicker-Day--today:not(.DayPicker-Day--selected):not(.DayPicker-Day--outside) {
    color: rgba(${getColor('blue')});

    &:before {
      top: 30px;
      left: 0;
      content: '오늘';
      position: absolute;
      display: inline-block;
      font-size: 11px;
      width: 100%;
      color: rgba(${getColor('blue')});
    }

    &.DayPicker-Day--sunday,
    &.DayPicker-Day--saturday,
    &.DayPicker-Day--publicHolidays {
      color: rgba(${getColor('red')});

      &:before {
        color: rgba(${getColor('red')});
      }
    }

    &.DayPicker-Day--disabled {
      color: rgba(${getColor('gray500')});

      &:before {
        color: rgba(${getColor('gray500')});
      }
    }
  }
`

const PickerFrame = styled.div<{ height: string; sideSpacing: number }>`
  border-top: 1px solid rgba(${getColor('gray100')});
  border-bottom: 1px solid rgba(${getColor('gray100')});

  .DayPicker {
    overflow: auto;
    color: #3a3a3a;
    font-weight: bold;
    font-size: 14px;
    background: #fafafa;

    ${({ height }) => `height: ${height};`}

    .DayPicker-Month {
      position: relative;
      display: table;
      text-align: center;
      width: 100%;
      border-spacing: 0 25px;
      padding: 32px 0 30px 0;
      user-select: none;
      box-sizing: border-box;

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
              color: rgba(${getColor('gray500')});
              font-size: 12px;
            }
          }
        }
      }

      .DayPicker-Body {
        display: table-row-group;

        .DayPicker-Week {
          display: table-row;

          ${todayStyle}

          .DayPicker-Day {
            position: relative;
            display: table-cell;
            padding: 9px 0;
            width: 2%;
            vertical-align: middle;
            outline: none;

            &--sunday,
            &--saturday,
            &--publicHolidays {
              color: rgba(${getColor('red')});
            }

            &--disabled {
              color: rgba(${getColor('gray500')});
            }

            &--outside:after,
            &--outside:before {
              content: '' !important;
              background: none !important;
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

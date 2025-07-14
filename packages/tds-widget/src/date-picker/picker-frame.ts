import { styled, css } from 'styled-components'

import { todayMixin, sideSpacingMixin } from './mixins'

export function generateSelectedCircleStyle(
  selector: string,
  backgroundColor: string = 'var(--color-blue)',
) {
  return css`
    /* stylelint-disable selector-class-pattern */
    ${selector} {
      z-index: 0;
      color: var(--color-white) !important;

      &::before {
        top: 35px !important;
      }

      &::after {
        z-index: -1;
        display: block;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 50%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${backgroundColor};
        content: '';
        border-radius: 100%;
      }

      &.DayPicker-Day--outside {
        &::before,
        &::after {
          content: none;
        }
      }
    }
  `
}

const navStyle = css`
  position: relative;
  z-index: 1;

  .DayPicker-NavButton--prev {
    margin-right: 24px;
    transform: rotate(180deg);
    background-image: url('https://assets.triple.guide/images/ic-paging-next@3x.png');
  }

  .DayPicker-NavButton--next {
    background-image: url('https://assets.triple.guide/images/ic-paging-next@3x.png');
  }

  .DayPicker-NavButton {
    position: absolute;
    top: 15px;
    right: 13px;
    left: auto;
    display: inline-block;
    margin-top: 2px;
    width: 36px;
    height: 36px;
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    color: #8b9898;
    cursor: pointer;
  }
`

interface PickerFrameProps {
  $height: string
  $sideSpacing: number
  $monthPadding: string
  $hideTodayLabel: boolean
  $canChangeMonth?: boolean
  $defaultColor?: string
}

export const PickerFrame = styled.div<PickerFrameProps>`
  border-top: 1px solid var(--color-gray100);
  border-bottom: 1px solid var(--color-gray100);

  .DayPicker {
    overflow: auto;
    color: #3a3a3a;
    font-weight: bold;
    font-size: 14px;
    background: #fafafa;

    ${({ $height }) => `height: ${$height};`}
    ${sideSpacingMixin}
  }

  .DayPicker-wrapper {
    max-width: 768px;
    margin: 0 auto;
  }

  .DayPicker-NavBar {
    ${({ $canChangeMonth }) => $canChangeMonth && navStyle}
  }

  .DayPicker-Month {
    position: relative;
    display: table;
    text-align: center;
    width: 100%;
    border-spacing: 0 25px;
    user-select: none;

    ${({ $monthPadding }) => `padding: ${$monthPadding};`}
  }

  .DayPicker-Caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: #222;

    & > div {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .DayPicker-Weekdays {
    display: table-row-group;
  }

  .DayPicker-WeekdaysRow {
    display: table-row;
  }

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

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;

    ${({ $hideTodayLabel, $defaultColor }) =>
      !$hideTodayLabel &&
      todayMixin({
        color: $defaultColor,
      })}

    td:first-child {
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
    }
  }

  .DayPicker-Day {
    position: relative;
    display: table-cell;
    padding: 9px 0;
    width: 2%;
    vertical-align: middle;
    outline: none;
  }

  .DayPicker-Day--sunday,
  .DayPicker-Day--saturday,
  .DayPicker-Day--publicHolidays {
    color: var(--color-red);
  }

  .DayPicker-Day--disabled {
    color: var(--color-gray500);
  }
`

import styled from 'styled-components'
import { GetGlobalColor } from '@titicaca/triple-design-system'

const PickerFrame = styled.div`
  .DayPicker {
    height: 355px;
    overflow: auto;
    color: #3a3a3a;
    font-weight: bold;
    font-size: 14px;
    background: #fafafa;
  }
  .DayPicker-Caption {
    position: absolute;
    top: 30px;
    left: 20px;
    color: #222;
  }
  .DayPicker-Caption > div {
    font-size: 14px;
    font-weight: 600;
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
  }
  .DayPicker-Month {
    position: relative;
    display: table;
    text-align: center;
    width: 100%;
    border-spacing: 0 25px;
    padding: 32px 0 30px 0;
    user-select: none;
    box-sizing: border-box;
  }
  .DayPicker-Body {
    display: table-row-group;
  }
  .DayPicker-Week {
    display: table-row;
  }
  .DayPicker-Day,
  .DayPicker-WeekNumber {
    position: relative;
    display: table-cell;
    padding: 9px 0;
    width: 2%;
    vertical-align: middle;
    outline: none;
  }
  .DayPicker-Day--today {
    color: rgb(${GetGlobalColor('blue')});
  }
  .DayPicker-Weekday abbr {
    text-decoration: none;
    color: rgba(${GetGlobalColor('gray')}, 0.5);
    font-size: 12px;
  }
  .DayPicker-Day--sunday,
  .DayPicker-Day--saturday {
    color: rgb(${GetGlobalColor('red')});
  }
  .DayPicker-Day--today:before {
    content: '오늘';
    position: absolute;
    display: inline-block;
    font-size: 11px;
    top: 30px;
    left: 0px;
    width: 100%;
    color: rgb(${GetGlobalColor('blue')});
  }
  .DayPicker-Day--saturday.DayPicker-Day--today:before,
  .DayPicker-Day--sunday.DayPicker-Day--today:before {
    top: 36px;
    color: rgb(${GetGlobalColor('red')});
  }
  .DayPicker-Day--disabled {
    color: rgba(${GetGlobalColor('gray')}, 0.5);
  }
  .DayPicker-Day--selected:before {
    content: '';
  }
  .DayPicker-Day--outside:after,
  .DayPicker-Day--outside:before {
    content: '' !important;
    background: none !important;
  }
  .DayPicker-Weekday:first-child {
    padding-left: 10px;
  }
  .DayPicker-Weekday:last-child {
    padding-right: 10px;
  }
  .DayPicker-Day--sunday {
    padding-left: 10px !important;
  }
  .DayPicker-Day--saturday {
    padding-right: 10px !important;
  }
  .DayPicker-Day--sunday.DayPicker-Day--today,
  .DayPicker-Day--saturday.DayPicker-Day--today {
    color: rgb(${GetGlobalColor('red')});
  }
`

export default PickerFrame

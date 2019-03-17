import 'react-dates/initialize'
import React, { PureComponent } from 'react'
import Container from './container'
import Text from './text'
import moment from 'moment'
import styled from 'styled-components'
import { DayPickerSingleDateController } from 'react-dates'

moment.locale('ko')

const COLORS = {
  blue: '54, 143, 255',
  gray: '58, 58, 58',
  white: '255,255,255',
}

const DayPickerWrapper = styled(Container)`
  border: 1px solid #efefef;
  font-family: sans-serif;

  .DayPicker_weekHeader {
    padding: 15px 0 !important;
  }

  .DayPicker_weekHeader_ul {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    display: table;
    width: 100%;
    text-align: center;
  }

  .DayPicker_weekHeader_li {
    display: table-cell;
    width: auto !important;
    font-size: 13px;
  }

  .CalendarMonth {
    padding: 0 10px !important;
  }

  .DayPicker_focusRegion {
    height: ${({ height }) => height || 265}px;
    overflow: scroll;
    outline: none;
  }

  .CalendarMonth_table {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }

  .CalendarMonthGrid {
    width: 100% !important;
    background-color: #fafafa;
  }

  .CalendarMonth_caption {
    padding: 20px 0 5px 15px;
    font-weight: 500;
  }

  .CalendarDay {
    position: relative;
    vertical-align: middle;
    padding: 1px;
    font-size: 14px;
  }

  .CalendarDay__today {
    color: rgb(${COLORS.blue});
  }

  .CalendarDay__today:after {
    content: '오늘';
    position: absolute;
    display: inline-block;
    font-size: 11px;
    top: 26px;
    left: 0px;
    width: 100%;
    color: rgb(${COLORS.blue});
  }

  .CalendarDay__selected {
    z-index: 0;
    color: rgb(255, 255, 255);
  }

  .CalendarDay__selected:before {
    z-index: -1;
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 100%;
    background-color: rgb(${COLORS.blue});
    content: '';
  }

  .CalendarDay__blocked_out_of_range {
    color: rgba(${COLORS.gray}, 0.3);
  }

  .DayPickerNavigation,
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
`

function isBlocked({ from, to, blockedDates = [], day }) {
  return (
    day.isBefore(from) ||
    day.isAfter(to) ||
    blockedDates.some((date) => date.isSame(day))
  )
}

function ScheduleText({ date }) {
  return (
    <Text inline bold color="blue" margin={{ left: 6 }}>
      {date.format('YYYY.MM.DD (ddd)')}
    </Text>
  )
}

export default class DayPicker extends PureComponent {
  constructor(props) {
    super(props)
    const { from, to, blockedDates } = this.props

    this.state = {
      from: moment(from).startOf('day'),
      to: moment(to).startOf('day'),
      blockedDates: blockedDates.map((date) => moment(date).startOf('day')),
    }
  }

  render() {
    const {
      props: { numberOfMonths, onDateChange, date, ...props },
      state: { from, to, blockedDates },
    } = this
    const selectedDate = date ? moment(date) : null

    return (
      <Container padding={{ left: 20, right: 20 }}>
        <Container margin={{ bottom: 10 }}>
          <Text bold inline>
            날짜선택
          </Text>
          {selectedDate ? <ScheduleText date={selectedDate} /> : null}
        </Container>

        <DayPickerWrapper {...props}>
          <DayPickerSingleDateController
            focused={true}
            initialVisibleMonth={() => from}
            numberOfMonths={numberOfMonths}
            date={selectedDate}
            onDateChange={(date) => onDateChange(date.format('YYYY-MM-DD'))}
            orientation="verticalScrollable"
            isOutsideRange={(day) =>
              isBlocked({
                from,
                to,
                blockedDates,
                day: day.startOf('day'),
              })
            }
            renderMonthElement={({ month }) =>
              moment(month).format('YYYY년 MMMM')
            }
          />
        </DayPickerWrapper>
      </Container>
    )
  }
}

DayPicker.defaultProps = {
  from: moment(),
  to: moment()
    .clone()
    .add(3, 'month'),
  blockedDates: [],
  numberOfMonths: 4,
}

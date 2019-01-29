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
  }

  .CalendarMonth {
    padding: 0 !important;
  }

  .DayPicker_focusRegion {
    height: ${({ height }) => (height ? height : 265)}px;
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
    border-radius: 100%;
    color: rgb(255, 255, 255);
    background-color: rgb(${COLORS.blue});
  }

  .CalendarDay__blocked_out_of_range {
    color: rgba(${COLORS.gray}, 0.3);
  }

  .DayPickerNavigation,
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
`

const initializeUnderDay = (date) =>
  date
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)

function isBlockDate(from, to, blockedDates = [], day) {
  if (blockedDates.find((date) => date.isSame(day))) return true
  if (day.isBefore(from)) return true
  if (day.isAfter(to)) return true

  return false
}

function ScheduleText({ date }) {
  const schedule = date.format('YYYY-MM-DD')

  return (
    <Text inline bold color="blue" margin={{ left: 6 }}>
      {schedule.replace(/-/g, '.')} ({moment(schedule).format('ddd')})
    </Text>
  )
}

export default class DayPicker extends PureComponent {
  constructor(props) {
    super(props)
    const { from, to, blockedDates } = this.props

    this.state = {
      from: initializeUnderDay(moment(from)),
      to: initializeUnderDay(moment(to)),
      blockedDates: blockedDates.map((date) =>
        initializeUnderDay(moment(date)),
      ),
    }
  }

  handleDateChange = (date) => {
    this.props.onDateChange(date)
  }

  render() {
    const { numberOfMonths, date, ...props } = this.props
    const { from, to, blockedDates } = this.state

    return (
      <Container padding={{ left: 21, right: 21 }}>
        <Container margin={{ bottom: 10 }}>
          <Text bold inline>
            날짜선택
          </Text>
          {date ? <ScheduleText date={date} /> : null}
        </Container>

        <DayPickerWrapper {...props}>
          <DayPickerSingleDateController
            initialVisibleMonth={() => from}
            numberOfMonths={numberOfMonths}
            date={date}
            onDateChange={this.handleDateChange}
            orientation="verticalScrollable"
            isOutsideRange={(day) => {
              return isBlockDate(
                from,
                to,
                blockedDates,
                initializeUnderDay(day),
              )
            }}
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

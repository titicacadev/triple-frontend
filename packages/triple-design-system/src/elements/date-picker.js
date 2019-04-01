import 'react-dates/initialize'
import React, { PureComponent } from 'react'
import Container from './container'
import Text from './text'
import moment from 'moment'
import styled, { css } from 'styled-components'
import {
  DayPickerSingleDateController,
  DayPickerRangeController,
} from 'react-dates'

moment.locale('ko')

const COLORS = {
  blue: '54, 143, 255',
  gray: '58, 58, 58',
  white: '255,255,255',
  red: '255,64,64',
}

const DatePickerContainer = styled(Container)`
  font-family: sans-serif;

  .DayPicker_weekHeader {
    padding: 15px 0 !important;
  }

  .DayPicker_weekHeaders {
    display: none;
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

  .DayPicker_focusRegion {
    height: ${({ height }) => height || 265}px;
    overflow: scroll;
    outline: none;
  }

  .CalendarMonth {
    padding: 0 !important;
  }

  .CalendarMonth_verticalSpacing,
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
    font-weight: 500;
  }

  .CalendarDay {
    position: relative;
    vertical-align: middle;
    padding: 1px;
    font-size: 14px;
  }

  .CalendarDay__firstDayOfWeek,
  .CalendarDay__lastDayOfWeek {
    color: rgb(${COLORS.red});
  }

  .CalendarDay__firstDayOfWeek {
    padding-left: 10px;
  }

  .CalendarDay__lastDayOfWeek {
    padding-right: 10px;
  }

  .CalendarDay__today {
    color: rgb(${COLORS.blue});
  }

  .CalendarDay__today:after {
    content: '오늘';
    position: absolute;
    display: inline-block;
    font-size: 11px;
    top: 35px;
    left: 0px;
    width: 100%;
    color: rgb(${COLORS.blue});
  }

  .CalendarDay__selected {
    z-index: 0;
    color: rgb(${COLORS.white});
  }

  .CalendarDay__selected:after {
    z-index: -1;
    display: block;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: rgb(${COLORS.blue});
    content: '';
  }

  .CalendarDay__firstDayOfWeek.CalendarDay__selected:after {
    left: calc(50%);
    transform: translate(calc(-50% + 5px), -50%);
  }

  .CalendarDay__lastDayOfWeek.CalendarDay__selected:after {
    left: calc(50%);
    transform: translate(calc(-50% - 5px), -50%);
  }

  .CalendarDay__blocked_out_of_range {
    color: rgba(${COLORS.gray}, 0.3);
  }

  .DayPickerNavigation,
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
`

const DayPickerContainer = styled.div`
  border: 1px solid rgba(${COLORS.gray}, 0.1);
`

const RangePickerContainer = styled.div`
  .DayPicker_weekHeader {
    border-bottom: 1px solid rgba(${COLORS.gray}, 0.1);
  }

  .CalendarDay__selected_span:before {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: block;
    width: 100%;
    height: 32px !important;
    background: rgba(${COLORS.blue}, 0.1) !important;
    box-sizing: border-box;
    content: '';
  }

  .CalendarDay.CalendarDay__selected:before {
    z-index: -1;
    display: block;
    width: 50%;
    height: 32px;
    position: absolute;
    top: 50%;
    bottom: 0;
    right: 0;
    transform: translateY(-50%);
    background-color: rgba(${COLORS.blue}, 0.1) !important;
  }

  ${({ selectedAll }) =>
    selectedAll &&
    css`
      .CalendarDay__selected:before {
        content: '';
        right: 0;
      }

      .CalendarDay__selected_end:before {
        content: '';
        left: 0;
      }
    `};
`

const WeekContainer = styled(Container)`
  display: table;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: rgba(${COLORS.gray}, 0.3);
`

const WeekText = styled.span`
  display: table-cell;
  width: 40px;

  &:first-child {
    padding-left: 9px;
  }

  &:last-child {
    padding-right: 9px;
  }
`

function WeekHeaderComponent(month) {
  return (
    <Container>
      <Text padding={{ top: 30, bottom: 28, left: 20 }} size="small" bold>
        {month}
      </Text>
      <WeekContainer>
        {['일', '월', '화', '수', '목', '금', '토'].map((text, idx) => (
          <WeekText key={idx}>{text}</WeekText>
        ))}
      </WeekContainer>
    </Container>
  )
}

function withBaseInfo(WrappedComponent) {
  return class Wrapper extends PureComponent {
    constructor(props) {
      super(props)
      const {
        from = moment(),
        to = moment()
          .clone()
          .add(3, 'month'),
        blockedDates = [],
      } = this.props

      this.state = {
        from: moment(from).startOf('day'),
        to: moment(to).startOf('day'),
        blockedDates: blockedDates.map((date) => moment(date).startOf('day')),
      }
    }

    render() {
      return <WrappedComponent dates={this.state} {...this.props} />
    }
  }
}

function isBlocked({ from, to, blockedDates = [], day }) {
  return (
    day.isBefore(from) ||
    day.isAfter(to) ||
    blockedDates.some((date) => date.isSame(day))
  )
}

class DayPickerComponent extends PureComponent {
  render() {
    const {
      date,
      numberOfMonths = 4,
      onDateChange,
      dates: { from, to, blockedDates },
    } = this.props

    const selectedDate = date && moment(date)

    return (
      <DatePickerContainer padding={{ left: 20, right: 20 }}>
        <Container margin={{ bottom: 10 }}>
          <Text bold inline>
            날짜선택
          </Text>
          {selectedDate ? (
            <Text inline bold color="blue" margin={{ left: 6 }}>
              {selectedDate.format('YYYY.MM.DD (ddd)')}
            </Text>
          ) : null}
        </Container>
        <DayPickerContainer>
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
              WeekHeaderComponent(moment(month).format('YYYY년 MMMM'))
            }
            verticalBorderSpacing={20}
          />
        </DayPickerContainer>
      </DatePickerContainer>
    )
  }
}

class RangePickerComponent extends PureComponent {
  state = {
    focusedInput: 'startDate',
  }
  render() {
    const {
      state: { focusedInput },
      props: {
        startDate,
        endDate,
        numberOfMonths = 6,
        onDateChange,
        dates: { from, to, blockedDates },
      },
    } = this

    const sDate = startDate && moment(startDate)
    const eDate = endDate && moment(endDate)

    return (
      <DatePickerContainer height={355}>
        <RangePickerContainer
          selectedAll={sDate && eDate && !sDate.isSame(eDate)}
        >
          <DayPickerRangeController
            startDate={sDate}
            endDate={eDate}
            initialVisibleMonth={() => from}
            orientation="verticalScrollable"
            numberOfMonths={numberOfMonths}
            verticalHeight={800}
            focusedInput={focusedInput}
            minimumNights={0}
            onDatesChange={({ startDate, endDate }) => {
              onDateChange({
                startDate: startDate && startDate.format('YYYY-MM-DD'),
                endDate: endDate && endDate.format('YYYY-MM-DD'),
                nights:
                  startDate && endDate ? endDate.diff(startDate, 'days') : 0,
              })
            }}
            onFocusChange={(focusedInput) =>
              this.setState({ focusedInput: focusedInput || 'startDate' })
            }
            isOutsideRange={(day) =>
              isBlocked({
                from,
                to,
                blockedDates,
                day: day.startOf('day'),
              })
            }
            renderMonthElement={({ month }) =>
              WeekHeaderComponent(moment(month).format('YYYY년 MMMM'))
            }
            verticalBorderSpacing={20}
          />
        </RangePickerContainer>
      </DatePickerContainer>
    )
  }
}

export const RangePicker = withBaseInfo(RangePickerComponent)
export const DayPicker = withBaseInfo(DayPickerComponent)

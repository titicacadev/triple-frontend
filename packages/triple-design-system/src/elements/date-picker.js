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
}

const DatePickerContainer = styled(Container)`
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

  .CalendarDay__selected {
    z-index: 0;
    color: rgb(${COLORS.white});
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

  .CalendarDay__selected:after {
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
`

const RangePickerContainer = styled.div`
  .CalendarMonth_table {
    border-spacing: 0 2px;
    font-size: 16px;
    font-weight: normal;
  }

  .DayPicker_weekHeader {
    border-bottom: 1px solid rgba(${COLORS.gray}, 0.1);
  }

  .DayPicker_weekHeader_li {
    font-size: 14px;
  }

  .CalendarDay {
    width: 46px !important;
    height: 46px !important;
    position: relative;
    vertical-align: middle;
    padding: 1px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .CalendarMonth {
    padding: 0 !important;
  }

  .CalendarDay__selected_span {
    background: rgba(${COLORS.blue}, 0.3) !important;
    box-sizing: border-box;
  }

  .CalendarDay__selected:before {
    z-index: -1;
    display: block;
    width: 50%;
    height: 46px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(${COLORS.blue}, 0.3) !important;
  }

  .CalendarDay__selected:after {
    z-index: -1;
    display: block;
    width: 46px;
    height: 46px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 100%;
    background-color: rgb(${COLORS.blue});
    content: '';
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
              moment(month).format('YYYY년 MMMM')
            }
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
      <DatePickerContainer>
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
              moment(month).format('YYYY년 MMMM')
            }
          />
        </RangePickerContainer>
      </DatePickerContainer>
    )
  }
}

export const RangePicker = withBaseInfo(RangePickerComponent)
export const DayPicker = withBaseInfo(DayPickerComponent)

import React, { PureComponent } from 'react'
import { RangePicker } from '@titicaca/triple-design-system/elements/date-picker'

export default class App extends PureComponent {
  state = {
    startDate: null,
    endDate: null,
  }

  onDateChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    })
  }

  render() {
    const { startDate, endDate } = this.state

    const fromDate = new Date()
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 5, 1)

    return (
      <div>
        <RangePicker
          from={fromDate.toISOString().slice(0, 10)}
          to={toDate.toISOString().slice(0, 10)}
          startDate={startDate}
          endDate={endDate}
          onDateChange={this.onDateChange}
          blockedDates={['2019-05-23', '2019-05-25']}
        />
      </div>
    )
  }
}

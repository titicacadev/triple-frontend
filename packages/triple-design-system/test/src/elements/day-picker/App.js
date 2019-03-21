import React, { PureComponent } from 'react'
import { DayPicker } from '@titicaca/triple-design-system/elements/date-picker'

export default class App extends PureComponent {
  state = {
    date: null,
  }

  onDateChange = (date) => {
    this.setState({
      date,
    })
  }

  render() {
    const { date } = this.state

    const fromDate = new Date()
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 3, 1)

    return (
      <div>
        <DayPicker
          date={date}
          from={fromDate.toISOString().slice(0, 10)}
          to={toDate.toISOString().slice(0, 10)}
          onDateChange={this.onDateChange}
        />
      </div>
    )
  }
}

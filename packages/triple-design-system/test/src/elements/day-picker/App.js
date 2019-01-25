import React, { PureComponent } from 'react'
import DayPicker from '@titicaca/triple-design-system/elements/day-picker'

export default class App extends PureComponent {
  state = {
    date: null,
  }

  onDateChange = (date) => {
    this.setState({ date })
  }

  render() {
    return (
      <div>
        <DayPicker
          startDate="2019-01-25"
          endDate="2019-04-29"
          blockDates={['2019-01-26']}
          onDateChange={this.onDateChange}
          date={this.state.date}
        />
      </div>
    )
  }
}

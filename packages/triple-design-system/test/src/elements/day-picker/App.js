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
          from={'2019-01-20'}
          to="2019-03-14"
          onDateChange={this.onDateChange}
          date={this.state.date}
        />
      </div>
    )
  }
}

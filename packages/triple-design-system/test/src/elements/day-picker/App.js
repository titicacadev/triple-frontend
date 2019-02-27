import React, { PureComponent } from 'react'
import '@titicaca/triple-design-system/global-style'
import DayPicker from '@titicaca/triple-design-system/elements/day-picker'

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

    return (
      <div>
        <DayPicker
          date={date}
          from="2019-01-01"
          to="2019-03-14"
          onDateChange={this.onDateChange}
        />
      </div>
    )
  }
}

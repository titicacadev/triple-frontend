import React, { PureComponent } from 'react'
import DayPicker from '@titicaca/triple-design-system/elements/day-picker'
import moment from 'moment'

export default class App extends PureComponent {
  state = {
    date: null,
  }

  handleDate = (date) => {
    this.setState({ date })
  }

  render() {
    return (
      <div>
        <DayPicker
          endDate={moment('2019-04-29')}
          blockDates={[moment('2019-01-26')]}
          handleDate={this.handleDate}
          date={this.state.date}
        />
      </div>
    )
  }
}

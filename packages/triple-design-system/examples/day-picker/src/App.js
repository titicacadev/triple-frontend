import React, { Component } from 'react'
import DayPicker from '../../../src/elements/day-picker'
import moment from 'moment'

export default class App extends Component {
  state = {
    date: null,
  }

  handleDate = (date) => {
    this.setState({
      date,
    })
  }

  render() {
    return (
      <div>
        <DayPicker
          endDate={moment('2019-04-29')}
          blockDates={[moment('2019-01-25')]}
          handleDate={this.handleDate}
          date={this.state.date}
        />
      </div>
    )
  }
}

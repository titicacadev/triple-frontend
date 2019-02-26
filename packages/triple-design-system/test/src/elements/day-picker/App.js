import React, { PureComponent } from 'react'
import '@titicaca/triple-design-system/global-style'
import DayPicker from '@titicaca/triple-design-system/elements/day-picker'

export default class App extends PureComponent {
  onDateChange = () => {
    // recive date...
  }

  render() {
    return (
      <div>
        <DayPicker
          from={'2019-01-20'}
          to="2019-03-14"
          onDateChange={this.onDateChange}
        />
      </div>
    )
  }
}

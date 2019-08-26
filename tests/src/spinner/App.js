import React, { PureComponent } from 'react'
import { Spinner } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div className="wrap_spinner">
        <Spinner full />
      </div>
    )
  }
}

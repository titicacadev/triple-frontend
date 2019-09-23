import React, { PureComponent } from 'react'
import { Responsive } from '@titicaca/core-elements'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Responsive maxWidth={1} className="responsive-max-hidden">
          Hidden component (Max-width)
        </Responsive>

        <Responsive maxWidth={10000} className="responsive-max-visible">
          Visible component (Max-width)
        </Responsive>

        <Responsive minWidth={10000} className="responsive-min-hidden">
          Hidden component (Min-width)
        </Responsive>

        <Responsive minWidth={1} className="responsive-min-visible">
          Visible component (Min-width)
        </Responsive>

        <Responsive
          minWidth={10000}
          maxWidth={11000}
          className="responsive-minmax-hidden"
        >
          Hidden component (Min-Max-width)
        </Responsive>

        <Responsive
          minWidth={1}
          maxWidth={10000}
          className="responsive-minmax-visible"
        >
          Visible component (Min-Max-width)
        </Responsive>
      </div>
    )
  }
}

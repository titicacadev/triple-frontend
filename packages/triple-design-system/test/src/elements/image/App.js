import React, { PureComponent } from 'react'
import { Image } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <div className="fixed-dimension">
          <Image width="200" height="100" />
        </div>

        <div className="placeholder">
          <Image placeholder width="200" height="100" />
        </div>
      </div>
    )
  }
}

import React, { PureComponent } from 'react'
import { Label } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Label className="radio-unselected" radio>
          추천순
        </Label>
        <Label className="radio-selected" radio selected>
          최신순
        </Label>
      </div>
    )
  }
}

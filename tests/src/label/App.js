import React, { PureComponent } from 'react'
import { Label } from '@titicaca/core-elements'

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
        <Label className="promo-medium" promo size="medium">
          최대 24%
        </Label>
        <Label className="promo-small" promo size="small">
          최대 24%
        </Label>
      </div>
    )
  }
}

import React, { PureComponent } from 'react'
import { Pricing } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    const sample = {
      basePrice: 30000,
      salePrice: 25000,
    }
    return (
      <div>
        <div className="rich-pressed">
          <Pricing {...sample} label="트리플가" rich />
        </div>
        <div className="regular-pressed">
          <Pricing {...sample} />
        </div>
      </div>
    )
  }
}

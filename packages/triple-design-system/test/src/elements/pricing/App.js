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
        <div className="fixed-pressed">
          <Pricing
            fiexd
            active={true}
            label="트리플 클럽가"
            buttonText="객실예약"
            subFix="박"
            {...sample}
          />
        </div>
      </div>
    )
  }
}

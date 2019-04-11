import React, { PureComponent } from 'react'
import { NumericSpinner } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  state = {
    item1: 0,
    item2: 0,
  }

  render() {
    const { item1, item2 } = this.state

    return (
      <>
        <div className="numeric-container">
          <NumericSpinner
            label="성인"
            value={item1}
            min={1}
            max={10}
            borderless
            size="big"
            onChange={(value) => {
              this.setState({
                item1: value,
              })
            }}
            padding={{ top: 30, bottom: 30, left: 10, right: 10 }}
          />
          <NumericSpinner
            label="어린이"
            sublabel="29,000원"
            strikeLabel="32,000원"
            value={item2}
            min={2}
            max={5}
            onChange={(value) => {
              this.setState({
                item2: value,
              })
            }}
            padding={{ top: 15, bottom: 15, left: 15, right: 15 }}
          />
        </div>
      </>
    )
  }
}

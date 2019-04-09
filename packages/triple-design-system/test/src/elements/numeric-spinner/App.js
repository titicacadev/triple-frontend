import React, { PureComponent } from 'react'
import { NumericSpinner } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  state = {
    amount: [
      {
        name: '성인',
        value: 0,
        min: 1,
        max: 10,
      },
      {
        name: '아동',
        value: 0,
        min: 2,
        max: 5,
      },
    ],
  }

  render() {
    return (
      <div className="modal-container">
        {this.state.amount.map(({ name, value, min, max }, idx) => (
          <NumericSpinner
            label={name}
            value={value}
            min={min}
            max={max}
            key={idx}
            onChange={(value) => {
              this.setState({
                amount: this.state.amount.map((item) => {
                  if (item.name === name) {
                    return { ...item, value }
                  }
                  return item
                }),
              })
            }}
          />
        ))}
      </div>
    )
  }
}

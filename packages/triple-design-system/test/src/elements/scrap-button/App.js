import React, { PureComponent } from 'react'
import { ScrapButton } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <ScrapButton compact pressed className="compact-pressed" />
        <ScrapButton compact className="compact-not-pressed" />
        <ScrapButton pressed className="regular-pressed" />
        <ScrapButton className="regular-not-pressed" />
      </div>
    )
  }
}

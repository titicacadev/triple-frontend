import React, { PureComponent } from 'react'
import { Navbar } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Navbar className="navbar">
          <Navbar.Item floated="left" className="back-btn" icon="back" />
          <Navbar.Item floated="right" className="more-btn" icon="more" />
        </Navbar>
      </div>
    )
  }
}

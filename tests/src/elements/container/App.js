import React, { PureComponent } from 'react'
import { Container } from '@titicaca/triple-design-system'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Container className="default-container" />
        <Container position="relative" className="relative-container" />
        <Container position="absolute" className="absolute-container" />
        <Container position="fixed" className="fixed-container" />
        <Container position="sticky" className="sticky-container" />
      </div>
    )
  }
}

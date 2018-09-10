import React, { Component } from 'react'
import { TripleDocument } from '@titicaca/triple-design-system/src'
import sample from './sample.json'

export default class App extends Component {
  render() {
    return (
      <div>
        <TripleDocument>{sample}</TripleDocument>
      </div>
    )
  }
}

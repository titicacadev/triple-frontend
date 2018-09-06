import React, { Component } from 'react'
import { Article } from '@titicaca/triple-design-system/src'
import sample from './sample.json'

export default class App extends Component {
  render() {
    return (
      <div>
        <Article>
          {sample.body}
        </Article>
      </div>
    )
  }
}

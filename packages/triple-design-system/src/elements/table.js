import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

export default class Table extends PureComponent {
  render() {
    const {
      props: { row, coll },
    } = this

    if (row) {
      return <div> Hello </div>
    }

    if (coll) {
      return <div> Hello </div>
    }
  }
}

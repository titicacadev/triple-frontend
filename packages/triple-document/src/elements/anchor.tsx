import React from 'react'
import styled from 'styled-components'

interface Props {
  value: {
    elementId: string
  }
}

const Element = styled.div`
  height: 0px;
`

export default function BaseAnchor({ value }: Props) {
  const { elementId } = value

  return <Element id={elementId}></Element>
}

import React from 'react'
import styled from 'styled-components'

interface Props {
  value: {
    href: string
  }
}

const Element = styled.div`
  height: 0px;
`

export default function BaseAnchor({ value }: Props) {
  const { href } = value

  return <Element id={href}></Element>
}

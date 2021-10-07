import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
`

interface Props {
  children?: React.ReactNode
}

function StickyHeader({ children }: Props) {
  return <StyledHeader>{children}</StyledHeader>
}

export default StickyHeader

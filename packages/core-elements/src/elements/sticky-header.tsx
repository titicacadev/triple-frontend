import React from 'react'
import styled from 'styled-components'

import { layeringMixin, LayeringMixinProps } from '../mixins'

const StyledHeader = styled.header<LayeringMixinProps>`
  position: sticky;
  top: 0;
  ${layeringMixin(10)}
`

export type StickyHeaderProps = React.PropsWithChildren<LayeringMixinProps>

function StickyHeader({ children, zIndex, zTier }: StickyHeaderProps) {
  return (
    <StyledHeader zIndex={zIndex} zTier={zTier}>
      {children}
    </StyledHeader>
  )
}

export default StickyHeader

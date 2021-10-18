import React from 'react'
import styled from 'styled-components'

import { layeringMixin, LayeringMixinProps } from '../mixins'

const StyledHeader = styled.header<LayeringMixinProps>`
  position: sticky;
  top: 0;
  ${layeringMixin(0)}
`

export type StickyHeaderProps = React.PropsWithChildren<LayeringMixinProps>

function StickyHeader({ children, zIndex = 3, zTier }: StickyHeaderProps) {
  return (
    <StyledHeader zIndex={zIndex} zTier={zTier}>
      {children}
    </StyledHeader>
  )
}

export default StickyHeader

import React from 'react'
import styled from 'styled-components'

import { CSSProps } from '../css'
import { layeringMixin, LayeringMixinProps } from '../mixins'

import Container from './container'

const StyledContainer = styled(Container)`
  position: sticky;
  top: 0;
  ${layeringMixin(0)}
`

export type StickyHeaderProps = React.PropsWithChildren<
  CSSProps & LayeringMixinProps
>

function StickyHeader({
  css,
  zIndex,
  zTier,
  children,
  ...props
}: StickyHeaderProps) {
  return (
    <StyledContainer
      as="header"
      css={css}
      zIndex={zIndex}
      zTier={zTier}
      {...props}
    >
      {children}
    </StyledContainer>
  )
}

export default StickyHeader

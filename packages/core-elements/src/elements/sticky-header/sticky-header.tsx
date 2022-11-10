import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { CSSProps } from '../../css'
import { layeringMixin, LayeringMixinProps } from '../../mixins'
import { Container } from '../container'

const StyledContainer = styled(Container)`
  position: sticky;
  top: 0;
  ${layeringMixin(0)}

  ${({ css }: CSSProps) => css}
`

export type StickyHeaderProps = PropsWithChildren<CSSProps & LayeringMixinProps>

export function StickyHeader({
  css,
  zIndex = 3,
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

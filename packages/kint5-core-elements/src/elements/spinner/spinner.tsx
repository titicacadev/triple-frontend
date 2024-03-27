import { ReactNode } from 'react'
import { TRIPLE_FALLBACK_ACTION_CLASS_NAME } from '@titicaca/triple-fallback-action'
import styled, { css } from 'styled-components'

import { layeringMixin, LayeringMixinProps } from '../../mixins'

import { Loading } from './loading'

const Container = styled.div<{ full?: boolean } & LayeringMixinProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: table;

  ${layeringMixin(10)}

  ${({ full }) =>
    full &&
    css`
      background-color: rgb(255, 255, 255);
    `};
`

const Wrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`

export function Spinner({
  full,
  children,
  zTier,
  zIndex,
  disableDefaultIcon = false,
}: {
  full?: boolean
  children?: ReactNode
  disableDefaultIcon?: boolean
} & LayeringMixinProps) {
  return (
    <Container full={full} zTier={zTier} zIndex={zIndex}>
      <Wrapper className={TRIPLE_FALLBACK_ACTION_CLASS_NAME}>
        {disableDefaultIcon ? null : <Loading />}
        {children}
      </Wrapper>
    </Container>
  )
}

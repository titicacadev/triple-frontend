import { ReactNode } from 'react'
import { TRIPLE_FALLBACK_ACTION_CLASS_NAME } from '@titicaca/triple-fallback-action'
import styled, { css, keyframes } from 'styled-components'

import { layeringMixin, LayeringMixinProps } from '../../mixins'

const loadingAnimation = keyframes`
  100% {
    background-position: -1740px;
  }
`

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

const Icon = styled.div`
  margin: 0 auto;
  width: 58px;
  height: 58px;
  background-image: url('https://assets.triple.guide/images/ico-spinner.png');
  background-size: 1740px 58px;
  animation: ${loadingAnimation} 1s steps(30) infinite;
`

export default function Spinner({
  full,
  children,
  zTier,
  zIndex,
}: {
  full?: boolean
  children?: ReactNode
} & LayeringMixinProps) {
  return (
    <Container full={full} zTier={zTier} zIndex={zIndex}>
      <Wrapper className={TRIPLE_FALLBACK_ACTION_CLASS_NAME}>
        <Icon />
        {children}
      </Wrapper>
    </Container>
  )
}

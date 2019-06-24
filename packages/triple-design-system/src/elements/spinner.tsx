import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

const loadingAnimation = keyframes`
  100% {
    background-position -1740px;
  }
`

const Container = styled.div<{ full?: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: table;

  ${({ full }) =>
    full &&
    css`
      background-color: rgb(255, 255, 255);
    `};
`

const Wrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const Icon = styled.div`
  margin: 0 auto;
  width: 58px;
  height: 58px;
  background-image: url('https://assets.triple.guide/images/ico-spinner.png');
  background-size: 1740px 58px;
  animation: ${loadingAnimation} 1s steps(30) infinite;
`

export default function Spinner({ full }: { full?: boolean }) {
  return (
    <Container full={full}>
      <Wrapper>
        <Icon />
      </Wrapper>
    </Container>
  )
}

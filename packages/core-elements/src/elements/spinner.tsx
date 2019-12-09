import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

const loadingAnimation = keyframes`
  100% {
    background-position -1740px;
  }
`

const FixedContianer = styled.div<{ clickThrough?: boolean; alpha?: number }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: table;
  background-color: rgb(255, 255, 255, ${({ alpha }) => alpha || 0});
`

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
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
  clickThrough,
  alpha,
  children,
}: {
  alpha?: number
  clickThrough?: boolean
  children?: React.ReactNode
}) {
  const Container = clickThrough ? React.Fragment : FixedContianer

  return (
    <Container clickThrough={clickThrough} alpha={alpha}>
      <Wrapper>
        <Icon />
        {children}
      </Wrapper>
    </Container>
  )
}

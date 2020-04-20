import React from 'react'
import styled, { css } from 'styled-components'
import { Container } from '@titicaca/core-elements'

const CardContainer = styled(Container)<{
  cardHeight: number
  sideSpacing: number
}>`
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  ${({ cardHeight, sideSpacing }) => css`
    width: calc(100vw - ${sideSpacing * 2}px);
    height: ${cardHeight}px;
  `}
`

export default function Card(props: Parameters<typeof CardContainer>[0]) {
  return <CardContainer display="block" borderRadius={6} {...props} />
}

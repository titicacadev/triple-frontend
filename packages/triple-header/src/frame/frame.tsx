import { ComponentType } from 'react'
import { Container } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

import { FrameData } from '../types'
import { FRAMES } from '../frame'

const FrameContainer = styled(Container)<{
  widthRatio: number
  heightRatio: number
}>`
  width: 100%;
  height: 0;
  margin: 0 auto;

  ${({ heightRatio }) =>
    heightRatio &&
    css`
      padding: ${heightRatio}% 0 0 0;
      position: relative;
    `}

  ${({ widthRatio }) =>
    widthRatio &&
    css`
      max-width: ${widthRatio}%;
    `}
`

export default function Frame({
  frame: { type, width, height, value, effect },
  calculateFrameRatio,
}: {
  frame: FrameData
  calculateFrameRatio: (length?: number) => number
}) {
  const FrameElement = FRAMES[type] as ComponentType<Omit<FrameData, 'type'>>

  const widthRatio = calculateFrameRatio(width)
  const heightRatio = calculateFrameRatio(height)

  return (
    <FrameContainer widthRatio={widthRatio} heightRatio={heightRatio}>
      <FrameElement value={value} effect={effect} />
    </FrameContainer>
  )
}

import React from 'react'
import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'

/**
 * HACK: bottom 디자인상 여백 + 레일의 높이 값
 */
const IndecatorFrame = styled.div<{ handlerBorderWeight: number }>`
  position: absolute;
  left: 0;
  right: 0;

  ${({ railHeight }) => `
  bottom: -${railHeight + 6}px;
  `}
`

function Indecator({
  min,
  max,
  railHeight,
}: {
  min: number
  max: number
  railHeight: number
}) {
  return (
    <IndecatorFrame railHeight={railHeight}>
      <Text size="tiny" color="gray200" floated="left">
        {min}
      </Text>
      <Text size="tiny" color="gray200" floated="right">
        {max}
      </Text>
    </IndecatorFrame>
  )
}

export default Indecator

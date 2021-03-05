import React from 'react'
import styled from 'styled-components'
import { Stack } from '@titicaca/core-elements'

export default {
  title: 'Core-Elements / Stack',
}

const VerticalContainer = styled.div`
  border: 1px solid black;
`

const HorizontalContainer = styled.div`
  border: 1px solid black;
  width: 200px;
  overflow-y: auto;
  white-space: nowrap;
`

const Box = styled.div`
  border: 1px solid red;
  width: 50px;
  height: 50px;
  margin: 10px;
`

const Box2 = styled(Box)`
  position: relative;
  display: inline-block;
`

export function StackBasic() {
  return (
    <VerticalContainer>
      <Stack vertical>
        <Box />
        <Box />
        <Box />
      </Stack>
    </VerticalContainer>
  )
}

export function StackHorizontal() {
  return (
    <HorizontalContainer>
      <Stack horizontal>
        <Box2 />
        <Box2 />
        <Box2 />
        <Box2 />
        <Box2 />
        <Box2 />
      </Stack>
    </HorizontalContainer>
  )
}

export function StackVertical() {
  return (
    <VerticalContainer>
      <Stack vertical>
        <Box />
        <Box />
        <Box />
      </Stack>
    </VerticalContainer>
  )
}

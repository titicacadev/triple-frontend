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
  width: 100px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  font-size: 0.825rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box2 = styled(Box)`
  position: relative;
  display: inline-block;
`

export function StackBasic() {
  return (
    <>
      <p>
        보통 POI 목록이나 상품목록 등과 같이 세로 나열형 아이템을 표시할 때 상하
        여백(padding, margin) 을 0으로 초기화 하기 위한 컴포넌트 입니다.
      </p>
      <br />

      <VerticalContainer>
        <Stack>
          <Box>margin: 10px</Box>
          <Box />
          <Box />
        </Stack>
      </VerticalContainer>
    </>
  )
}

export function StackHorizontal() {
  return (
    <>
      <p>
        가로 나열형 아이템을 표시할 때 좌우 여백(padding, margin) 을 0으로
        초기화 하기 위한 컴포넌트 입니다.
        <br />
        <code>horizontal</code> 속성을 부여하므로써 좌우 여백을 0으로 초기화하게
        됩니다.
      </p>
      <br />

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
    </>
  )
}

export function StackVertical() {
  return (
    <>
      <p>
        세로 나열형 아이템을 표시할 때 상하 여백(padding, margin) 을 0으로
        초기화 하기 위한 컴포넌트 입니다.
        <br />
        <code>vertical</code> 속성을 부여하므로써 상하 여백을 0으로 초기화하게
        됩니다.
      </p>
      <br />

      <VerticalContainer>
        <Stack vertical>
          <Box />
          <Box />
          <Box />
        </Stack>
      </VerticalContainer>
    </>
  )
}

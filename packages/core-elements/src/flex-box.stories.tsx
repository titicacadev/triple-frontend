import styled from 'styled-components'

import Container from './elements/container'
import FlexBox from './elements/flex-box'
import Text from './elements/text'

export default {
  title: 'Core-Elements / FlexBox',
  components: FlexBox,
}

const Section = styled(Container)`
  padding: 50px;
`

const Summary = styled(Text)`
  font-size: 15px;
  margin-bottom: 30px;
`

const Item = styled(FlexBox.Item)`
  border: 2px solid #e91e63;
  padding: 10px;
  border-radius: 10px;
`

export const Flex = () => {
  return (
    <Section>
      <Summary>
        flex 속성을 추가하면 display: flex 가 적용됩니다. <br />
        FlexBox 는 Container 를 상속받아 구성되어있기 때문에 Container 의 Prop
        을 그대로 이용 할 수 있습니다.
        <br />
        flex children 요소가 사용 가능한 flex, flexGrow, flexShrink, flexBasis,
        alignSelf, order는 중첩된 구조의 flex 사용 시에만 사용 권장합니다.
      </Summary>
      <FlexBox flex>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const FlexItem = () => {
  return (
    <Section>
      <Summary>
        FlexBox 내부에 Item이 있을 경우 FlexBox가 아닌 FlexBox.Item으로 사용할
        수 있습니다.
        <br />
        flex children 요소가 사용 가능한 flex, flexGrow, flexShrink, flexBasis,
        alignSelf, order가 사용 가능합니다.
        <br />
        이외의 스타일은 css prop으로 사용합니다.
      </Summary>
      <FlexBox flex>
        <FlexBox.Item
          order={3}
          css={`
            border: 2px solid #e91e63;
            padding: 10px;
            border-radius: 10px;
          `}
        >
          Item1 (order=3)
        </FlexBox.Item>
        <FlexBox.Item>Item2</FlexBox.Item>
        <FlexBox.Item>Item3</FlexBox.Item>
      </FlexBox>
    </Section>
  )
}

export const FlexGrow = () => {
  return (
    <Section>
      <Summary>
        flexGrow 는 컨테이너 요소 내부에서 할당 가능한 공간의 정도를 선언합니다.
      </Summary>
      <FlexBox flex>
        <Item flexGrow={1}>Item1</Item>
        <Item flexGrow={1}>Item2</Item>
        <Item flexGrow={1}>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const Order = () => {
  return (
    <Section>
      <Summary>order를 이용하여 컴포넌트 순서를 조절 할 수 있습니다.</Summary>
      <FlexBox flex>
        <Item order={3}>Item1</Item>
        <Item order={2}>Item2</Item>
        <Item order={1}>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const FlexShrink = () => {
  return (
    <Section>
      <Summary>
        컨테이너에 속한 아이템 크기가 컨테이너 보다 클 때 flexShrink 를 이용하면
        값에 따라 컨테이너에 맞게 축소됩니다.
      </Summary>
      <FlexBox
        flex
        css={{
          width: 300,
        }}
      >
        <Item flexBasis="500px" flexShrink={1}>
          Item1
        </Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const FlexDirection = () => {
  return (
    <Section>
      <Summary>
        아이템을 배치할 때 사용할 주축 및 방향(정방향, 역방향)을 지정합니다.
      </Summary>
      <FlexBox flex flexDirection="row">
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const FlexWrap = () => {
  return (
    <Section>
      <Summary>
        컨테이너 내부의 아이템들을 강제로 한줄에 배치되게 할 것인지, 또는 가능한
        영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정하는
        속성입니다.
      </Summary>
      <FlexBox
        flex
        flexWrap="wrap"
        css={{
          width: 200,
        }}
      >
        <Item
          css={{
            width: 100,
          }}
        >
          Item1
        </Item>
        <Item
          css={{
            width: 100,
          }}
        >
          Item2
        </Item>
        <Item
          css={{
            width: 100,
          }}
        >
          Item3
        </Item>
      </FlexBox>
    </Section>
  )
}

export const JustifyContent = () => {
  return (
    <Section>
      <Summary>JustifyContent 는 주축 정렬을 제어합니다.</Summary>
      <FlexBox flex flexDirection="row" justifyContent="space-between">
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const AlignItems = () => {
  return (
    <Section>
      <Summary>align-items 는 교차축 정렬을 제어합니다.</Summary>
      <FlexBox flex flexDirection="column" alignItems="center">
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    </Section>
  )
}

export const Gap = () => {
  return (
    <Section>
      <Summary>Gap은 행과 열 사이의 간격(거터)을 설정합니다.</Summary>
      <FlexBox flex gap="10px">
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    </Section>
  )
}

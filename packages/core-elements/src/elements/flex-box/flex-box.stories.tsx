/* eslint-disable @typescript-eslint/naming-convention */
import styled from 'styled-components'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FlexBox, FlexBoxItem } from '../flex-box'

export default {
  title: 'Core-Elements / FlexBox',
  components: FlexBox,
  subcomponents: {
    FlexBoxItem,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Flex로 레이아웃 구성이 필요할 때 사용합니다.\n * FlexBox 는 Container 를 상속받아 구성되어있기 때문에 Container 의 Prop을 그대로 이용 할 수 있습니다.\n * flex children 요소가 사용 가능한 flex, flexGrow, flexShrink, flexBasis, alignSelf, order는 중첩된 구조의 flex 사용 시에만 사용 권장합니다.',
      },
    },
  },
} as ComponentMeta<typeof FlexBox>

const Item = styled(FlexBoxItem)`
  border: 2px solid #e91e63;
  padding: 10px;
  border-radius: 10px;
`

export const Flex: ComponentStory<typeof FlexBox> = (args) => {
  return (
    <FlexBox {...args}>
      <FlexBoxItem>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBoxItem>
      <FlexBoxItem>
        <Item>Item4</Item>
        <Item>Item5</Item>
        <Item>Item6</Item>
      </FlexBoxItem>
    </FlexBox>
  )
}
Flex.storyName = 'Default'
Flex.args = {
  flex: true,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'baseline',
  gap: 'normal',
  columnGap: 'normal',
  rowGap: 'normal',
}

export const FlexItem: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex>
      <FlexBoxItem
        order={3}
        css={`
          border: 2px solid #e91e63;
          padding: 10px;
          border-radius: 10px;
        `}
      >
        Item1 (order=3)
      </FlexBoxItem>
      <FlexBoxItem>Item2</FlexBoxItem>
      <FlexBoxItem>Item3</FlexBoxItem>
    </FlexBox>
  )
}

export const FlexGrow: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex>
      <Item flexGrow={1}>Item1</Item>
      <Item flexGrow={1}>Item2</Item>
      <Item flexGrow={1}>Item3</Item>
    </FlexBox>
  )
}

export const Order: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex>
      <Item order={3}>Item1</Item>
      <Item order={2}>Item2</Item>
      <Item order={1}>Item3</Item>
    </FlexBox>
  )
}

export const FlexShrink: ComponentStory<typeof FlexBox> = () => {
  return (
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
  )
}

export const FlexDirection: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex flexDirection="row">
      <Item>Item1</Item>
      <Item>Item2</Item>
      <Item>Item3</Item>
    </FlexBox>
  )
}

export const FlexWrap: ComponentStory<typeof FlexBox> = () => {
  return (
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
  )
}

export const JustifyContent: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex flexDirection="row" justifyContent="space-between">
      <Item>Item1</Item>
      <Item>Item2</Item>
      <Item>Item3</Item>
    </FlexBox>
  )
}

export const AlignItems: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex flexDirection="column" alignItems="center">
      <Item>Item1</Item>
      <Item>Item2</Item>
      <Item>Item3</Item>
    </FlexBox>
  )
}

export const Gap: ComponentStory<typeof FlexBox> = () => {
  return (
    <FlexBox flex gap="10px">
      <Item>Item1</Item>
      <Item>Item2</Item>
      <Item>Item3</Item>
    </FlexBox>
  )
}

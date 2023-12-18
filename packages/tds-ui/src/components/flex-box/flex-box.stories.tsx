import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { FlexBox, FlexBoxItem } from '../flex-box'

const meta: Meta<typeof FlexBox> = {
  title: 'tds-ui / FlexBox',
  component: FlexBox,
  parameters: {
    docs: {
      description: {
        component:
          'Flex로 레이아웃 구성이 필요할 때 사용하는 뷰 컴포넌트입니다.\n * FlexBox 는 Container 를 상속받아 구성되어있기 때문에 Container 의 Prop을 그대로 이용 할 수 있습니다.\n * flex children 요소가 사용 가능한 flex, flexGrow, flexShrink, flexBasis, alignSelf, order는 중첩된 구조의 flex 사용 시에만 사용 권장합니다.',
      },
    },
  },
}

export default meta

const Item = styled(FlexBoxItem)`
  border: 2px solid #e91e63;
  padding: 10px;
  border-radius: 10px;
`

type Story = StoryObj<typeof FlexBox>

export const Flex: Story = {
  name: '기본',
  args: {
    flex: true,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'baseline',
    gap: 'normal',
    columnGap: 'normal',
    rowGap: 'normal',
  },
  render: (args) => {
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
  },
}

export const FlexItem: Story = {
  name: '커스텀 (FlexItem)',
  args: {
    flex: true,
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <FlexBoxItem
          css={`
            border: 2px solid #e91e63;
            padding: 10px;
            border-radius: 10px;
          `}
        >
          Item1
        </FlexBoxItem>
        <FlexBoxItem>Item2</FlexBoxItem>
        <FlexBoxItem>Item3</FlexBoxItem>
      </FlexBox>
    )
  },
}

export const Grow: Story = {
  name: '커스텀 (FlexGrow)',
  args: {
    flex: true,
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <Item flexGrow={1}>Item1</Item>
        <Item flexGrow={1}>Item2</Item>
        <Item flexGrow={1}>Item3</Item>
      </FlexBox>
    )
  },
}

export const Order: Story = {
  name: '커스텀 (FlexOrder)',
  args: {
    flex: true,
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <Item order={3}>Item1</Item>
        <Item order={2}>Item2</Item>
        <Item order={1}>Item3</Item>
      </FlexBox>
    )
  },
}

export const Shrink: Story = {
  name: '커스텀 (FlexShrink)',
  args: {
    flex: true,
  },
  render: (args) => {
    return (
      <FlexBox
        {...args}
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
  },
}

export const Direction: Story = {
  name: '커스텀 (FlexDirection)',
  args: {
    flex: true,
    flexDirection: 'column',
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    )
  },
}

export const Wrap: Story = {
  name: '커스텀 (FlexWrap)',
  args: {
    flex: true,
    flexWrap: 'wrap',
  },
  render: (args) => {
    return (
      <FlexBox
        {...args}
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
  },
}

export const JustifyContent: Story = {
  name: '커스텀 (JustifyContent)',
  args: {
    flex: true,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    )
  },
}

export const AlignItems: Story = {
  name: '커스텀 (AlignItems)',
  args: {
    flex: true,
    flexDirection: 'column',
    alignItems: 'center',
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    )
  },
}

export const Gap: Story = {
  name: '커스텀 (Gap)',
  args: {
    flex: true,
    gap: '10px',
  },
  render: (args) => {
    return (
      <FlexBox {...args}>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </FlexBox>
    )
  },
}

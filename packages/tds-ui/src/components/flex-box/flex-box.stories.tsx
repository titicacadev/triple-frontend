import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { FlexBox, FlexBoxItem } from '../flex-box'

const meta: Meta<typeof FlexBox> = {
  title: 'tds-ui / FlexBox',
  component: FlexBox,
  argTypes: {
    flex: { type: 'boolean' },
    flexDirection: {
      control: 'select',
      options: ['column', 'column-reverse', 'row', 'row-reverse'],
    },
    flexWrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    justifyContent: {
      control: 'select',
      options: [
        'start',
        'center',
        'end',
        'flex-start',
        'flex-end',
        'left',
        'right',
        'normal',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
        'inherit',
        'initial',
        'revert',
        'revert-layer',
        'unset',
      ],
    },
    alignItems: {
      control: 'select',
      options: [
        'inherit',
        'initial',
        'revert',
        'revert-layer',
        'unset',
        'center',
        'end',
        'flex-end',
        'flex-start',
        'self-end',
        'self-start',
        'start',
        'baseline',
        'normal',
        'stretch',
      ],
    },
    gap: { type: 'string' },
  },
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
  args: {
    flex: true,
    children: (
      <>
        <FlexBoxItem>Item1</FlexBoxItem>
        <FlexBoxItem>Item2</FlexBoxItem>
        <FlexBoxItem>Item3</FlexBoxItem>
      </>
    ),
  },
}

export const FlexItem: Story = {
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
    children: (
      <>
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
      </>
    ),
  },
}

export const Grow: Story = {
  args: {
    flex: true,
    children: (
      <>
        <Item flexGrow={1}>Item1</Item>
        <Item flexGrow={1}>Item2</Item>
        <Item flexGrow={1}>Item3</Item>
      </>
    ),
  },
}

export const Order: Story = {
  args: {
    flex: true,
    children: (
      <>
        <Item order={3}>Item1</Item>
        <Item order={2}>Item2</Item>
        <Item order={1}>Item3</Item>
      </>
    ),
  },
}

export const Shrink: Story = {
  args: {
    flex: true,
    children: (
      <>
        <Item flexBasis="500px" flexShrink={1}>
          Item1
        </Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </>
    ),
  },
}

export const Direction: Story = {
  args: {
    flex: true,
    flexDirection: 'column',
    children: (
      <>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </>
    ),
  },
}

export const Wrap: Story = {
  args: {
    flex: true,
    flexWrap: 'wrap',
    children: (
      <>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </>
    ),
  },
}

export const JustifyContent: Story = {
  args: {
    flex: true,
    flexDirection: 'row',
    justifyContent: 'space-between',
    children: (
      <>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </>
    ),
  },
}

export const AlignItems: Story = {
  args: {
    flex: true,
    flexDirection: 'column',
    alignItems: 'center',
    children: (
      <>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </>
    ),
  },
}

export const Gap: Story = {
  args: {
    flex: true,
    gap: '10px',
    children: (
      <>
        <Item>Item1</Item>
        <Item>Item2</Item>
        <Item>Item3</Item>
      </>
    ),
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { Label, LabelColor } from './label'

const meta: Meta<typeof Label> = {
  title: 'tds-ui / Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 다음 행동을 결정하도록 도와주는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  name: '기본',
  render: (args) => {
    return <Label {...args}>최신순</Label>
  },
}

export const Radio: Story = {
  name: '라디오',
  args: {
    radio: true,
  },
  render: (args) => {
    return (
      <>
        <Label {...args} selected margin={{ right: 10 }}>
          최신순
        </Label>
        <Label {...args}>인기순</Label>
      </>
    )
  },
}

const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
`

const COLORS: LabelColor[] = [
  'blue',
  'red',
  'purple',
  'orange',
  'gray',
  'green',
  'white',
  'skyblue',
  'lightpurple',
  'black',
]

const SIZES: ['tiny', 'small', 'medium', 'large'] = [
  'tiny',
  'small',
  'medium',
  'large',
]

export const Promo: Story = {
  name: '프로모션',
  args: {
    promo: true,
  },
  render: (args) => {
    return (
      <>
        <div>색상</div>
        <LabelContainer>
          {COLORS.map((color, idx) => (
            <Label {...args} key={idx} color={color} size="large">
              {color}
            </Label>
          ))}
        </LabelContainer>

        <div>글자 크기</div>
        <LabelContainer>
          {SIZES.map((size, idx) => (
            <Label {...args} key={idx} size={size}>
              {size}
            </Label>
          ))}
        </LabelContainer>
      </>
    )
  },
}

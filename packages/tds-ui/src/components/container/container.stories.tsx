import type { Meta, StoryObj } from '@storybook/react'

import { Container } from './container'

const meta: Meta<typeof Container> = {
  title: 'tds-ui / Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component:
          '레이아웃 구성 시 컴포넌트를 묶거나 스타일을 추가할 때 사용하는 뷰 컴포는넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: { children: 'Basic Container' },
}

export const Custom: Story = {
  args: {
    borderRadius: 10,
  },
  render: (args) => {
    return (
      <Container
        css={{ padding: 50, backgroundColor: 'gray', color: 'white' }}
        {...args}
      >
        Custom CSS Container
      </Container>
    )
  },
}

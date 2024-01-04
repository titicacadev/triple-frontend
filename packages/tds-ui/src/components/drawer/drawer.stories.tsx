import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { Container } from '../container'
import { Text } from '../text'

import { Drawer } from './drawer'

const meta: Meta<typeof Drawer> = {
  title: 'tds-ui / Drawer',
  component: Drawer,
  args: {
    duration: 300,
    overflow: 'hidden',
  },
  argTypes: {
    active: { type: 'boolean' },
    duration: { type: 'number' },
    overflow: {
      control: 'radio',
      options: ['visible', 'clip', 'scroll', 'auto', 'hidden'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: '하단에서 올라오는 버튼 형식의 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  args: {
    active: true,
    children: (
      <Button fluid borderRadius={0}>
        결제하기
      </Button>
    ),
  },
}

export const Custom: Story = {
  args: {
    active: true,
    children: (
      <Container clearing>
        <Container floated="left">
          <Text color="blue" size="mini" margin={{ top: 7, bottom: 4 }}>
            트리플 클럽가
          </Text>
          <Text size="large" bold>
            50,000원
          </Text>
        </Container>
        <Container floated="right">
          <Button borderRadius={4}>객실예약</Button>
        </Container>
      </Container>
    ),
  },
}

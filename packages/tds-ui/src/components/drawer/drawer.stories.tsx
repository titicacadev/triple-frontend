import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Button } from '../button'
import { Container } from '../container'
import { Text } from '../text'

import { Drawer } from './drawer'

const meta: Meta<typeof Drawer> = {
  title: 'tds-ui / Drawer',
  component: Drawer,
  args: {
    active: true,
  },
  parameters: {
    docs: {
      description: {
        component: '하단에서 올라오는 버튼 형식의 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  name: '기본',
  render: function Render(args) {
    const [{ active }, updateArgs] = useArgs()

    const onToggle = () => {
      return updateArgs({ active: !active })
    }

    return (
      <>
        <Button onClick={onToggle}>Drawer {active ? '닫기' : '열기'}</Button>

        <Drawer {...args}>
          <Button fluid borderRadius={0}>
            결제하기
          </Button>
        </Drawer>
      </>
    )
  },
}

export const PriceInfoDrawer: Story = {
  name: '커스텀 (가격정보)',
  render: function Render(args) {
    const [{ active }, updateArgs] = useArgs()

    const onToggle = () => {
      return updateArgs({ active: !active })
    }

    return (
      <>
        <Button onClick={onToggle}>Drawer {active ? '닫기' : '열기'}</Button>

        <Drawer {...args}>
          <Container
            clearing
            css={{
              padding: '10px 25px 10px 30px',
            }}
          >
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
        </Drawer>
      </>
    )
  },
  args: {
    active: true,
  },
}

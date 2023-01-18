import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Container } from '../container'
import { Text } from '../text'

import { Drawer } from './drawer'

export default {
  title: 'core-elements / Drawer',
  component: Drawer,
} as Meta

export const ButtonDrawer: ComponentStory<typeof Drawer> = (args) => {
  return (
    <Drawer {...args}>
      <Button fluid borderRadius={0}>
        결제하기
      </Button>
    </Drawer>
  )
}
ButtonDrawer.storyName = '버튼'
ButtonDrawer.args = {
  active: true,
}

export const PriceInfoDrawer: ComponentStory<typeof Drawer> = (args) => {
  return (
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
  )
}
PriceInfoDrawer.storyName = '가격정보'
PriceInfoDrawer.args = {
  active: true,
}

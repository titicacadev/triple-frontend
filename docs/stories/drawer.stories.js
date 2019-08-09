import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import { Button, Container, Drawer, Text } from '@titicaca/triple-design-system'

storiesOf('Drawer', module)
  .add('버튼', () => (
    <Drawer active={boolean('활성', true)}>
      <Button fluid borderRadius={'0'}>
        결제하기
      </Button>
    </Drawer>
  ))
  .add('가격정보', () => (
    <Drawer active={boolean('활성', true)}>
      <Container
        clearing
        padding={{ top: 10, right: 25, bottom: 10, left: 30 }}
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
  ))

import React from 'react'

import { storiesOf } from '@storybook/react'

import { Text, Modal } from '@titicaca/triple-design-system'

storiesOf('Modal', module).add('일반', () => (
  <Modal open>
    <Text
      center
      size="large"
      lineHeight={1.38}
      color="gray"
      padding={{ top: 40, bottom: 40, left: 30, right: 30 }}
    >
      안녕
    </Text>
    <Modal.Actions>
      <Modal.Action color="blue">확인</Modal.Action>
      <Modal.Action>취소</Modal.Action>
    </Modal.Actions>
  </Modal>
))

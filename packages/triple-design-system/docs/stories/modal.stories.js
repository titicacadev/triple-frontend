import React from 'react'

import { storiesOf } from '@storybook/react'

import { Text, Modal, Confirm } from '@titicaca/triple-design-system'

storiesOf('Modal', module)
  .add('일반', () => (
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
    </Modal>
  ))
  .add('컨펌', () => (
    <Confirm open>
      삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
    </Confirm>
  ))

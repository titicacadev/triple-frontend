import { Text } from '@titicaca/core-elements'
import { Meta } from '@storybook/react'

import Modal from './modal-base'
import { Alert, Confirm } from './modals'

export default {
  title: 'modals / Modal',
  component: Modal,
} as Meta

export function BaseModal() {
  return (
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
  )
}

BaseModal.storyName = 'Modal'

export function BaseConfirm() {
  return (
    <Confirm open>
      삭제하겠습니까? 삭제하면 적립된 리뷰 포인트도 함께 사라집니다.
    </Confirm>
  )
}

BaseConfirm.storyName = 'Confirm'

export function BaseAlert() {
  return (
    <Alert
      title="장애공지
    타이틀이 두줄일수도"
      open
    >
      실시간 객실정보가 변경되어 안내드려요.
    </Alert>
  )
}

BaseAlert.storyName = 'Alert'

import React from 'react'
import styled from 'styled-components'
import Text from '../elements/text'
import Modal from '../elements/modal'

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 40px auto 10px auto;
`

const MESSAGES_BY_TYPES = {
  scrap: {
    title: '저장은 앱에서만 가능해요',
    description: '가고 싶은 장소를 저장하고, 여행할 때 실시간으로 꺼내 보세요.',
  },
}

const ICONS = {
  scrap: 'https://assets.triple.guide/images/img-heart@4x.png',
}

export function TransitionModal({
  open,
  messageType,
  onClose,
  onCancel,
  onConfirm,
}) {
  const { title, description } = MESSAGES_BY_TYPES[messageType] || {}

  return title ? (
    <Modal open={open} onClose={onClose}>
      <IconImage src={ICONS[messageType]} />
      <Text bold center size="big" color="gray">
        {title}
      </Text>
      <Text
        center
        alpha={0.7}
        size="small"
        margin={{ top: 10, bottom: 40, left: 30, right: 30 }}
      >
        {description}
      </Text>

      <Modal.Actions>
        <Modal.Action
          color="gray"
          onClick={() => {
            onCancel && onCancel()
            onClose && onClose()
          }}
        >
          취소
        </Modal.Action>
        <Modal.Action
          color="blue"
          onClick={() => {
            onConfirm && onConfirm()
            onClose && onClose()
          }}
        >
          트리플가기
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  ) : null
}

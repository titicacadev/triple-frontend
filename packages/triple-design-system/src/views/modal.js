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

function Actions({
  negative: { text: negativeText, onClick: onNegativeClick },
  positive: { text: positiveText, onClick: onPositiveClick },
}) {
  return (
    <Modal.Actions>
      <Modal.Action color="gray" onClick={onNegativeClick}>
        {negativeText}
      </Modal.Action>
      <Modal.Action color="blue" onClick={onPositiveClick}>
        {positiveText}
      </Modal.Action>
    </Modal.Actions>
  )
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

      <Actions
        negative={{
          text: '취소',
          onClick: () =>
            onCancel
              ? !onCancel() && onClose && onClose()
              : onClose && onClose(),
        }}
        positive={{
          text: '트리플가기',
          onClick: () =>
            onConfirm
              ? !onConfirm() && onClose && onClose()
              : onClose && onClose(),
        }}
      />
    </Modal>
  ) : null
}

export function Confirm({
  children,
  open,
  onClose,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Text
        center
        size="large"
        lineHeight={1.38}
        color="gray"
        padding={{ top: 40, bottom: 40, left: 30, right: 30 }}
      >
        {children}
      </Text>

      <Actions
        negative={{
          text: cancelText || '취소',
          onClick: () =>
            onCancel
              ? !onCancel() && onClose && onClose()
              : onClose && onClose(),
        }}
        positive={{
          text: confirmText || '확인',
          onClick: () =>
            onConfirm
              ? !onConfirm() && onClose && onClose()
              : onClose && onClose(),
        }}
      />
    </Modal>
  )
}

export function Alert({ children, open, onClose, confirmText, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Text
        center
        size="large"
        lineHeight={1.38}
        color="gray"
        padding={{ top: 40, bottom: 40, left: 30, right: 30 }}
      >
        {children}
      </Text>
      <Modal.Actions>
        <Modal.Action
          color="blue"
          onClick={() =>
            onConfirm
              ? !onConfirm() && onClose && onClose()
              : onClose && onClose()
          }
        >
          {confirmText || '확인'}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

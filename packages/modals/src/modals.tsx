import * as React from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'
import Modal from './modal-base'

const IconImage = styled.img`
  display: block;
  width: 66px;
  height: 66px;
  margin: 40px auto 10px auto;
`

const MESSAGES_BY_TYPES: {
  scrap: {
    title: string
    description: string
  }
  review: { title: string }
  reviewWrite: { title: string }
} = {
  scrap: {
    title: '저장은 앱에서만 가능해요',
    description: '가고 싶은 장소를 저장하고, 여행할 때 실시간으로 꺼내 보세요.',
  },
  review: { title: '리뷰는 앱에서 더 편리하게\n확인할 수 있어요.' },
  reviewWrite: { title: '리뷰는 앱에서 작성할 수 있어요.' },
}

const ICONS: {
  scrap: string
  review: string
  reviewWrite: string
} = {
  scrap: 'https://assets.triple.guide/images/img-heart@4x.png',
  review: 'https://assets.triple.guide/images/ico-popup-review@4x.png',
  reviewWrite: 'https://assets.triple.guide/images/ico-popup-review@4x.png',
}

function Actions({
  negative: { text: negativeText, onClick: onNegativeClick },
  positive: { text: positiveText, onClick: onPositiveClick },
}: {
  negative: {
    text?: string
    onClick?: (e?: React.SyntheticEvent) => any
  }
  positive: {
    text?: string
    onClick?: (e?: React.SyntheticEvent) => any
  }
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

function ModalBody({
  title,
  description,
}: {
  title?: string
  description: string
}) {
  return (
    <Container padding={{ top: 40, bottom: 40, left: 30, right: 30 }}>
      {title ? (
        <Text bold center size="big" color="gray" margin={{ bottom: 10 }}>
          {title}
        </Text>
      ) : null}
      <Text center size="large" lineHeight={1.38} color="gray">
        {description}
      </Text>
    </Container>
  )
}

export function TransitionModal({
  open,
  messageType,
  onClose,
  onCancel,
  onConfirm,
}: {
  open?: boolean
  messageType?: string
  onClose?: (e?: React.SyntheticEvent) => any
  onCancel?: (e?: React.SyntheticEvent) => any
  onConfirm?: (e?: React.SyntheticEvent) => any
}) {
  const {
    title,
    description,
  }: {
    title?: string
    description?: string
  } = MESSAGES_BY_TYPES[messageType] || {}

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
          onClick: (e?: React.SyntheticEvent) =>
            onCancel
              ? !onCancel(e) && onClose && onClose(e)
              : onClose && onClose(e),
        }}
        positive={{
          text: '트리플가기',
          onClick: (e?: React.SyntheticEvent) =>
            onConfirm
              ? !onConfirm(e) && onClose && onClose(e)
              : onClose && onClose(e),
        }}
      />
    </Modal>
  ) : null
}

export function Confirm({
  children,
  title,
  open,
  onClose,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
}: {
  children?: string
  title?: string
  open?: boolean
  cancelText?: string
  confirmText?: string
  messageType?: string
  onClose?: (e?: React.SyntheticEvent) => any
  onCancel?: (e?: React.SyntheticEvent) => any
  onConfirm?: (e?: React.SyntheticEvent) => any
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBody title={title} description={children} />
      <Actions
        negative={{
          text: cancelText || '취소',
          onClick: (e?: React.SyntheticEvent) =>
            onCancel
              ? !onCancel(e) && onClose && onClose(e)
              : onClose && onClose(e),
        }}
        positive={{
          text: confirmText || '확인',
          onClick: (e?: React.SyntheticEvent) =>
            onConfirm
              ? !onConfirm(e) && onClose && onClose(e)
              : onClose && onClose(e),
        }}
      />
    </Modal>
  )
}

export function Alert({
  title,
  children,
  open,
  onClose,
  confirmText,
  onConfirm,
}: {
  children?: string
  title?: string
  open?: boolean
  confirmText?: string
  messageType?: string
  onClose?: (e?: React.SyntheticEvent) => any
  onCancel?: (e?: React.SyntheticEvent) => any
  onConfirm?: (e?: React.SyntheticEvent) => any
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBody title={title} description={children} />
      <Modal.Actions>
        <Modal.Action
          color="blue"
          onClick={(e?: React.SyntheticEvent) =>
            onConfirm
              ? !onConfirm(e) && onClose && onClose(e)
              : onClose && onClose(e)
          }
        >
          {confirmText || '확인'}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

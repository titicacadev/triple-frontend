import React from 'react'

import Modal from './modal-base'
import Actions from './actions'
import ModalBody from './body'

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
  children?: React.ReactNode
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
  children?: React.ReactNode
  title?: string
  open?: boolean
  confirmText?: string | React.ReactNode
  messageType?: string
  onClose?: (e?: React.SyntheticEvent) => any
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

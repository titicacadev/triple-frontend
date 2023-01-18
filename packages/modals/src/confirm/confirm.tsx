import { ReactNode } from 'react'

import { Modal } from '../modal'

export interface ConfirmProps {
  children?: ReactNode
  title?: string
  open?: boolean
  cancelText?: string
  confirmText?: string
  onClose?: () => void
  onCancel?: () => boolean | unknown
  onConfirm?: () => boolean | unknown
}

export const Confirm = ({
  children,
  title,
  open,
  cancelText = '취소',
  confirmText = '확인',
  onClose,
  onCancel,
  onConfirm,
}: ConfirmProps) => {
  const handleCancel = () => {
    onCancel ? !onCancel() && onClose?.() : onClose?.()
  }

  const handleConfirm = () => {
    onConfirm ? !onConfirm() && onClose?.() : onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body>
        {title && <Modal.Title>{title}</Modal.Title>}
        {children && <Modal.Description>{children}</Modal.Description>}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="gray" onClick={handleCancel}>
          {cancelText}
        </Modal.Action>
        <Modal.Action color="blue" onClick={handleConfirm}>
          {confirmText}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

import { ReactNode } from 'react'

import { Modal } from '../modal'

export interface ConfirmProps {
  children?: ReactNode
  title?: string
  open?: boolean
  cancelText?: string
  confirmText?: string
  confirmTextColor?: string
  disableConfirm?: boolean
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
  confirmTextColor = 'blue',
  disableConfirm = false,
  onClose,
  onCancel,
  onConfirm,
  ...props
}: ConfirmProps) => {
  const handleCancel = () => {
    onCancel ? !onCancel() && onClose?.() : onClose?.()
  }

  const handleConfirm = () => {
    // eslint-disable-next-line no-console
    console.log('Confirm clicked')
    if (disableConfirm) {
      return
    }
    // eslint-disable-next-line no-console
    console.log('Confirm not disabled')
    onConfirm ? !onConfirm() && onClose?.() : onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body {...props}>
        {title && <Modal.Title>{title}</Modal.Title>}
        {children && <Modal.Description>{children}</Modal.Description>}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="gray" onClick={handleCancel}>
          {cancelText}
        </Modal.Action>
        <Modal.Action
          color={confirmTextColor}
          onClick={handleConfirm}
          disabled={disableConfirm}
        >
          {confirmText}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

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
  ...props
}: ConfirmProps) => {
  const handleCancel = () => {
    onCancel ? !onCancel() && onClose?.() : onClose?.()
  }

  const handleConfirm = () => {
    onConfirm ? !onConfirm() && onClose?.() : onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body
        css={{
          backgroundColor: 'var(--color-kint5-gray20)',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
        {...props}
      >
        {title && (
          <Modal.Title
            css={{
              marginBottom: 2,
              fontSize: 17,
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            {title}
          </Modal.Title>
        )}
        {children && <Modal.Description>{children}</Modal.Description>}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="blue" onClick={handleCancel}>
          {cancelText}
        </Modal.Action>
        <Modal.Action color="red" onClick={handleConfirm}>
          {confirmText}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

import { ReactNode } from 'react'

import { Modal } from '../modal'

export interface AlertProps {
  children?: ReactNode
  title?: string
  open?: boolean
  confirmText?: ReactNode
  onClose?: () => void
  onConfirm?: () => void
}

export const Alert = ({
  children,
  title,
  open,
  confirmText = '확인',
  onClose,
  onConfirm,
}: AlertProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body>
        {title && <Modal.Title>{title}</Modal.Title>}
        {children && <Modal.Description>{children}</Modal.Description>}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="blue" onClick={onConfirm}>
          {confirmText}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

import { ReactNode } from 'react'
import { useTranslation } from '@titicaca/next-i18next'

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
  cancelText,
  confirmText,
  onClose,
  onCancel,
  onConfirm,
  ...props
}: ConfirmProps) => {
  const { t } = useTranslation('common-web')

  const handleCancel = () => {
    onCancel ? !onCancel() && onClose?.() : onClose?.()
  }

  const handleConfirm = () => {
    onConfirm ? !onConfirm() && onClose?.() : onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Body {...props}>
        {title && <Modal.Title>{title}</Modal.Title>}
        {children && <Modal.Description>{children}</Modal.Description>}
      </Modal.Body>
      <Modal.Actions>
        <Modal.Action color="blue" onClick={handleCancel}>
          {cancelText || t('cwiso')}
        </Modal.Action>
        <Modal.Action color="red" onClick={handleConfirm}>
          {confirmText || t('hwagin')}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

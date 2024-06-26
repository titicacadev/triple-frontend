import { ReactNode } from 'react'
import { useTranslation } from '@titicaca/next-i18next'

import { Modal } from '../modal'

export interface ConfirmProps {
  children?: ReactNode
  title?: string
  open?: boolean
  cancelText?: string
  confirmText?: string
  cancelColor?: 'blue' | 'red' | 'black'
  confirmColor?: 'blue' | 'red' | 'black'
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
  cancelColor = 'blue',
  confirmColor = 'red',
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
        <Modal.Action color={cancelColor} onClick={handleCancel}>
          {cancelText || t('cwiso')}
        </Modal.Action>
        <Modal.Action color={confirmColor} onClick={handleConfirm}>
          {confirmText || t('hwagin')}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

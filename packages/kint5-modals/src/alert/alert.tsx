import { ReactNode } from 'react'
import { useTranslation } from '@titicaca/next-i18next'

import { Modal } from '../modal'

export interface AlertProps {
  children?: ReactNode
  title?: string
  open?: boolean
  confirmText?: ReactNode
  onClose?: () => void
  onConfirm?: () => boolean | unknown
}

export const Alert = ({
  children,
  title,
  open,
  confirmText,
  onClose,
  onConfirm,
  ...props
}: AlertProps) => {
  const { t } = useTranslation('common-web')

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
        <Modal.Action color="blue" onClick={handleConfirm}>
          {confirmText || t('hwagin')}
        </Modal.Action>
      </Modal.Actions>
    </Modal>
  )
}

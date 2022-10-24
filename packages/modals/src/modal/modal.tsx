import { PropsWithChildren, useId } from 'react'

import { ModalAction } from './modal-action'
import { ModalActions } from './modal-actions'
import { ModalBase } from './modal-base'
import { ModalBody } from './modal-body'
import { ModalContext } from './modal-context'
import { ModalDescription } from './modal-description'
import { ModalTitle } from './modal-title'

export interface ModalProps extends PropsWithChildren {
  open?: boolean
  onClose?: () => void
}

export const Modal = ({ children, open = false, onClose }: ModalProps) => {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <ModalContext.Provider value={{ open, titleId, descriptionId, onClose }}>
      <ModalBase>{children}</ModalBase>
    </ModalContext.Provider>
  )
}

Modal.Action = ModalAction
Modal.Actions = ModalActions
Modal.Body = ModalBody
Modal.Title = ModalTitle
Modal.Description = ModalDescription

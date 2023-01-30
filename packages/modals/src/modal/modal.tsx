import { useDialog } from '@react-aria/dialog'
import { PropsWithChildren, useId, useRef } from 'react'

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
  const descriptionId = useId()
  const ref = useRef(null)

  const { dialogProps, titleProps } = useDialog(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    { 'aria-describedby': descriptionId },
    ref,
  )

  return (
    <ModalContext.Provider
      value={{
        ref,
        dialogProps,
        titleProps,
        open,
        descriptionId,
        onClose,
      }}
    >
      <ModalBase>{children}</ModalBase>
    </ModalContext.Provider>
  )
}

Modal.Action = ModalAction
Modal.Actions = ModalActions
Modal.Body = ModalBody
Modal.Title = ModalTitle
Modal.Description = ModalDescription

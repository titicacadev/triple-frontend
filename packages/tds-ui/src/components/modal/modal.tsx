import { PropsWithChildren, useId } from 'react'
import { styled, css } from 'styled-components'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'

import { Container } from '../container'
import { FlexBox } from '../flex-box'

import { ModalAction } from './modal-action'
import { ModalActions } from './modal-actions'
import { ModalBody } from './modal-body'
import { ModalContext } from './modal-context'
import { ModalDescription } from './modal-description'
import { ModalTitle } from './modal-title'

const ModalPanel = styled(Container)<{ $flexible: boolean }>`
  max-height: 100%;
  background-color: #fff;
  outline: none;
  border-radius: 6px;
  overflow: auto;
  overscroll-behavior-y: none;

  ${({ $flexible }) =>
    $flexible
      ? css`
          min-width: 295px;
        `
      : css`
          width: 295px;
        `}
`

export interface ModalProps extends PropsWithChildren {
  open?: boolean
  flexible?: boolean
  onClose?: () => void
}

export const Modal = ({
  children,
  open = false,
  flexible = false,
  onClose,
}: ModalProps) => {
  const portalId = useId()
  const labelId = useId()
  const descriptionId = useId()

  const { context, refs } = useFloating({
    open,
    onOpenChange: (open) => (open ? undefined : onClose?.()),
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })

  const { getFloatingProps } = useInteractions([dismiss, role])

  return (
    <ModalContext.Provider
      value={{
        open: context.open,
        labelId,
        descriptionId,
        onClose,
      }}
    >
      {context.open ? (
        <FloatingPortal id={portalId}>
          <FloatingOverlay
            lockScroll
            css={css`
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: rgba(58, 58, 58, 0.5);
              z-index: 9999;
            `}
          />
          <FlexBox
            flex
            alignItems="center"
            justifyContent="center"
            css={css`
              width: 100vw;
              height: 100vh;
              height: 100dvh;
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 9999;
            `}
          >
            <FloatingFocusManager
              context={context}
              initialFocus={refs.floating}
            >
              <ModalPanel
                ref={refs.setFloating}
                aria-labelledby={labelId}
                aria-describedby={descriptionId}
                aria-modal
                $flexible={flexible}
                {...getFloatingProps()}
              >
                {children}
              </ModalPanel>
            </FloatingFocusManager>
          </FlexBox>
        </FloatingPortal>
      ) : null}
    </ModalContext.Provider>
  )
}

Modal.Action = ModalAction
Modal.Actions = ModalActions
Modal.Body = ModalBody
Modal.Title = ModalTitle
Modal.Description = ModalDescription

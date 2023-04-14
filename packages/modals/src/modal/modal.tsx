import { PropsWithChildren, useId } from 'react'
import styled, { css } from 'styled-components'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { Container, FlexBox } from '@titicaca/core-elements'

import { ModalAction } from './modal-action'
import { ModalActions } from './modal-actions'
import { ModalBody } from './modal-body'
import { ModalContext } from './modal-context'
import { ModalDescription } from './modal-description'
import { ModalTitle } from './modal-title'

const ModalPanel = styled(Container)`
  width: 295px;
  max-height: 100%;
  background-color: #fff;
  outline: none;
  border-radius: 6px;
  overflow: auto;
  overscroll-behavior-y: none;
`

export interface ModalProps extends PropsWithChildren {
  open?: boolean
  onClose?: () => void
}

export const Modal = ({ children, open = false, onClose }: ModalProps) => {
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
        <FloatingPortal>
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

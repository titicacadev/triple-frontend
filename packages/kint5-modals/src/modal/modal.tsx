import { PropsWithChildren, useId } from 'react'
import styled, { css } from 'styled-components'
import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'
import { Container, FlexBox } from '@titicaca/kint5-core-elements'

import { ModalAction } from './modal-action'
import { ModalActions } from './modal-actions'
import { ModalBody } from './modal-body'
import { ModalContext } from './modal-context'
import { ModalDescription } from './modal-description'
import { ModalTitle } from './modal-title'
import { ModalOverlay } from './modal-overlay'

const ModalPanel = styled(Container)<{ $flexible: boolean }>`
  max-height: 100%;
  background-color: var(--color-kint5-gray20);
  outline: none;
  border-radius: 14px;
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
  const labelId = useId()
  const descriptionId = useId()

  const { context, refs } = useFloating({
    open,
    onOpenChange: (open) => (open ? undefined : onClose?.()),
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })

  const { getFloatingProps } = useInteractions([dismiss, role])
  const { status } = useTransitionStatus(context)

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
          <ModalOverlay transitionStatus={status} />
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

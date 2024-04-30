import { PropsWithChildren, useEffect, useId } from 'react'
import styled, { css } from 'styled-components'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
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
          min-width: 270px;
        `
      : css`
          width: 270px;
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

  const { context, elements, refs } = useFloating({
    open,
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const click = useClick(context)

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
    click,
  ])
  const { status, isMounted } = useTransitionStatus(context, { duration: 0 })

  useEffect(() => {
    const bodyStyle = document.body.style
    const isRendered = !!document.getElementById(context.floatingId)

    if (!isRendered) {
      return
    }

    if (status === 'open') {
      bodyStyle.overflow = 'hidden'
    }

    if (status === 'close') {
      bodyStyle.overflow = ''
    }

    return () => {
      // 모달이 열린 상태에서 unmount되는 경우를 처리합니다.
      // (e.g. 모달이 열린 상태에서 다른 페이지로 이동)
      if (status === 'open') {
        bodyStyle.overflow = ''
      }
    }
  }, [status, context])

  return (
    <ModalContext.Provider
      value={{
        open,
        labelId,
        descriptionId,
        onClose,
      }}
    >
      {isMounted ? (
        <FloatingPortal>
          <FloatingOverlay
            css={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(58, 58, 58, 0.7)',
              zIndex: 9999,
            }}
          />
          <FlexBox
            flex
            alignItems="center"
            justifyContent="center"
            css={{
              width: '100vw',
              height: '100dvh',
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
            ref={refs.setReference}
            {...getReferenceProps({
              onClick: (e) => {
                if (elements.floating?.contains(e.target as Node)) {
                  return
                }

                onClose?.()
              },
            })}
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

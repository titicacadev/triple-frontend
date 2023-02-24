import { PropsWithChildren, useRef } from 'react'
import { Container, FlexBox } from '@titicaca/core-elements'
import { Dialog } from '@headlessui/react'
import styled, { css } from 'styled-components'

import { ModalAction } from './modal-action'
import { ModalActions } from './modal-actions'
import { ModalBody } from './modal-body'
import { ModalContext } from './modal-context'
import { ModalDescription } from './modal-description'
import { ModalTitle } from './modal-title'

const ModalPanel = styled(Container)`
  width: 295px;
  background-color: #fff;
  outline: none;
`

export interface ModalProps extends PropsWithChildren {
  open?: boolean
  onClose?: () => void
}

export const Modal = ({ children, open = false, onClose }: ModalProps) => {
  const panelRef = useRef(null)

  if (!open) {
    return null
  }

  return (
    <ModalContext.Provider value={{ open, onClose }}>
      <Dialog open={open} initialFocus={panelRef} onClose={() => onClose?.()}>
        <Container
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
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
          `}
        >
          <Dialog.Panel
            as={ModalPanel}
            ref={panelRef}
            tabIndex={-1}
            borderRadius={6}
          >
            {children}
          </Dialog.Panel>
        </FlexBox>
      </Dialog>
    </ModalContext.Provider>
  )
}

Modal.Action = ModalAction
Modal.Actions = ModalActions
Modal.Body = ModalBody
Modal.Title = ModalTitle
Modal.Description = ModalDescription

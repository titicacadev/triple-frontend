import { PropsWithChildren } from 'react'
import { Container, FlexBox } from '@titicaca/core-elements'
import { Overlay, useModalOverlay } from '@react-aria/overlays'
import { css } from 'styled-components'
import { useOverlayTriggerState } from '@react-stately/overlays'

import { useModal } from './modal-context'
import { ModalUnderlay } from './modal-underlay'

export type ModalBaseProps = PropsWithChildren

export const ModalBase = ({ children }: ModalBaseProps) => {
  const { ref, dialogProps, open, onClose } = useModal()

  const overlayTriggerState = useOverlayTriggerState({
    isOpen: open,
    onOpenChange: (isOpen) => (isOpen ? undefined : onClose?.()),
  })

  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable: true,
    },
    overlayTriggerState,
    ref,
  )

  if (!open) {
    return null
  }

  return (
    <Overlay>
      <ModalUnderlay {...underlayProps} />
      <FlexBox
        flex
        alignItems="center"
        justifyContent="center"
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
        }}
      >
        <Container
          {...modalProps}
          {...dialogProps}
          ref={ref}
          aria-modal
          borderRadius={6}
          css={css`
            width: 295px;
            background-color: #fff;
          `}
        >
          {children}
        </Container>
      </FlexBox>
    </Overlay>
  )
}

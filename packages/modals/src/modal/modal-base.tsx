import { PropsWithChildren, useRef } from 'react'
import {
  Container,
  FlexBox,
  layeringMixin,
  Portal,
} from '@titicaca/core-elements'
import { FocusScope } from '@react-aria/focus'
import { css } from 'styled-components'
import { useOverlay } from '@react-aria/overlays'

import { silenceEvent } from '../utils/event'

import { useModal } from './modal-context'

export type ModalBaseProps = PropsWithChildren

export const ModalBase = ({ children }: ModalBaseProps) => {
  const ref = useRef(null)
  const { open, titleId, descriptionId, onClose } = useModal()

  const { overlayProps, underlayProps } = useOverlay(
    { isDismissable: true, isOpen: open, onClose },
    ref,
  )

  if (!open) {
    return null
  }

  return (
    <Portal>
      <FlexBox
        {...overlayProps}
        flex
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
        css={css`
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(58, 58, 58, 0.5);

          ${layeringMixin(99)}
        `}
      >
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <FocusScope autoFocus contain restoreFocus>
          <Container
            {...underlayProps}
            ref={ref}
            role="dialog"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            aria-modal
            borderRadius={6}
            onClick={silenceEvent}
            css={css`
              width: 295px;
              background-color: #fff;
            `}
          >
            {children}
          </Container>
        </FocusScope>
      </FlexBox>
    </Portal>
  )
}

import { Overlay, useModalOverlay } from '@react-aria/overlays'
import { PropsWithChildren, ReactNode } from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { FlexBox } from '@titicaca/core-elements'

import { useActionSheet } from './action-sheet-context'
import { ActionSheetUnderlay } from './action-sheet-underlay'
import { ActionSheetBody } from './action-sheet-body'

const TRANSITION_DURATION = 120

export interface ActionSheetBaseProps extends PropsWithChildren {
  borderRadius: number
  bottomSpacing: number
  maxContentHeight: string | number
  from: 'top' | 'bottom'
  title?: ReactNode
}

export const ActionSheetBase = ({
  children,
  borderRadius,
  bottomSpacing,
  maxContentHeight,
  from,
  title,
  ...props
}: ActionSheetBaseProps) => {
  const { ref, open, onClose } = useActionSheet()

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

  return (
    <Overlay>
      <div>
        <ActionSheetUnderlay
          {...underlayProps}
          duration={TRANSITION_DURATION}
        />
        <FlexBox
          flex
          alignItems={from === 'top' ? 'flex-start' : 'flex-end'}
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
          <ActionSheetBody
            {...modalProps}
            borderRadius={borderRadius}
            bottomSpacing={bottomSpacing}
            duration={TRANSITION_DURATION}
            maxContentHeight={maxContentHeight}
            from={from}
            title={title}
            {...props}
          >
            {children}
          </ActionSheetBody>
        </FlexBox>
      </div>
    </Overlay>
  )
}

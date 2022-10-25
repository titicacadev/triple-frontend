import { Portal } from '@titicaca/core-elements'
import { useOverlay, usePreventScroll } from '@react-aria/overlays'
import { PropsWithChildren, ReactNode, useRef } from 'react'

import { useActionSheet } from './action-sheet-context'
import { ActionSheetOverlay } from './action-sheet-overlay'
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
}: ActionSheetBaseProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const { open, onClose } = useActionSheet()

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: true,
      shouldCloseOnBlur: true,
      onClose,
    },
    sheetRef,
  )

  usePreventScroll({ isDisabled: !open })

  return (
    <Portal>
      <ActionSheetOverlay
        {...overlayProps}
        ref={overlayRef}
        duration={TRANSITION_DURATION}
      >
        <ActionSheetBody
          {...underlayProps}
          ref={sheetRef}
          borderRadius={borderRadius}
          bottomSpacing={bottomSpacing}
          duration={TRANSITION_DURATION}
          maxContentHeight={maxContentHeight}
          from={from}
          title={title}
        >
          {children}
        </ActionSheetBody>
      </ActionSheetOverlay>
    </Portal>
  )
}

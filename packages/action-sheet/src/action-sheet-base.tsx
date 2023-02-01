import { Portal } from '@titicaca/core-elements'
import { PropsWithChildren, ReactNode, useRef } from 'react'

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
  ...props
}: ActionSheetBaseProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  return (
    <Portal>
      <ActionSheetOverlay ref={overlayRef} duration={TRANSITION_DURATION}>
        <ActionSheetBody
          ref={sheetRef}
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
      </ActionSheetOverlay>
    </Portal>
  )
}

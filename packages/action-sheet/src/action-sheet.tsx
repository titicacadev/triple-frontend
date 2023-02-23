import { PropsWithChildren, ReactNode, useRef } from 'react'
import { Dialog } from '@headlessui/react'

import { ActionSheetBody } from './action-sheet-body'
import { ActionSheetContext } from './action-sheet-context'
import { ActionSheetOverlay } from './action-sheet-overlay'

const TRANSITION_DURATION = 120

export interface ActionSheetProps extends PropsWithChildren {
  open?: boolean
  title?: ReactNode
  borderRadius?: number
  bottomSpacing?: number
  from?: 'top' | 'bottom'
  maxContentHeight?: string | number
  onClose?: () => void
}

export const ActionSheet = ({
  children,
  open = false,
  title,
  borderRadius = 12,
  bottomSpacing = 13,
  from = 'bottom',
  maxContentHeight = 'calc(100vh - 256px)',
  onClose,
  ...props
}: ActionSheetProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  return (
    <ActionSheetContext.Provider value={{ open, onClose }}>
      <Dialog open={open} onClose={() => onClose?.()}>
        <ActionSheetOverlay ref={overlayRef} duration={TRANSITION_DURATION} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
        </div>
      </Dialog>
    </ActionSheetContext.Provider>
  )
}

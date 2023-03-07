import { Fragment, PropsWithChildren, ReactNode, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FlexBox } from '@titicaca/core-elements'

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
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

/**
 * ActionSheet
 */
export const ActionSheet = ({
  children,
  open = false,
  title,
  borderRadius = 12,
  bottomSpacing = 13,
  from = 'bottom',
  maxContentHeight = 'calc(100vh - 256px)',
  onClose,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: ActionSheetProps) => {
  const ref = useRef(null)
  const panelRef = useRef(null)

  return (
    <ActionSheetContext.Provider value={{ open, onClose }}>
      <Transition
        show={open}
        appear
        as={Fragment}
        beforeEnter={onEnter}
        afterEnter={onEntered}
        beforeLeave={onExit}
        afterLeave={onExited}
      >
        <Dialog
          ref={ref}
          initialFocus={panelRef}
          static
          onClose={() => onClose?.()}
        >
          <ActionSheetOverlay duration={TRANSITION_DURATION} />
          <FlexBox flex justifyContent="center">
            <ActionSheetBody
              panelRef={panelRef}
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
        </Dialog>
      </Transition>
    </ActionSheetContext.Provider>
  )
}

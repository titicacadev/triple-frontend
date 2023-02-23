import { PropsWithChildren, ReactNode, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { Transition } from 'react-transition-group'
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
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Transition
      in={open}
      nodeRef={ref}
      timeout={TRANSITION_DURATION}
      appear
      mountOnEnter
      unmountOnExit
    >
      {(transitionStatus) => (
        <ActionSheetContext.Provider
          value={{ transitionStatus, open, onClose }}
        >
          <Dialog ref={ref} static open={open} onClose={() => onClose?.()}>
            <ActionSheetOverlay duration={TRANSITION_DURATION} />
            <FlexBox flex justifyContent="center">
              <ActionSheetBody
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
        </ActionSheetContext.Provider>
      )}
    </Transition>
  )
}

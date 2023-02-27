import { PropsWithChildren, ReactNode, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { Transition } from 'react-transition-group'
import { TransitionProps } from 'react-transition-group/Transition'
import { FlexBox } from '@titicaca/core-elements'

import { ActionSheetBody } from './action-sheet-body'
import { ActionSheetContext } from './action-sheet-context'
import { ActionSheetOverlay } from './action-sheet-overlay'

const TRANSITION_DURATION = 120

export interface ActionSheetProps
  extends PropsWithChildren,
    Pick<
      TransitionProps,
      | 'onEnter'
      | 'onEntering'
      | 'onEntered'
      | 'onExit'
      | 'onExiting'
      | 'onExited'
    > {
  open?: boolean
  title?: ReactNode
  borderRadius?: number
  bottomSpacing?: number
  from?: 'top' | 'bottom'
  maxContentHeight?: string | number
  onClose?: () => void
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
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}: ActionSheetProps) => {
  const ref = useRef(null)
  const panelRef = useRef(null)

  return (
    <Transition
      in={open}
      nodeRef={ref}
      timeout={TRANSITION_DURATION}
      appear
      mountOnEnter
      unmountOnExit
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {(transitionStatus) => (
        <ActionSheetContext.Provider
          value={{ transitionStatus, open, onClose }}
        >
          <Dialog
            ref={ref}
            initialFocus={panelRef}
            static
            open={open}
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
        </ActionSheetContext.Provider>
      )}
    </Transition>
  )
}

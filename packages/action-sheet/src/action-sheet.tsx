import { useEffect, useId } from 'react'
import { FlexBox } from '@titicaca/core-elements'
import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'

import { ActionSheetBody, ActionSheetBodyProps } from './action-sheet-body'
import { ActionSheetContext } from './action-sheet-context'
import { ActionSheetOverlay } from './action-sheet-overlay'

const TRANSITION_DURATION = 120

export interface ActionSheetProps
  extends Pick<
    ActionSheetBodyProps,
    | 'children'
    | 'borderRadius'
    | 'bottomSpacing'
    | 'from'
    | 'maxContentHeight'
    | 'title'
  > {
  open?: boolean
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
  const labelId = useId()

  const { context, refs } = useFloating({
    open,
    onOpenChange: (open) => (open ? undefined : onClose?.()),
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })

  const { getFloatingProps } = useInteractions([dismiss, role])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  })

  useEffect(() => {
    if (status === 'open') {
      onEnter?.()
      const timeout = setTimeout(() => onEntered?.(), TRANSITION_DURATION)
      return () => clearTimeout(timeout)
    } else if (status === 'close') {
      onExit?.()
      const timeout = setTimeout(() => onExited?.(), TRANSITION_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [onEnter, onEntered, onExit, onExited, status])

  return (
    <ActionSheetContext.Provider value={{ open, labelId, onClose }}>
      {isMounted ? (
        <FloatingPortal>
          <ActionSheetOverlay transitionStatus={status} />
          <FlexBox
            flex
            justifyContent="center"
            css={{
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 9999,
            }}
          >
            <FloatingFocusManager
              context={context}
              initialFocus={refs.floating}
            >
              <ActionSheetBody
                ref={refs.setFloating}
                borderRadius={borderRadius}
                bottomSpacing={bottomSpacing}
                maxContentHeight={maxContentHeight}
                from={from}
                title={title}
                transitionStatus={status}
                aria-modal
                {...getFloatingProps(props)}
              >
                {children}
              </ActionSheetBody>
            </FloatingFocusManager>
          </FlexBox>
        </FloatingPortal>
      ) : null}
    </ActionSheetContext.Provider>
  )
}
